import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-tab-content',
  styleUrl: 'kortxyz-tab-content.css',
  shadow: true,
})

export class KortxyzTabContent {
  @Prop({reflect:true}) active:boolean = false;


  render() {
    return (
      <Host slot="content">
        <slot></slot>
      </Host>
    );
  }

}
