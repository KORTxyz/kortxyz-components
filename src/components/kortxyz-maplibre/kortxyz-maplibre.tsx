import { Component, Host, Element, Prop, Method, Listen, h } from '@stencil/core';

import maplibregl, { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from 'maplibre-gl';

import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer';

import { initHoverPopup, syncMaps } from '../../utils/mapUtils';

import LegendControl from 'mapboxgl-legend';
import { LegendControlOptions } from 'mapboxgl-legend';

import { DrawControl, ToggleControl, BasemapSwitcherControl } from '../../utils/mapControl';

import { TerraDraw } from 'terra-draw';
import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';
import { TerraDrawSelectMode, TerraDrawPointMode, TerraDrawLineStringMode, TerraDrawPolygonMode } from 'terra-draw';
import { isvalidURL } from '../../utils/checkUtils';

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

  private terraDraw;

  @Element() mapEl: HTMLElement;

  /** Mapstyle for the main map */
  @Prop() mapstyle: maplibregl.StyleSpecification | string =
    {
      "version": 8,
      "name": "name",
      "sources": {
      },
      "layers": [
      ]
    };

  /** A mapstyle used as a basemap below the main map */
  @Prop() basemapstyle: maplibregl.StyleSpecification | string =
    {
      "version": 8,
      "name": "name",
      "sources": {
      },
      "layers": [
      ]
    };

  /** Basemapswitcher configuretd by an array of objects or an URL to a OGCAPI - Styles */
  @Prop() basemaps: string | { title: string; icon: URL; url: URL }[];

  /** (optional) Mapboxkey if using styles from mapbox */
  @Prop() mapboxkey: string;

  /** Disable normal gestures for not getting caught by scrolling  */
  @Prop() cooperativeGestures: boolean = false;

  /** Start center of the map */
  @Prop() center: string;

  /** Start zoom of the map */
  @Prop() zoom: number;

  /** Start bounds of the map. [12.4,55.6,12.282,55.636] */
  @Prop() bbox: string = undefined;

  /** Eanble a hoverpopup showing all features beneath the cursor */
  @Prop() hoverpopup: boolean;

  /** Show the tilegrid */
  @Prop() showTileBoundaries: boolean = false;

  /** Show a legend for the layers specified in the attibute. Empty if all layers */
  @Prop() legend: string | boolean = false;

  /** Show navigation controls */
  @Prop() navigation: boolean = false;

  /** Show a button to locate the user */
  @Prop() gps: boolean = false;

  /** Show a button to toggle fullscreen */
  @Prop() fullscreen: boolean = false;

  /** ID of the element that the button should toogle */
  @Prop() togglebutton: string;

  /** Show a scalebar at the bottom */
  @Prop() scalebar: boolean = false;

  /** Enable adding a new feature to the named source with a button */
  @Prop() draw: string;

  /**
   * Opens the geometry editor for a given GeoJSON feature.
   *
   * @param feature A GeoJSON Feature object to edit.
   * @returns A promise that resolves with the edited feature.
   */
  @Method()
  async editGeometry(feature) {
    this.terraDraw.start();
    feature.properties.mode = feature.geometry.type.toLowerCase();

    const result = this.terraDraw.addFeatures([feature])[0];
    if (!result.valid) console.error(result)

    this.terraDraw.setMode("select");
    this.terraDraw.selectFeature(result.id);
    return new Promise(resolve => {
      this.terraDraw.on("deselect", () => {
        const edited = this.terraDraw.getSnapshotFeature(result.id);
        this.terraDraw.stop();
        resolve(edited);
      });
    });

  }

  @Listen('dragenter')
  @Listen('drop')
  @Listen('dragleave')
  @Listen('dragover')
  onEvent(e) {
    e.preventDefault();

    console.log('Event:', e.type);
    this.mapEl.style.pointerEvents = 'none';

    const targetBelow = document.elementFromPoint(
      (e as MouseEvent).clientX,
      (e as MouseEvent).clientY
    );
    this.mapEl.style.pointerEvents = 'auto';
    if (targetBelow && targetBelow !== this.mapEl) {
      const newEvent = new e.constructor(e.type, e);
      targetBelow.dispatchEvent(newEvent);
    }

  }

  async loadStyles(url) {
    const response = await fetch(url);
    const { styles } = await response.json();
    return styles.map(style => ({
      title: style.title || style.id,
      icon: style.links.find(e => e.rel == "preview")?.href || null,
      url: style.links.find(e => e.type == "application/vnd.mapbox.style+json").href
    }));

  }

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


    let basemapOptions = { ...mapOptions };
    basemapOptions.style = this.basemapstyle;

    this.basemap = new maplibregl.Map(basemapOptions);

    this.map = new maplibregl.Map(mapOptions);

    syncMaps(this.map, this.basemap)


    if (this.scalebar) this.map.addControl(new ScaleControl());

    if (this.navigation) this.map.addControl(new NavigationControl({ visualizePitch: true }));
    if (this.gps) this.map.addControl(new GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }));
    if (this.fullscreen) this.map.addControl(new FullscreenControl({ container: document.querySelector('body') }));
    if (this.togglebutton) this.map.addControl(new ToggleControl({ element: this.togglebutton }), 'top-right');


    if (this.basemaps) {
      const basemaplist = isvalidURL(this.basemaps) ? await this.loadStyles(this.basemaps) : JSON.parse(String(this.basemaps));

      this.map.addControl(new BasemapSwitcherControl({ basemap: this.basemap, basemaplist }), 'bottom-left');
    }

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
    this.basemap.resize();
    this.map.resize();

    this.terraDraw = new TerraDraw({
      adapter: new TerraDrawMapLibreGLAdapter({
        map: this.map,
        coordinatePrecision: 20
      }),
      idStrategy: {
        isValidId: (id) => typeof id === "number" && Number.isInteger(id),
        getId: (() => {
          let id = 100;
          return () => ++id;
        })()
      },
      modes: [
        new TerraDrawSelectMode({
          flags: {
            point: {
              feature: {
                draggable: true,     // Can move the point
              },
            },
            linestring: {
              feature: {
                draggable: true,     // Move entire linestring
                coordinates: {
                  draggable: true,   // Drag individual coordinates
                  deletable: true,   // Remove individual coordinates
                  midpoints: {
                    draggable: true  // Insert midpoints and drag to create new nodes
                  },
                },
              },
            },
            polygon: {
              feature: {
                coordinates: {
                  draggable: true,
                  deletable: true,
                  midpoints: {
                    draggable: true
                  }
                },
              },
            },
          },
        }),
        new TerraDrawPointMode(),
        new TerraDrawLineStringMode(),
        new TerraDrawPolygonMode()
      ],
    });

    if (this.draw) this.map.addControl(new DrawControl({ terraDraw: this.terraDraw, source: this.map.getSource(this.draw), sourceDiv: this.mapEl.querySelector(`[sourceid="${this.draw}"]`) }), 'top-right');

  }

  render() {
    return (
      <Host>
      </Host>
    );
  }

}
