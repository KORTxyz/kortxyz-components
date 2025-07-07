import { Component, Host, Element, Prop, h } from '@stencil/core';

import maplibregl, { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from 'maplibre-gl';

import syncMaps from '@mapbox/mapbox-gl-sync-move';
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer';

import { initHoverPopup } from '../../utils/mapUtils';

import LegendControl from 'mapboxgl-legend';
import { LegendControlOptions } from 'mapboxgl-legend';

import { ToggleControl, BasemapSwitcherControl } from '../../utils/mapControl';


/**
 
  ## Intro
  Webcomponent to show a map based on  [MaplibreGL](https://maplibre.org/).

  ## Example
  * Show a demo map 
  ```html
  <kortxyz-maplibre 
      style="width:100%;height: 200px;display:block"
      mapstyle='https://demotiles.maplibre.org/style.json'
  ></kortxyz-maplibre>
  ```

  * Show a map on top a official basemap
  ```html
  <kortxyz-maplibre 
      style="width:100%;height:500px;display:block;background: whitesmoke;"
      bbox="[12.40100150309453,55.6008931492048,12.28220098836423,55.63638904335573]"
      mapstyle="./assets/skoledistrikter2024.json"
      basemapstyle="https://raw.githubusercontent.com/SDFIdk/vector_tiles_assets/refs/heads/main/styles/official/3857_skaermkort_graa.json"
  ></kortxyz-maplibre>
  ```
*/

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

  /** Mapstyle for the main map */
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

  /** A mapstyle used as a basemap below the main map */
  @Prop() basemapstyle: maplibregl.StyleSpecification | string;

  /** Basemapswitcher configuretd by an array of object with title, icon (url), url (style) for a basemaps. First entry is set as basemap */
  @Prop() basemaps: string;

  /** (optional) Mapboxkey if using styles from mapbox */
  @Prop() mapboxkey: string;

  /** Disable normal gestures for not getting caught by scrolling  */
  @Prop() cooperativeGestures: boolean = false;

  /** Start center of the map */
  @Prop() center: string = undefined;

  /** Start zoom of the map */
  @Prop() zoom: number = undefined;

  /** Start bounds of the map. [12.4,55.6,12.282,55.636] */
  @Prop() bbox: string = undefined;

  /** Eanble a hoverpopup showing all features beneath the cursor */
  @Prop() hoverpopup: boolean;

  /** Show the tilegrid */
  @Prop() showTileBoundaries: boolean = false;

  /** Show a legend for the layers specified in the attibute. Empty if all layers.*/
  @Prop() legend: string | boolean = false;

  /** Show navigation controls */
  @Prop() navigation: boolean = false;

  /** Show a button to locate the user */
  @Prop() gps: boolean = false;

  /** Show a button to toggle fullscreen */
  @Prop() fullscreen: boolean = false;

  /** ID of the element that the button should toogle.*/
  @Prop() togglebutton: string;

  /** Show a scalebar at the bottom */
  @Prop() scalebar: boolean = false;

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


    if (this.scalebar) this.map.addControl(new ScaleControl());

    if (this.navigation) this.map.addControl(new NavigationControl({ visualizePitch: true }));
    if (this.gps) this.map.addControl(new GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }));
    if (this.fullscreen) this.map.addControl(new FullscreenControl({ container: document.querySelector('body') }));
    if (this.togglebutton) this.map.addControl(new ToggleControl({ element: this.togglebutton }), 'top-right');

    if (this.basemaps) this.map.addControl(new BasemapSwitcherControl({ basemap:this.basemap, basemaplist:JSON.parse(this.basemaps) }), 'bottom-left');




    if (typeof this.legend == "string") {
      let legendOptions: LegendControlOptions = { highlight: true, toggler: true };
      if (this.legend.length > 0) legendOptions.layers = this.legend.split(",");

      this.map.addControl(new LegendControl(legendOptions) as unknown as maplibregl.IControl, 'bottom-right');
    }


    this.map.on('dataloading', () => this.mapEl.classList.add("loading"))
    this.map.on('idle', () => this.mapEl.classList.remove("loading"))

    if (this.hoverpopup) initHoverPopup(this.map)
    if (this.showTileBoundaries) this.map.showTileBoundaries = true

  }


  async componentDidLoad() {
    this.map.resize();
  }

  render() {
    return (
      <Host>
      </Host>
    );
  }

}
