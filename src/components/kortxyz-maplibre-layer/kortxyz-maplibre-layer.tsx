import { Component, Element, Prop } from '@stencil/core';
import { Listen, Event, EventEmitter } from '@stencil/core';

import { Map as MaplibreglMap, Popup, LngLatBoundsLike, LayerSpecification } from 'maplibre-gl';
import { renderPopup } from '../../utils/mapUtils'
import { bbox } from '@turf/bbox'

@Component({
  tag: 'kortxyz-maplibre-layer',
  shadow: true,
})
export class KortxyzMaplibreLayer {
  @Element() el: HTMLElement;
  map: MaplibreglMap;

  /** Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.  */
  @Prop() sourceLayer?: string;

  /** Type of layer */
  @Prop() type: 'circle' | 'line' | 'fill' = 'fill';

  /** Expression to fitler the layer */
  @Prop() filter: any;

  /** Paint properties for the layer. */
  @Prop() paint: any = {};

  /** Layout properties for the layer. */
  @Prop() layout: any;

  /** (optional) When clicking a feature a Popup shows. Accept HTML and replacement of {} with a attribute. \<div>{placename}\</div>*/
  @Prop() popup: string | boolean;

  /** (optional) When clicking a feature a new webpage is opened with the link prop. {} can be used to replace with a attribute. https://mypage.org/{ATTRIBUTENAME} */
  @Prop() clicklink: any;

  /** Emit the ID of the first feature clicked */
  @Event() featureClicked: EventEmitter;

  @Listen('rowClicked', { target: 'window' })
  rowClickedHandler(event) {
    
    const parentEl:any = this.el.parentElement;
    if (event.detail.store == parentEl.store) {

      const coords: LngLatBoundsLike = (([x1, y1, x2, y2]) => [[x1, y1], [x2, y2]])(bbox(event.detail.geometry));

      this.map.fitBounds(coords, {
        linear: true,
        padding: 100,
        maxZoom: 16
      });

      const paintProperties = this.map.getPaintProperty(this.el.id, this.type + '-color')

      this.map.setPaintProperty(this.el.id, this.type + '-color', [
        'match', ["id"],
        event.detail.id, 'yellow',
        paintProperties
      ])

      setTimeout(() => {
        this.map.setPaintProperty(this.el.id, this.type + '-color', JSON.parse(this.paint)[this.type + '-color'])
      }, 600);
    }

  }


  initPopupLayer(popup) {
    this.map.on('mouseenter', this.el.id, () => this.map.getCanvas().style.cursor = 'pointer');
    this.map.on('mouseleave', this.el.id, () => this.map.getCanvas().style.cursor = '');

    this.map.on('click', this.el.id, async (e) => {
      this.featureClicked.emit(e.features[0].id)

      const popupHtml = popup.length > 0 ? popup.replace(/{(\w+)}/g, (_, k) => e.features[0].properties[k]) : renderPopup(e.features);

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
    const layerIdsAsList = [...layerElInDom].map(e => e.id)
    const beforeId = layerIdsAsList[layerIdsAsList.findIndex(e => e == this.el.id) - 1]

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

    const { id }: { id: string } = this.el.closest('kortxyz-maplibre-source');

    let layerObject: LayerSpecification = {
      'id': this.el.id,
      'type': this.type,
      'source': id,
      'paint': typeof this.paint == "string" ? JSON.parse(this.paint) : this.paint
    };


    if (this.sourceLayer) layerObject["source-layer"] = this.sourceLayer;
    if (this.filter) layerObject["filter"] = JSON.parse(this.filter);

    if (this.popup != undefined) this.initPopupLayer(this.popup);

    if (this.clicklink) {
      map.on('click', this.el.id, (e) => {
        const link = this.clicklink.replace(/{(\w+)}/g, (_, k) => e.features[0].properties[k]);
        window.open(link, '_blank');
      })
    }


    if (map.getSource(id)) this.addLayer(layerObject)
    else {
      map.on('load', async () => {
        map.once('styledata', async () => {
          this.addLayer(layerObject)

        });
      });
    }



  }


}
