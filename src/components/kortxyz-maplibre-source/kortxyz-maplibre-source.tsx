import { Component, Element, Prop, Method } from '@stencil/core';

@Component({
  tag: 'kortxyz-maplibre-source',
  shadow: true,
})

export class KortxyzMaplibreSource {
  @Element() el: HTMLElement;

  @Prop() type: 'vector' | 'geojson' | 'raster';

  @Prop() data: GeoJSON.GeoJSON | string;
  @Prop() tiles: string;
  @Prop() tilesize: number;

  @Prop() maxzoom: number;

  private layers: any = [];

  @Method() 
  async addLayer(layer: maplibregl.LayerSpecification){
    this.layers = [...this.layers, layer]


  } 

  async componentDidLoad() {
    const { map } = this.el.closest('kortxyz-maplibre');

    if(this.type == 'geojson'){
      let sourceObject : maplibregl.GeoJSONSourceSpecification  = {
        'type': this.type,
        'data': this.data
      }
      map.once('load', async () => map.addSource(this.el.id, sourceObject));
    }

    else if(this.type == 'vector' || this.type == 'raster'){
      let sourceObject : maplibregl.VectorSourceSpecification | maplibregl.RasterSourceSpecification  = {
        'type': this.type,
        'tiles': [this.tiles],
        'maxzoom': this.maxzoom || 14,
        'tileSize': this.tilesize || 512
      }

      map.once('load', async () => map.addSource(this.el.id, sourceObject));
    }

    this.layers.forEach(layer => {
      map.addLayer(layer)
    });
  }
}
