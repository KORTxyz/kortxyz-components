import { Component, Prop, Element } from '@stencil/core';

import { createNewStore, getStore } from '../../utils/store';

import { isvalidURL } from '../../utils/checkUtils';
import { JSONPath } from 'jsonpath-plus';
import { getDiff } from 'json-difference'

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

  /** URL to the data to be fetch into the Store */
  @Prop() data?: string;

  /** Should edits sync back to the datasource */
  @Prop() sync?: boolean;

  /** Query geojson features using jsonpath-plus */
  @Prop() query?: string;

  initStore() {
    createNewStore(this.store)
    getStore(this.store).set("data", JSON.parse(this.storeEl.innerHTML))
  }

  async handleAdds(store, newData, adds) {
    const [addedPath,] = adds;
    const pathParts = addedPath.replace("[]", "").split("/");
    if (pathParts.length != 2) return;

    const newFeature = newData[pathParts[0]][pathParts[1]];
    const res = await fetch(this.data, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeature)
    })

    this.handleResponse(store, newData, res, newFeature.id)

  }


  async handleEdits(store, newData, edits) {
    const [editedPath, , newvalue] = edits

    const pathParts = editedPath.replace("[]", "").split("/");

    const editedFeature = newData[pathParts[0]][pathParts[1]]
    console.log(editedFeature)
    const res = await fetch(this.data + "/" + editedFeature.id, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: `{"${[pathParts[2]]}":{ "${[pathParts[3]]}":"${newvalue}"}}`
    })

    this.handleResponse(store, newData, res, editedFeature.id)
  }


  async handleResponse(store, newData, res, id) {
    const responseFeature = await res.json();
    const responseStatus = res.status == 201 ? "newFeature" : "editedFeature";

    const idx = newData.features.findIndex(e => e.id == id)

    newData.features[idx] = responseFeature;

    store.set("lastOrigin", responseStatus)
    store.set("data", newData)
  }


  async componentWillLoad() {
    const store = createNewStore(this.store);
    let geojson;
    if (this.data && isvalidURL(this.data)) {
      const res = await fetch(this.data)
      geojson = await res.json();
    }
    else geojson = JSON.parse(this.storeEl.innerHTML);

    delete geojson.links;
    delete geojson.timeStamp;
    delete geojson.numberReturned;

    if (isNaN(geojson.features[0]?.id)) geojson.features.forEach((feat, idx) => (feat.id = idx + 1))

    if (this.query) {
      geojson = {
        ...geojson,
        features: JSONPath({ path: this.query, json: geojson })
      }
    }

    store.set("data", geojson)

    store.onChange("editeddata", async newData => {
      if (this.sync) {
        const oldData = store.get("data");
        const diff = getDiff(oldData, newData);
        for (const adds of diff.added) this.handleAdds(store, newData, adds);
        for (const edits of diff.edited) this.handleEdits(store, newData, edits)
      }
      else {
        store.set("lastOrigin", "datastore")
        store.set("data", newData)
      }
    })

  }
}
