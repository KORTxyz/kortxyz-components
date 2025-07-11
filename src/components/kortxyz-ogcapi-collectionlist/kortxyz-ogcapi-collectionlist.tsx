import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-ogcapi-collectionlist',
  styleUrl: 'kortxyz-ogcapi-collectionlist.css',
  shadow: true,
})
export class KortxyzOgcapiCollectionlist {

  @Prop() url;
  private collections;

  async addCollection(id){

    const mapDiv = document.querySelector("kortxyz-maplibre");

    const sourceDiv = document.createElement("kortxyz-maplibre-source");
    sourceDiv.sourceid = id;
    sourceDiv.type = "geojson";
    sourceDiv.data = `${this.url}/${id}/items?f=json`;

    mapDiv.append(sourceDiv)
  }

  async componentWillLoad() {
    const res = await fetch(this.url)
    this.collections = (await res.json()).collections;
  }

  render() {
    return (
      <Host>
        {this.collections.map(({id,title,description}) => (
          
        <collection onClick={()=>this.addCollection(id)}>
          <div>{title}</div>
          <div>{description}</div>

        </collection>
      ))}
      </Host>
    );
  }
}
