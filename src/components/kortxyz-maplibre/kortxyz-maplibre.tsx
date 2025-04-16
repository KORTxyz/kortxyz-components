import { Component, Host, Element, Prop, h } from '@stencil/core';

import maplibregl from 'maplibre-gl';

import syncMaps from '@mapbox/mapbox-gl-sync-move';
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer';

import { initHoverPopup } from '../../utils/mapUtils';

@Component({
  tag: 'kortxyz-maplibre',
  styleUrls: [
    '../../../node_modules/maplibre-gl/dist/maplibre-gl.css',
    'kortxyz-maplibre.css'
  ],
  shadow: false,
})
export class KortxyzMaplibre {
  @Prop({ mutable: true }) map: maplibregl.Map;
  basemap: maplibregl.Map;

  @Element() mapEl: HTMLElement;

  /* Mapstyle for the main map */
  @Prop() mapstyle: maplibregl.StyleSpecification | string =
    {
      "version": 8,
      "name": "name",
      "center": [0, 0],
      "zoom": 16,
      "sources": {
      },
      "layers": [
      ]
    };

  /* A mapstyle used as a basemap below the main map */
  @Prop() basemapstyle: maplibregl.StyleSpecification | string;

  /* (optional) Mapboxkey if using styles from mapbox */
  @Prop() mapboxkey: string;

  /* Disable normal gestures for not getting caught by scrolling  */
  @Prop() cooperativeGestures: boolean = false;

  /* Start center of the map */
  @Prop() center: string = undefined;

  /* Start zoom of the map */
  @Prop() zoom: number = undefined;

  /* Start bounds of the map. [12.4,55.6,12.282,55.636] */
  @Prop() bbox: string = undefined;

  /* Eanble a hoverpopup showing all features beneath the cursor */
  @Prop() hoverpopup: boolean;

  /* Show the tilegrid */
  @Prop() showTileBoundaries: boolean = false;



  async componentWillLoad() {
    interface CustomMapOptions extends maplibregl.MapOptions {
      /**
       * Disable the new drag pitch behaviour to not be around the center of the map. 
       * @defaultValue true
       */
      aroundCenter?: boolean;
    }

    let mapOptions: CustomMapOptions = {
      container: this.mapEl,
      bounds: this.bbox ? JSON.parse(this.bbox) : undefined,
      style: this.mapstyle,
      attributionControl: false,
      aroundCenter: false,
      cooperativeGestures: this.cooperativeGestures,
      transformRequest: (url: string, resourceType: string) => {
        if (isMapboxURL(url)) return transformMapboxUrl(url, resourceType, this.mapboxkey)
        return { url }
      }
    };

    if (this.center) mapOptions["center"] = JSON.parse(this.center);
    if (this.zoom) mapOptions["zoom"] = Number(this.zoom);

    if (this.basemapstyle) {
      this.basemap = new maplibregl.Map({
        container: this.mapEl,
        style: this.basemapstyle,
        attributionControl: false,
        transformRequest: (url: string, resourceType: string) => {
          if (isMapboxURL(url)) return transformMapboxUrl(url, resourceType, this.mapboxkey)
          return { url }
        }
      });

      this.map = new maplibregl.Map(mapOptions);
      syncMaps(this.basemap, this.map)
    }

    else this.map = new maplibregl.Map(mapOptions);
    this.map.on('dataloading', () => this.mapEl.classList.add("loading"))
    this.map.on('idle', () => this.mapEl.classList.remove("loading"))

    if (this.hoverpopup) initHoverPopup(this.map)
    if (this.showTileBoundaries) this.map.showTileBoundaries = true
  }



  render() {
    return (
      <Host>
      </Host>
    );
  }

}
