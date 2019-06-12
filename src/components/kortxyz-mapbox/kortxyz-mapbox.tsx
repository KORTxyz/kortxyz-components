import { Component, Element, Prop, Method, h } from '@stencil/core';
import mapboxgl from 'mapbox-gl';

@Component({
  tag: 'kortxyz-mapbox',
  styleUrl: 'kortxyz-mapbox.css'
})

export class kortxyzMapbox {
  map: mapboxgl.Map;
  @Element() mapEl: HTMLElement;

  @Prop() mapstyle: any =  { "version": 8, "name": "Empty", "metadata": { "mapbox:autocomposite": true }, "sources":{ "sentinel":{
    "type": "raster",
    "tiles": [
      'https://a.services.kortforsyningen.dk/orto_foraar_webm?token=9aa81f9407307890217a686b111ba83e&layer=orto_foraar&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
      'https://b.services.kortforsyningen.dk/orto_foraar_webm?token=9aa81f9407307890217a686b111ba83e&layer=orto_foraar&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
      'https://c.services.kortforsyningen.dk/orto_foraar_webm?token=9aa81f9407307890217a686b111ba83e&layer=orto_foraar&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
      'https://d.services.kortforsyningen.dk/orto_foraar_webm?token=9aa81f9407307890217a686b111ba83e&layer=orto_foraar&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
      'https://e.services.kortforsyningen.dk/orto_foraar_webm?token=9aa81f9407307890217a686b111ba83e&layer=orto_foraar&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
      'https://f.services.kortforsyningen.dk/orto_foraar_webm?token=9aa81f9407307890217a686b111ba83e&layer=orto_foraar&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
      'https://g.services.kortforsyningen.dk/orto_foraar_webm?token=9aa81f9407307890217a686b111ba83e&layer=orto_foraar&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
      'https://h.services.kortforsyningen.dk/orto_foraar_webm?token=9aa81f9407307890217a686b111ba83e&layer=orto_foraar&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
      'https://i.services.kortforsyningen.dk/orto_foraar_webm?token=9aa81f9407307890217a686b111ba83e&layer=orto_foraar&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
    ],
    "minzoom": 0,
    "maxzoom": 20
  }}, "layers": [ {
    "id": "LFC",
    "type": "raster",
    "source": "sentinel",
    "layout": {},
    "paint": {}
    } ] };
  



  @Method() async addBackground(){

  }


  componentDidLoad() {

     this.map = new mapboxgl.Map({
       container: this.mapEl,
       attributionControl: false,
       style:  this.mapstyle,
       center: [11, 55],
       zoom: 7
     });


  }
 
 


  render() {
    return <div></div>;
  }
}
