import { Component, Element, Prop, Listen } from '@stencil/core';
import mapboxgl from 'mapbox-gl';

@Component({
  tag: 'kortxyz-mapbox',
  styleUrl: 'kortxyz-mapbox.css'
})

export class kortxyzMapbox {
  @Prop() map: mapboxgl.Map;
  @Element() mapEl: HTMLElement;

  @Prop() mapstyle: any =  { "version": 8, "name": "Empty", "metadata": { "mapbox:autocomposite": true },  "sources":{},   "layers": [] };
  @Prop() accesstoken: string;


  @Listen('sidebarResized', { target: 'body' })
  resizeMap() { this.map.resize() }
  
  layersLoaded = {}

  componentDidLoad() {
    mapboxgl.accessToken = this.accesstoken ;
     this.map = new mapboxgl.Map({
       container: this.mapEl,
       attributionControl: false,
       style:  this.mapstyle,
       center: [11, 55],
       zoom: 11
     });

     setTimeout(_=>this.map.resize() , 100);
     document.querySelector(".mapboxgl-control-container").remove();

     this.map.on('dataloading',e=>{
       this.mapEl.classList.add("loading")
       this.layersLoaded[e.sourceId] = false;
      })
     //this.map.on('error',e=> {if(e.isSourceLoaded) this.mapEl.classList.remove("loading")})

     this.map.on('data',e=>{
       console.log(e.sourceId,e.isSourceLoaded)
       if(e.dataType=="source"){
        if(e.isSourceLoaded){
          this.layersLoaded[e.sourceId] = true;
          console.log(this.layersLoaded)

          this.mapEl.classList.remove("loading")
         }
       }
      })
  }
 
  render() {
    return ;
  }
}
