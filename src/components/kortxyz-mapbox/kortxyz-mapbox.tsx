import { Component, Element, Prop, Listen, Event, EventEmitter, Method, State } from '@stencil/core';
import mapboxgl from 'mapbox-gl';
import turf from '@turf/turf';

@Component({
  tag: 'kortxyz-mapbox',
  styleUrl: 'kortxyz-mapbox.css'
})

export class kortxyzMapbox {
  @Method()
  async zoomToFeatures(features){
    const bbox:any = turf.bbox(features);
    this.map.fitBounds(bbox)
  }
  @Element() mapEl: HTMLElement;

  @Event() mapLoaded: EventEmitter;
  @Event() layerAdded: EventEmitter;
  @Event() layerRemoved: EventEmitter;

  @Event() sourceAdded: EventEmitter;
  @Event() newStyle: EventEmitter;

  @Prop() map: mapboxgl.Map;
  @Prop() mapstyle: any =  { "version": 8, "name": "Empty", "metadata": { "mapbox:autocomposite": true },  "sources":{},   "layers": [] };
  @Prop() accesstoken: string;
  @Prop() geojsonurl: string;

  @Listen('sidebarResized', { target: 'body' })
    resizeMap() { this.map.resize() }

  @Listen('layerRemoved', { target: 'body' })
    removeLayer(e) {
      console.log(this.map.getLayer(e.detail))
      if(this.map.getLayer(e.detail) !== undefined){
        this.map.removeLayer(e.detail)
        this.layers = [ ...this.layers.filter(layer=>!layer.includes(e.detail)) ]  
      } 
    }
    
  @State() hover:{id:any,layer:any};
  @State() layers:any[] =[];

  popup = new mapboxgl.Popup({closeButton:false, closeOnClick: false});
  
  isLayerNew(style){
    const oldLayers =  this.layers.filter(l=> !style.layers.map(e=>e.id).includes(l))
    const newLayers = style.layers.filter(layer => !this.layers.includes(layer.id));
    this.layers = style.layers.map(layer=>layer.id)
 
    newLayers.forEach(layer=>this.layerAdded.emit(layer))
    oldLayers.forEach(layer=>this.layerRemoved.emit(layer))

  }
  
  renderPopup(features){
    const feature = features[0];
    const content = `
      <div class="popup-header">#${feature.layer.id}</div>
      <div class="popup-properties">
        ${Object.entries(feature.properties).map(property => `<b>${property[0]}</b> ${property[1]}<br> `).join('')}
      </div>
     `
    return content
  }

  componentDidLoad() {
    mapboxgl.accessToken = this.accesstoken ;
     this.map = new mapboxgl.Map({
       container: this.mapEl,
       attributionControl: false,
       style:  this.mapstyle,
       center: [0, 0],
       zoom: 3,
       maxZoom:17
     });

     this.map.on('load', ()=>{
       this.mapLoaded.emit()
       if(this.geojsonurl) this.loadGeojson(this.geojsonurl)
     })
     setTimeout(_=>this.map.resize() , 100);
     document.querySelector(".mapboxgl-control-container").remove();

     this.map.on('sourcedata',e=> {if(e.sourceDataType=="metadata") this.sourceAdded.emit(e)})
     this.map.on('styledata',e=> {
       const style = e.style.serialize()
       this.newStyle.emit(style); 
       this.isLayerNew(style)
     })

     //LoadingBar, needs to be layer specific
     this.map.on('dataloading',()=> this.mapEl.classList.add("loading"))
     this.map.on('idle',()=>this.mapEl.classList.remove("loading"))
     this.map.on('error',e=>alert(e.error.message))

     this.map.on('click', e=> {
      var features = this.map.queryRenderedFeatures(e.point);
      if(features.length>0){
        this.popup.setLngLat(e.lngLat)
          .setHTML(this.renderPopup(features))
          .addTo(this.map);
      }
      else{
        this.popup.remove();
      }
     })

     this.map.on('mousemove', e=> {
      var features = this.map.queryRenderedFeatures(e.point);
      this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    
      if(features.length>0){
          if(features[0].id /*Find en måde at understøtte features uden ID fx fra OGR2OGR */ 
            //this.hover.id.includes(features[0].layer.id)
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
        if (this.hover) {
          this.map.setFeatureState({source:  this.hover.layer.source, sourceLayer: this.hover.layer["source-layer"], id: this.hover.id}, { hover: false});
        }
        this.hover =  null;
      }
    
    });
  }

  @Method()
  async loadGeojson(url){
    const response = await fetch(url)
    const data:any = await response.json()

    const typeTranslate = {
      "Point": "circle",
      "MultiPoint": "circle",
      "MultiLineString": "line",
      "LineString": "line",
      "Polygon": "fill",
      "MultiPolygon": "fill"
    };
    const styles = {
      "fill": {
        'fill-color': '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6),
        'fill-opacity':["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7]
      },
      "line": {
        'line-color': '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6),
        'line-opacity':["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7]
      },
      "circle": {
        'circle-color': '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6),
        'circle-opacity': ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7]
      }
    }
    const type = typeTranslate[data.features[0].geometry.type];
    
    this.zoomToFeatures(data);
    this.map.addLayer({
      "id": "geojson",
      "type":  type,
      'source':{
        type: 'geojson',
        data: data
      },
      'paint': styles[type]
    });


  }


  @Method()
  async addLayer(name,source){
    const map = this.map;
    const type = map.getSource(source).type

    if(type=="raster"){
      map.addLayer({
        'id': name,
        'type': 'raster',
        'source': source
      });
    }
    else if(type=="geojson"){
      map.addLayer({
        'id': name +'_circle',
        'type': 'circle',
        'source': source,
        'minzoom':10,
        'filter': ["==", "$type", "Point"],
        'paint': {
          'circle-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
          'circle-radius': 8,
          'circle-opacity': ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7],
        }
     })

     map.addLayer({
      'id': name +'_line',
      'type': 'line',
      'source': source,
      'minzoom':10,
      'filter': ["==", "$type", "LineString"],
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
        'line-width': ["case", ["boolean", ["feature-state", "hover"], false], 2, 1.5],
        'line-opacity': ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7],
      }
      })

      map.addLayer({
        'id': name +'_fill',
        'type': 'fill',
        'source': source,
        'minzoom':10,
        'filter': ["==", "$type", "Polygon"],
        'layout': {},
        'paint': {
          'fill-opacity': ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7],
          'fill-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
        }
     })
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
          'circle-radius': 8,
          'circle-opacity': ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7],
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
        'line-width': ["case", ["boolean", ["feature-state", "hover"], false], 2, 1.5],
        'line-opacity': ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7],
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
          'fill-opacity': ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.7],
          'fill-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
        }
     })
    }


  }

  render() {
    return ;
  }
}
