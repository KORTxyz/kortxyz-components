import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-layeritem',
  styleUrl: 'kortxyz-layeritem.css'
})

export class kortxyzLayeritem {

  @Prop() name: string;

  @Prop() active: boolean = true;
  
  context(e){
    e.preventDefault();
    e.stopPropagation();

    const existingContext = document.querySelector("kortxyz-layermenu");
    if(existingContext) existingContext.remove();
   
    const contextMenu = document.createElement("kortxyz-layermenu")
    contextMenu.left = e.clientX;
    contextMenu.top = e.clientY;
    document.body.append(contextMenu) 
  }

  changeVisibility(e) {
    const status = this.active? 'none':'visible';

    const map = document.querySelector("kortxyz-mapbox").map;
          map.setLayoutProperty(e.target.id, 'visibility', status);

    this.active = !this.active;
  }

  render() {
    return ([
      <input type="checkbox" id={this.name}  onChange={this.changeVisibility.bind(this)} checked={this.active} />,
      <label htmlFor={this.name} onContextMenu={e => this.context(e)}>{this.name}</label>,
    ] )
  }
  
}