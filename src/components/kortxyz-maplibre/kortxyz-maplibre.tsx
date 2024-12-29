import { Component, Host, Element, Prop, Method, h } from '@stencil/core';
import globalStore from '../../utils/store';

import maplibregl from 'maplibre-gl';
import syncMaps from '@mapbox/mapbox-gl-sync-move';
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer';

import { initHoverPopup } from '../../utils/utils';

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

  @Prop() mapstyle: maplibregl.StyleSpecification | string =
    {
      "version": 8,
      "name": "name",
      "center": [12.356231321327698, 55.61676705920823],
      "zoom": 12.5,
      "sources": {
      },
      "layers": [
      ]
    };
  @Prop() basemapstyle: maplibregl.StyleSpecification | string;

  @Prop() mapboxkey: string;

  @Prop() cooperativeGestures: boolean = false;
  @Prop() center: string = undefined;
  @Prop() zoom: number = undefined;
  @Prop() bbox: string = undefined;
  
  @Prop() hoverpopup: boolean;
  @Prop() showTileBoundaries: boolean = false;

  @Method()
  async getMap() {
    return this.map
  }



  async componentWillLoad() {

    let mapOptions: maplibregl.MapOptions = {
      container: this.mapEl,
      bounds: this.bbox ? JSON.parse(this.bbox): undefined,
      style: this.mapstyle,
      attributionControl: false,
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

    this.map.on('styledata', () => {
      globalStore.set("style", this.map.getStyle())
    });

    this.map.on('dataloading', () => this.mapEl.classList.add("loading"))
    this.map.on('idle', () => this.mapEl.classList.remove("loading"))
    
    if(this.hoverpopup) initHoverPopup(this.map)
    if(this.showTileBoundaries) this.map.showTileBoundaries = true


    this.map.once("load", () => {
      globalStore.set("style", this.map.getStyle())
      globalStore.set("activemap", this.map)
    })


  }



  render() {
    return (
      <Host>
      </Host>
    );
  }

}
