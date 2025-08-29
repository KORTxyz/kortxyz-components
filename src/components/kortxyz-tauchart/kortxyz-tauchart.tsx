import { Component, Element, Prop } from '@stencil/core';
import { FeatureCollection } from 'geojson';

import Taucharts from 'taucharts';

import '../../../node_modules/taucharts/dist/plugins/tooltip';
import '../../../node_modules/taucharts/dist/plugins/legend';

import tauBrewer from '../../../node_modules/taucharts/dist/plugins/color-brewer';

import { getStore } from '../../utils/store';

/**
 
  ## Intro
  Webcomponent to visualise data on charts.

  ## Example
  
  ### From data url
  ```html
  <kortxyz-tauchart
    data="https://geodk.kort.xyz/collections/bygning/items?limit=100&properties=vertikalnoejagtighed,plannoejagtighed,planstedfaestelsesmetode"
    type="scatterplot"
    y="vertikalnoejagtighed"
    x="plannoejagtighed"
    color="planstedfaestelsesmetode"
    tooltip
    legend
  ></kortxyz-tauchart>
  ```

  ### From store
  ```html
  <kortxyz-datastore style="visibility: hidden;"
    store="items" 
    data="https://geodk.kort.xyz/collections/vejmidte/items?limit=7000&properties=Trafikart,Vejkategori,Vejmidtetype"
  ></kortxyz-datastore>

  <kortxyz-tauchart
    store="items"
    type="horizontal-stacked-bar"
    y="vejkategori"
    x="count"
    color="trafikart"
    colorbrewer="Dark2"
    group-by-keys="trafikart,vejkategori,vejmidtetype"
    tooltip
    legend
  ></kortxyz-tauchart>
  ```

 */

@Component({
  tag: 'kortxyz-tauchart',
  styleUrls: [
    'kortxyz-tauchart.css',
    '../../../node_modules/taucharts/dist/taucharts.min.css'
  ],
  shadow: false,
})
export class KortxyzTauchart {
  @Element() chartEl: HTMLElement;

  private chart: any;

  /** Fetch data from a url */
  @Prop() data: string;

  /** Fetch data from a store */
  @Prop() store: string;

  /** Type of chart */
  @Prop() type: "map" | "bar" | "horizontal-bar" | "horizontal-stacked-bar" | "line" | "parallel" | "scatterplot" | "stacked-area" | "stacked-bar";

  /** Attribute to use on the y axis */
  @Prop() y: string;

  /** Attribute to use on the x axis */
  @Prop() x: string;

  /** Attribute to use for color */
  @Prop() color: string;

  /** Colorscheme based on Colorbrewer2 */
  @Prop() colorbrewer: string;

  /** Group data by these keys returning a attribute called "count"  */
  @Prop() groupByKeys: string;

  /** Show tooltips on hover */
  @Prop() tooltip: boolean = false;

  /** Add a legend */
  @Prop() legend: boolean = false;


  fetchfromStore = async () => {
    let datastore;

    while ((datastore = getStore(this.store)) == undefined || !datastore.get("data").features.length)  await new Promise(r => setTimeout(r, 200));

    return datastore.get("data");       
  }


  fetchfromURL = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`An error has occured: ${res.status}`);
    return await res.json();
  }


  refactorData = (geojson: FeatureCollection) => {
    let dataset = geojson.features.map(e => ({ ...e.properties }))
    const groupByKeys = this.groupByKeys?.split(",");
    if (groupByKeys) {
      dataset = Object.values(dataset.reduce((acc, e) => (
        key => (
          acc[key] ??= { ...Object.fromEntries(groupByKeys.map(k => [k, e[k]])), count: 0 },
          acc[key].count++,
          acc
        )
      )(groupByKeys.map(k => e[k]).join('|')), {}));
    }
    return dataset
  }
  

  getColorBrewer = (dataset, color) => {
    const uniqueValues = new Set(dataset.map(e => e[color]));
    const numberofcolors = Math.min(12, Math.max(3, uniqueValues.size));
    const colorbrewer = tauBrewer(this.colorbrewer, numberofcolors);

    return {
        color: {
          brewer: colorbrewer
        }
      }

  }


  async componentDidLoad() {
    let geojson

    if (this.data) geojson = await this.fetchfromURL(this.data)
    else if (this.store) geojson = await this.fetchfromStore()

    const dataset = this.refactorData(geojson)

    let plugins = [];
    if (this.tooltip) plugins.push(Taucharts.api.plugins.get('tooltip')());
    if (this.legend) plugins.push(Taucharts.api.plugins.get('legend')());

      
    let chartSpec = {
      data: dataset,
      type: this.type,
      y: this.y,
      x: this.x,
      color: this.color,

      plugins,
      settings: {
        asyncRendering: true,
        renderingTimeout: 500,
      }
    }

    if(this.colorbrewer) chartSpec["guide"] = this.getColorBrewer(dataset, this.color)


    this.chart = new Taucharts.Chart(chartSpec);
    this.chart.renderTo(this.chartEl);
    this.chart.refresh();

  }

}
