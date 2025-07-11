import { Component, Host, Element, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-sidebar-button',
  styleUrl: 'kortxyz-sidebar-button.css',
  shadow: true,
})

export class KortxyzSidebarButton {
  @Element() buttonEl: HTMLElement;

  @Event() toggleRequest: EventEmitter;

  @Prop() placement = "top";

  @Prop() icon = "layers";

  render() {
    return (
      <Host slot={"icon-"+this.placement} onClick={() => this.toggleRequest.emit()}>
        <kortxyz-icon icon={this.icon}></kortxyz-icon>
      </Host>
    );
  }
}
