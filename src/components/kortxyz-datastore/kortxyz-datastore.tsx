import { Component, Prop, Element} from '@stencil/core';

import {createNewStore, getStore} from '../../utils/store';

import {isvalidURL} from '../../utils/checkUtils';

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

  /** URL to the data to be fetch into the Store AA */
  @Prop() data?: string;

  /** Name of the store */
  @Prop() store?: string;

  initStore(){
    createNewStore(this.store)
    getStore(this.store).set("data", JSON.parse(this.storeEl.innerHTML))     
  }

  async componentWillLoad() {
    createNewStore(this.store)

    if(this.data && isvalidURL(this.data)){
      const res = await fetch(this.data)
      const geojson = await res.json();
      if(!geojson.features[0].id) geojson.features.forEach((feat,idx)=>(feat.id=idx+1))
      getStore(this.store).set("data", geojson)
    }
    else{
      getStore(this.store).set("data", JSON.parse(this.storeEl.innerHTML))     
    }
    
  }
}
