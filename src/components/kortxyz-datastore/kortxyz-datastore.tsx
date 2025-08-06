import { Component, Prop, Element } from '@stencil/core';

import { createNewStore, getStore } from '../../utils/store';

import { isvalidURL } from '../../utils/checkUtils';
import { JSONPath } from 'jsonpath-plus';
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
  tag: 'kortxyz-datastore',
  styleUrl: 'kortxyz-datastore.css',
  shadow: true
})

export class KortxyzDatastore {
  @Element() storeEl: HTMLElement;

  /** Name of the store */
  @Prop() store?: string;

  /** URL to the data to be fetch into the Store AA */
  @Prop() data?: string;

  /** Query geojson features using jsonpath-plus */
  @Prop() query?: string;

  initStore() {
    createNewStore(this.store)
    getStore(this.store).set("data", JSON.parse(this.storeEl.innerHTML))
  }

  async componentWillLoad() {
    createNewStore(this.store);

    let geojson;
    if (this.data && isvalidURL(this.data)) {
      const res = await fetch(this.data)
      geojson = await res.json();
    }
    else geojson = JSON.parse(this.storeEl.innerHTML);
    
    if (isNaN(geojson.features[0]?.id)) geojson.features.forEach((feat, idx) => (feat.id = idx + 1))

    if (this.query) {
      geojson = {
        ...geojson,
        features: JSONPath({ path: this.query, json: geojson })
      }
    }

    getStore(this.store).set("data", geojson)
  }
}
