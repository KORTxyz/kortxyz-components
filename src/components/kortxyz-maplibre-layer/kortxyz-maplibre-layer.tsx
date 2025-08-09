import { Component, Element, Prop } from '@stencil/core';
import { Listen, Event, EventEmitter } from '@stencil/core';

import { Map as MaplibreglMap, Popup, LngLatBoundsLike, LayerSpecification } from 'maplibre-gl';
import { renderPopup } from '../../utils/mapUtils'
import { bbox } from '@turf/bbox'

/**
## Intro
Webcomponent to load a maplibre layer inside a maplibre source. The layer can be made click interactive be using either clicklink or the popup properties.

Paint and Layout properties follow [MapLibre Style Spec](https://maplibre.org/maplibre-style-spec/layers/).


## Example
* Show red polygons with a white outline that opens a page when clicked.
```html
<kortxyz-maplibre>
    <kortxyz-maplibre-source>
        <kortxyz-maplibre-layer
            type="line"
            paint="{line-color:white}"
        ></kortxyz-maplibre-layer>
        <kortxyz-maplibre-layer
            type="fill"
            paint="{fill-color:red}"
            clicklink="https://example.com/{placename}"
        ></kortxyz-maplibre-layer>
    </kortxyz-maplibre-source>
</kortxyz-maplibre>
```
 */

@Component({
  tag: 'kortxyz-maplibre-layer',
  shadow: true,
})
export class KortxyzMaplibreLayer {
  @Element() el: HTMLElement;
  map: MaplibreglMap;

  /** Layer identification.  */
  @Prop() layerid = Math.random().toString(36).substring(2, 7);

  /** Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.  */
  @Prop() sourceLayer?: string;

  /** Type of layer */
  @Prop() type: 'circle' | 'line' | 'fill' = 'fill';

  /** Expression to fitler the layer */
  @Prop() filter: any;

  /** Paint properties for the layer. */
  @Prop({mutable:true}) paint: any = {};

  /** Layout properties for the layer. */
  @Prop({mutable:true}) layout: any = {};

  /** Customize legend with a object like this {name:string,unit:string,labels:object (Map a value to a text that replaces it as a label) }*/
  @Prop({mutable:true}) legendMetadata: any = {} ;
  
  /** (optional) When clicking a feature a Popup shows. Accept HTML and replacement of {} with a attribute. \<div>{placename}\</div>*/
  @Prop() popup: string | boolean;

  /** (optional) When clicking a feature a new webpage is opened with the link prop. {} can be used to replace with a attribute. https://mypage.org/{ATTRIBUTENAME} */
  @Prop() clicklink: any;

  /** Emit the ID of the first feature clicked */
  @Event() featureClicked: EventEmitter;

  @Listen('rowClicked', { target: 'window' })
  rowClickedHandler(event) {
    const parentEl: any = this.el.parentElement;
    if (event.detail.store == parentEl.store && ['circle','line','fill'].includes(this.type)) {
      const coords: LngLatBoundsLike = (([x1, y1, x2, y2]) => [[x1, y1], [x2, y2]])(bbox(event.detail.geometry));

      this.map.fitBounds(coords, {
        linear: true,
        padding: 100,
        maxZoom: 16
      });

      const paintProperties = this.map.getPaintProperty(this.layerid, this.type + '-color')

      this.map.setPaintProperty(this.layerid, this.type + '-color', [
        'match', ["id"],
        event.detail.id, 'yellow',
        paintProperties
      ])

      setTimeout(() => {
        this.map.setPaintProperty(this.layerid, this.type + '-color', this.paint[this.type + '-color'])
      }, 600);
    }

  }

  initPopupLayer(popup) {
    this.map.on('mouseenter', this.layerid, () => this.map.getCanvas().style.cursor = 'pointer');
    this.map.on('mouseleave', this.layerid, () => this.map.getCanvas().style.cursor = '');

    this.map.on('click', this.layerid, async (e) => {
      this.featureClicked.emit(e.features[0].id)

      const popupHtml = popup.length > 0 ? popup.replace(/{(\w+)}/g, (_, k) => e.features[0].properties[k]||"") : renderPopup(e.features);

      new Popup({
        closeButton: true,
        closeOnClick: true,
        maxWidth: 'none'
      })
        .setLngLat(e.lngLat)
        .setHTML(popupHtml)
        .addTo(this.map);
    });



  }

  async addLayer(layerObject) {

    const layerElInDom: any = document.getElementsByTagName("kortxyz-maplibre-layer");
    const layerIdsAsList = [...layerElInDom].map(e => e.layerid)
    const beforeId = layerIdsAsList[layerIdsAsList.findIndex(e => e == this.layerid) - 1]

    if (beforeId != undefined) {
      while (this.map.getLayer(beforeId) == undefined) {
        await new Promise(r => setTimeout(r, 200))
      }
    }

    this.map.addLayer(layerObject, beforeId);
  }

  async componentDidLoad() {
    const { map } = this.el.closest('kortxyz-maplibre');
    this.map = map;

    const { sourceid }: { sourceid: string } = this.el.closest('kortxyz-maplibre-source');

    this.paint = typeof this.paint == "string" ? JSON.parse(this.paint) : this.paint;
    this.layout = typeof this.layout == "string" ? JSON.parse(this.layout) : this.layout;
    this.legendMetadata = typeof this.legendMetadata == "string" ? JSON.parse(this.legendMetadata) : this.legendMetadata;

    let layerObject: LayerSpecification = {
      'id': this.layerid,
      'type': this.type,
      'source': sourceid,
      'paint': this.paint,
      'layout': this.layout,
      'metadata': this.legendMetadata,
    };

    if (this.sourceLayer) layerObject["source-layer"] = this.sourceLayer;
    if (this.filter) layerObject["filter"] = JSON.parse(this.filter);

    if (this.popup != undefined) this.initPopupLayer(this.popup);

    if (this.clicklink) {
      map.on('click', this.layerid, (e) => {
        const link = this.clicklink.replace(/{(\w+)}/g, (_, k) => e.features[0].properties[k]);
        window.open(link, '_blank');
      })
    }


    if (map.getSource(sourceid)) this.addLayer(layerObject)
    else {
      map.on('load', async () => {
        map.once('styledata', async () => {
          this.addLayer(layerObject)

        });
      });
    }



  }

}
