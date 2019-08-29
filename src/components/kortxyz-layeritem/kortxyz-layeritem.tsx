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

    const existingCodearea = document.querySelector("kortxyz-code");
    if(existingCodearea) existingCodearea.remove();
   
    const codeArea = document.createElement("kortxyz-code")
    codeArea.left = e.clientX;
    codeArea.top = e.clientY;
    codeArea.layer = e.target.innerHTML;
    document.body.append(codeArea) 
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