import { Component, Element, Prop, Listen, Event, EventEmitter } from '@stencil/core';
import mapboxgl from 'mapbox-gl';

@Component({
  tag: 'kortxyz-mapbox',
  styleUrl: 'kortxyz-mapbox.css'
})

export class kortxyzMapbox {
  @Prop() map: mapboxgl.Map;
  @Element() mapEl: HTMLElement;
  @Event() mapLoaded: EventEmitter;

  @Prop() mapstyle: any =  { "version": 8, "name": "Empty", "metadata": { "mapbox:autocomposite": true },  "sources":{},   "layers": [] };
  @Prop() accesstoken: string;

  @Listen('sidebarResized', { target: 'body' })
  resizeMap() { this.map.resize() }
  
  componentDidLoad() {
    mapboxgl.accessToken = this.accesstoken ;
     this.map = new mapboxgl.Map({
       container: this.mapEl,
       attributionControl: false,
       style:  this.mapstyle,
       center: [11, 55],
       zoom: 11
     });

     this.map.on('load', ()=>{this.mapLoaded.emit()})

     setTimeout(_=>this.map.resize() , 100);
     document.querySelector(".mapboxgl-control-container").remove();

     //LoadingBar, needs to be layer specific
     this.map.on('dataloading',()=> this.mapEl.classList.add("loading"))
     this.map.on('idle',()=>this.mapEl.classList.remove("loading"))
  }
 
  render() {
    return ;
  }
}
