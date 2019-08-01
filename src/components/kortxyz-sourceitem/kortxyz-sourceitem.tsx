import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-sourceitem',
  styleUrl: 'kortxyz-sourceitem.css'
})

export class kortxyzSourceitem {

  @Prop() name: string;

  @Prop() active: boolean = true;


  render() {
    return ([
      <input type="checkbox" id={this.name} disabled />,
      <label htmlFor={this.name} >{this.name}</label>,
    ] )
  }
  
}