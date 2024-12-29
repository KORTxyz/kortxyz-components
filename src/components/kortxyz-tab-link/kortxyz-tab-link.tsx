import { Component, Host, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-tab-link',
  styleUrl: 'kortxyz-tab-link.css',
  shadow: true,
})

export class KortxyzTabLink {
  @Prop({reflect:true}) active:boolean = false;
  @Prop({ reflect: true }) for: String;

  @Event() tabChange: EventEmitter;

  tabChangeHandler() {
    this.tabChange.emit(this.for);
  }

  render() {
    return (
      <Host slot="links" onclick={()=>this.tabChangeHandler()}>
        <slot></slot>
      </Host>
    );
  }

}
