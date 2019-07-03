import { Component, Element, Prop } from '@stencil/core';
import L  from "leaflet";

@Component({
  tag: 'kortxyz-leaflet',
  styleUrl: 'kortxyz-leaflet.css'
})

export class kortxyzLeaflet {
  @Element() mapEl: HTMLElement;

  @Prop() geojson: any;
  @Prop() map; 

  componentDidLoad(){
    this.map = L.map(this.mapEl).fitWorld().invalidateSize();

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidGlub2tzIiwiYSI6ImNqbzQycnkycTEwYnczcGt1ZzM3ZWw5eG8ifQ.BFc2DQMWss8JC8pQ9Yco7w'
    }).addTo(this.map);

    if(this.geojson){ this.loadGeojson() }
  }

  loadGeojson(){
    fetch(this.geojson)
    .then( res =>  res.json() )
    .then((data) => {
        const geojson = L.geoJSON(data).addTo(this.map);
        this.map.fitBounds(geojson.getBounds())
    });
  }


  render() {
    return  ;
  }
}