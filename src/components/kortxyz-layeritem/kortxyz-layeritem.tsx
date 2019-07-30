import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-layeritem',
  styleUrl: 'kortxyz-layeritem.css'
})

export class kortxyzLayers {

  @Prop() name: string;

  @Prop() active: boolean = true;
  
  context(e){
    e.preventDefault();
    e.stopPropagation();
    console.log(e)

    const existingContext = document.querySelector("kortxyz-contextmenu");
    if(existingContext) existingContext.remove();
   
    const contextMenu = document.createElement("kortxyz-contextmenu")
    contextMenu.left = e.clientX;
    contextMenu.top = e.clientY;
    document.body.append(contextMenu) 
  }

  changeVisibility(e) {
    const mapDiv: HTMLKortxyzMapboxElement = document.querySelector("kortxyz-mapbox");
    const type = mapDiv.map.getSource(e.target.id).type
    if(e.target.checked){
      if(type=="raster"){
        mapDiv.map.addLayer({
          'id': e.target.id,
          'type': 'raster',
          'source': e.target.id
        });
      }
      else{
        mapDiv.map.addLayer({
          'id': e.target.id+'_circle',
          'type': 'circle',
          'source': e.target.id,
          'source-layer':e.target.id,
          'minzoom':10,
          'filter': ["==", "$type", "Point"],
          'paint': {
            'circle-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
            'circle-radius': 2.5,
            'circle-opacity': 0.75
          }
       })
       mapDiv.map.addLayer({
        'id': e.target.id+'_line',
        'type': 'line',
        'source': e.target.id,
        'source-layer':e.target.id,
        'minzoom':10,
        'filter': ["==", "$type", "LineString"],
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
          'line-width': 1,
          'line-opacity': 1
        }
        })
        mapDiv.map.addLayer({
          'id': e.target.id+'_fill',
          'type': 'fill',
          'source': e.target.id,
          'source-layer':e.target.id,
          'minzoom':10,
          'filter': ["==", "$type", "Polygon"],
          'layout': {},
          'paint': {
            'fill-opacity': 1,
            'fill-color': "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6),
          }
       })
      }

    }
    else{
      if(type=="raster"){
        mapDiv.map.removeLayer(e.target.id);
      }
      else{
        mapDiv.map.removeLayer(e.target.id+'_circle')
        mapDiv.map.removeLayer(e.target.id+'_line')
        mapDiv.map.removeLayer(e.target.id+'_fill')
      }
    }

  }

  render() {
    return ([
      <input type="checkbox" id={this.name}  onChange={this.changeVisibility} checked={this.active} />,
      <label htmlFor={this.name} onContextMenu={e => this.context(e)}>{this.name}</label>,
      <div class="button">
        <svg data-name={this.name} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20"><path fill="none" d="M0 0h20v20H0V0z"/><path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
      </div>
    ] )
  }
  
}