import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-ogcapi-collectionlist',
  styleUrl: 'kortxyz-ogcapi-collectionlist.css',
  shadow: true,
})
export class KortxyzOgcapiCollectionlist {

  /** Url to a OGC API */
  @Prop() url;

  private collections;

  async addCollection(id){

    const mapDiv = document.querySelector("kortxyz-maplibre");

    const sourceDiv = document.createElement("kortxyz-maplibre-source");
    sourceDiv.sourceid = id;
    sourceDiv.type = "geojson";
    sourceDiv.data = `${this.url}/collections/${id}/items?f=json&limit=1000`;

    mapDiv.append(sourceDiv)
  }

  async componentWillLoad() {
    const res = await fetch(this.url+"/collections?f=json")
    this.collections = (await res.json()).collections;
  }

  render() {
    return (
      <Host>
        {this.collections.map(({id,title}) => (
          
        <collection onClick={()=>this.addCollection(id)}>
          <div>{id||title}</div>
        </collection>
      ))}
      </Host>
    );
  }
}
