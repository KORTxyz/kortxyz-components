import { Component, Prop, Element, State, Event, EventEmitter, h } from '@stencil/core';
import mapboxgl from 'mapbox-gl';


@Component({
  tag: 'kortxyz-dialog',
  styleUrl: 'kortxyz-dialog.css'
})

export class kortxyzDialog { 

  @Prop() top: number = 0;
  @Prop() left: number = 0;

  @State() name: string;
  @State() source: string;
  @State() sources: any[] = [];

  @Element() contextEl: HTMLElement;    

  @Event() layerAdded: EventEmitter;

  componentDidLoad(){
    this.contextEl.style.top = this.top+"px"

    this.sources = Object.keys(document.querySelector("kortxyz-mapbox").map.getStyle().sources) 
    this.source = this.sources[0];

    this.contextEl.oncontextmenu = e=> e.preventDefault();

      document.body.onclick = e =>{
        const path:any = e.composedPath();
        if(!path.filter(e=> e.nodeName == "KORTXYZ-DIALOG").length && !path.filter(e=> e.className == "layerlist__addLayer").length){
          document.querySelector("KORTXYZ-DIALOG").remove();
          document.body.onclick = null;
        }
        
      }
  
  }

  handleChange(e) {
    this.name = e.target.value;
  }

  handleSelect(e) {
    this.source = e.target.value;

  }

  
  addLayer(){
    const map = document.querySelector("kortxyz-mapbox").map;
    const type = map.getSource(this.source).type

    if(type=="raster"){
      map.addLayer({
        'id': this.name,
        'type': 'raster',
        'source': this.source
      });
      this.layerAdded.emit(this.name)
    }
    else{
      map.addLayer({
        'id': this.name +'_circle',
        'type': 'circle',
        'source': this.source,
        'source-layer':this.source,
        'minzoom':10,
        'filter': ["==", "$type", "Point"],
        'paint': {
          'circle-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
          'circle-radius': 2.5,
          'circle-opacity': 0.8
        }
     })
     this.layerAdded.emit(this.name +'_circle')

     map.addLayer({
      'id': this.name +'_line',
      'type': 'line',
      'source': this.source,
      'source-layer':this.source,
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
      this.layerAdded.emit(this.name +'_line')

      map.addLayer({
        'id': this.name +'_fill',
        'type': 'fill',
        'source': this.source,
        'source-layer':this.source,
        'minzoom':10,
        'filter': ["==", "$type", "Polygon"],
        'layout': {},
        'paint': {
          'fill-opacity': ["case",
          ["boolean", ["feature-state", "hover"], false], 1, 0.7],
          'fill-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
        }
     })
     this.layerAdded.emit(this.name +'_fill')

      map.on('click',this.name +'_fill', (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(Object.entries(e.features[0].properties).map(e => `<B>${e[0]}</B> ${e[1]}`).join("<BR>"))
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the states layer.
      map.on('mouseenter', this.name +'_fill', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', this.name +'_fill', () => {
        map.getCanvas().style.cursor = '';
      });
    }
     

    document.querySelector("KORTXYZ-DIALOG").remove();
    document.body.onclick = null;

  }

  render() {
    return ([
      <label htmlFor="sources">source</label>,
      <select id="sources" onInput={(event) => this.handleSelect(event)}>
        {this.sources.map(source => <option value={source}>{source}</option> )}
      </select>,
      <label htmlFor="name">name</label>,
      <input id="name" value={this.name} onInput={(e) => this.handleChange(e)}></input>,
      <button onClick={this.addLayer.bind(this)}>Add Layer</button>
      ] 
    );
  }
}


