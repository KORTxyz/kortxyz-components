import { Component, Element, Prop } from '@stencil/core';
import { GeoJSON } from 'geojson';

import { getStore } from '../../utils/store';

import { isvalidURL } from '../../utils/checkUtils';

import { Map as MaplibreglMap, GeoJSONSourceSpecification, VectorSourceSpecification, RasterSourceSpecification } from 'maplibre-gl';

import { bbox } from '@turf/bbox'


@Component({
  tag: 'kortxyz-maplibre-source',
  shadow: true,
})

export class KortxyzMaplibreSource {
  @Element() el: HTMLElement;
  map: MaplibreglMap;

  private loading: boolean = true;

  /** Type of source. */
  @Prop() type: 'vector' | 'geojson' | 'raster' = 'geojson';

  /** URL to the geojson source. */
  @Prop() data: string;
  /** Datastore reference. */
  @Prop() store: string;

  /** Url to the tilesource. e.g. https://demotiles.maplibre.org/tiles/{z}/{x}/{y}.pbf */
  @Prop() tiles: string;

  /** Size of the tiles in px. */
  @Prop() tilesize: number = 512;

  /** Max zoom-level to fetch tiles. z-parameter */
  @Prop() maxzoom: number = 14;

  /** fit mapbounds to geojsonbounds  */
  @Prop() fit: boolean = false;

  private source: any = [];

  getSourceObject = () => {
    if (this.type == 'geojson') {
      let SourceSpecification: GeoJSONSourceSpecification = {
        'type': this.type,
        'data': {
          'type': 'FeatureCollection',
          'features': []
        }
      }
      return SourceSpecification
    }

    else if (this.type == 'vector' || this.type == 'raster') {
      let SourceSpecification: VectorSourceSpecification | RasterSourceSpecification = {
        'type': this.type,
        'tiles': [this.tiles],
        'maxzoom': this.maxzoom,
        'tileSize': this.tilesize
      }
      return SourceSpecification
    }
  }

  updateGeojson = async (geojson) => {
    this.source.setData(geojson)
    if(this.fit) {
      const bounds:any = bbox(geojson);
      this.map.fitBounds(bounds)
    }
  }


  async componentDidLoad() {
    const { map } = this.el.closest('kortxyz-maplibre');
    this.map = map;

    map.once('load', async () => {
      map.addSource(this.el.id, this.getSourceObject())

      this.source = map.getSource(this.el.id)

      if (this.type == "geojson") {
        map.once('styledata', async () => {
          if (this.store) {
            while (this.loading) {
              const datastore = getStore(this.store);
              if (datastore == undefined) await new Promise(r => setTimeout(r, 200));
              else {
                this.updateGeojson(datastore.get("data"))
                datastore.onChange("data", (e: GeoJSON) => this.updateGeojson(e))
                this.loading = false;

              }
            }
          }
          else if (isvalidURL(this.data)) {
            const res = await fetch(this.data)
            const geojson = await res.json();
            this.updateGeojson(geojson)

          }
        });
      }

    });

  }



}
