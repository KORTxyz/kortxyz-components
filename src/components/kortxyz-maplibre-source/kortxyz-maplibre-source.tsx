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
  private map: MaplibreglMap;
  private loading: boolean = true;
  private randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  private randomDarkHex = () => '#' + [0,0,0].map(() => Math.floor(Math.random() * 100).toString(16).padStart(2, '0')).join('');

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

  /** add a layer without specifing it ONLY GEOJSON */
  @Prop() autolayers: boolean = false;

  private source: any = [];

  getMapboxType = geojsonGeomType => ({
    Point: 'circle',
    MultiPoint: 'circle',
    LineString: 'line',
    MultiLineString: 'line',
    Polygon: 'fill',
    MultiPolygon: 'fill',
    GeometryCollection: 'fill'
  }[geojsonGeomType]);

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
    if (this.autolayers) {
      const geomTypeMap = geojson.features.reduce((acc, f) => ((acc[f.geometry.type] = (acc[f.geometry.type] || 0) + 1), acc), {});
      const geomTypes = Object.keys(geomTypeMap).sort((a, b) => geomTypeMap[b] - geomTypeMap[a]);
      geomTypes.forEach((geomType) => {
        const mapboxType = this.getMapboxType(geomType);

        if (this.map.getLayer(this.el.id+"-"+geomType)) this.map.removeLayer(this.el.id+"-"+geomType);

        let layerEl = document.createElement("kortxyz-maplibre-layer");
        layerEl.id = this.el.id+"-"+geomType;
        layerEl.setAttribute("type", mapboxType);
        layerEl.setAttribute("paint", `{"${mapboxType}-color":"${this.randomDarkHex()}"}`);
        layerEl.setAttribute("popup", "");

        this.el.appendChild(layerEl)


      })
    }

    this.source.setData(geojson)
    if (this.fit) {
      4
      const bounds: any = bbox(geojson);
      this.map.fitBounds(bounds, {
        animate: false,
        padding: 100,
        maxZoom: 16
      })
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
