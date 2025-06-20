import { Component, Element, Prop } from '@stencil/core';

import Taucharts from 'taucharts';

import '../../../node_modules/taucharts/dist/plugins/tooltip';
import '../../../node_modules/taucharts/dist/plugins/legend';

import tauBrewer from '../../../node_modules/taucharts/dist/plugins/color-brewer';

import { getStore } from '../../utils/store';
/**
 
  ## Intro
  Webcomponent to store data that multiple components can use.

  ## Example
  ```html
  <kortxyz-datastore
  store="teststore"
  data="https://example.geojson"
  ></kortxyz-datastore>
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

  private loading: boolean = true;

  /** Fetch data from a url */
  @Prop() data: string;

  /** Fetch data from a store */
  @Prop() store: string;

  /** Fetch data from a store */
  @Prop() type: "map" | "bar" | "horizontal-bar" | "horizontal-stacked-bar" | "line" | "parallel" | "scatterplot" | "stacked-area" | "stacked-bar";

  /** Fetch data from a store */
  @Prop() y: string;

  /** Fetch data from a store */
  @Prop() x: string;

  /** Fetch data from a store */
  @Prop() color: string;

  /** Fetch data from a store */
  @Prop() colorbrewer: string;

  /** Fetch data from a store */
  @Prop() groupByKeys: string;

  /** Show tooltips on hover */
  @Prop() tooltip: boolean = false;

  /** Add a legend */
  @Prop() legend: boolean = false;

  async componentDidLoad() {
    let geojson

    if (this.data) {
      const res = await fetch(this.data);
      if (!res.ok) throw new Error(`An error has occured: ${res.status}`);
      geojson = await res.json();
    }
    else if (this.store) {
      while (this.loading) {
        const datastore = getStore(this.store);
        if (datastore == undefined) await new Promise(r => setTimeout(r, 200));
        else {
          if (!datastore) return;
          geojson = datastore.get("data");
          if (!geojson.features) await new Promise(r => setTimeout(r, 200));
          else this.loading = false;
        }
      }
    }

    const properties = geojson.features.map(e => ({ ...e.properties }))

    const groupByKeys = this.groupByKeys.split(",");

    const dataset = Object.values(properties.reduce((acc, e) => (
      key => (
        acc[key] ??= { ...Object.fromEntries(groupByKeys.map(k => [k, e[k]])), count: 0 },
        acc[key].count++,
        acc
      )
    )(groupByKeys.map(k => e[k]).join('|')), {}));

    let plugins = [
    ];
    if (this.tooltip) plugins.push(Taucharts.api.plugins.get('tooltip')());
    if (this.legend) plugins.push(Taucharts.api.plugins.get('legend')());

    const chart = new Taucharts.Chart({
      data: dataset,
      type: this.type,
      y: this.y,
      x: this.x,
      color: this.color,
      guide: {
        color: {
          brewer: tauBrewer(this.colorbrewer, Math.min(new Set(dataset.map(e => e[this.color])).size, 12))
        }
      },
      plugins,
      settings: {
        asyncRendering: true,
        renderingTimeout: 500,
      }
    });

    chart.renderTo(this.chartEl);
    chart.refresh();

  }

}
