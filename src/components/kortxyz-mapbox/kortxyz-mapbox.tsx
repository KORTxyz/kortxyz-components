import { Component, Element, Prop, Listen, Event, EventEmitter, Method, State } from '@stencil/core';
import mapboxgl from 'mapbox-gl';

@Component({
  tag: 'kortxyz-mapbox',
  styleUrl: 'kortxyz-mapbox.css'
})

export class kortxyzMapbox {
  @Element() mapEl: HTMLElement;

  @Event() mapLoaded: EventEmitter;
  @Event() layerAdded: EventEmitter;
  @Event() sourceAdded: EventEmitter;
  @Event() newStyle: EventEmitter;

  @Prop() map: mapboxgl.Map;
  @Prop() mapstyle: any =  { "version": 8, "name": "Empty", "metadata": { "mapbox:autocomposite": true },  "sources":{},   "layers": [] };
  @Prop() accesstoken: string;

  @Listen('sidebarResized', { target: 'body' })
    resizeMap() { this.map.resize() }

  @Listen('layerRemoved', { target: 'body' })
    removeLayer(event) {
      this.map.removeLayer(event.detail)
      this.layers = [ ...this.layers.filter(layer=>!layer.includes(event.detail) ) ]  
    }
    
  @State() hover:{id:any,layer:any};
  @State() layers:any[] =[];

  popup = new mapboxgl.Popup({closeOnClick: false});
  
  isLayerNew(style){
    const eventLayers = style.layers.map(layer=>layer.id)
    const newLayers = eventLayers.filter(x => !this.layers.includes(x));
          newLayers.forEach(layer=>this.layerAdded.emit(layer))
    
    if(!newLayers.length) this.newStyle.emit(style)

    this.layers = [ ...this.layers, ...newLayers]
  }
  
  renderPopup(features){
    return features.toString()
  }

  componentDidLoad() {
    mapboxgl.accessToken = this.accesstoken ;
     this.map = new mapboxgl.Map({
       container: this.mapEl,
       attributionControl: false,
       style:  this.mapstyle,
       center: [11, 55],
       zoom: 11,
       maxZoom:18
     });

     this.map.on('load', ()=>{this.mapLoaded.emit()})
     setTimeout(_=>this.map.resize() , 100);
     document.querySelector(".mapboxgl-control-container").remove();

     this.map.on('sourcedata',e=>{if(e.sourceDataType=="metadata") this.sourceAdded.emit(e)})
     this.map.on('styledata',e=> this.isLayerNew(e.style.serialize()) )

     //LoadingBar, needs to be layer specific
     this.map.on('dataloading',()=> this.mapEl.classList.add("loading"))
     this.map.on('idle',()=>this.mapEl.classList.remove("loading"))

     this.map.on('mousemove', e=> {

      var features = this.map.queryRenderedFeatures(e.point);
      this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    
      if(features.length>0){
        this.popup.setLngLat(e.lngLat)
          .setHTML(this.renderPopup(features))
          .addTo(this.map);
          if(1==1 //this.hover.id.includes(features[0].layer.id)
           ){
            if (this.hover) {
              this.map.setFeatureState({source: this.hover.layer.source, sourceLayer: this.hover.layer["source-layer"], id: this.hover.id}, { hover: false});
            }
            this.hover = {id:features[0].id,layer:features[0].layer};
            this.map.setFeatureState({source:  this.hover.layer.source, sourceLayer: this.hover.layer["source-layer"], id: this.hover.id}, { hover: true});
    
          }
          else{
            if (this.hover) {
              this.map.setFeatureState({source:  this.hover.layer.source, sourceLayer: this.hover.layer["source-layer"], id: this.hover.id}, { hover: false});
            }
            this.hover =  null;
          }
        }
      else {        
        this.popup.remove();
        if (this.hover) {
          this.map.setFeatureState({source:  this.hover.layer.source, sourceLayer: this.hover.layer["source-layer"], id: this.hover.id}, { hover: false});
        }
        this.hover =  null;
      }
    
    });
  }


  @Method()
  async addLayer(name,source){
    const map = document.querySelector("kortxyz-mapbox").map;
    const type = map.getSource(source).type

    if(type=="raster"){
      map.addLayer({
        'id': name,
        'type': 'raster',
        'source': source
      });
    }
    else{
      map.addLayer({
        'id': name +'_circle',
        'type': 'circle',
        'source': source,
        'source-layer':source,
        'minzoom':10,
        'filter': ["==", "$type", "Point"],
        'paint': {
          'circle-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
          'circle-radius': 2.5,
          'circle-opacity': 0.8
        }
     })

     map.addLayer({
      'id': name +'_line',
      'type': 'line',
      'source': source,
      'source-layer':source,
      'minzoom':10,
      'filter': ["==", "$type", "LineString"],
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
        'line-width': 1,
        'line-opacity': 0.8
      }
      })

      map.addLayer({
        'id': name +'_fill',
        'type': 'fill',
        'source': source,
        'source-layer':source,
        'minzoom':10,
        'filter': ["==", "$type", "Polygon"],
        'layout': {},
        'paint': {
          'fill-opacity': ["case",
          ["boolean", ["feature-state", "hover"], false], 1, 0.7],
          'fill-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
        }
     })

      map.on('click',name +'_fill', (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(Object.entries(e.features[0].properties).map(e => `<B>${e[0]}</B> ${e[1]}`).join("<BR>"))
          .addTo(map);
      });
      window["hoveredStateId"] = null;
      // Change the cursor to a pointer when the mouse is over the states layer.
      map.on('mousemove', name +'_fill', e => {
        map.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
          if (window["hoveredStateId"]) {
              map.setFeatureState({source: source, sourceLayer: source, id: window["hoveredStateId"]}, { hover: false});
          }
          window["hoveredStateId"] = e.features[0].id;
          map.setFeatureState({source: source, sourceLayer: source, id: window["hoveredStateId"]}, { hover: true});
        }
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', name +'_fill', () => {
        map.getCanvas().style.cursor = '';
        if (window["hoveredStateId"]) {
          map.setFeatureState({source: source, sourceLayer: source, id: window["hoveredStateId"]}, { hover: false});
        }
        window["hoveredStateId"] =  null;
      });
    }
     


  }

  render() {
    return ;
  }
}
