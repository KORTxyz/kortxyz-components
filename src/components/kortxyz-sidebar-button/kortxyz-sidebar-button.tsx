import { Component, Host, Element, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-sidebar-button',
  styleUrl: 'kortxyz-sidebar-button.css',
  shadow: true,
})

export class KortxyzSidebarButton {
  @Element() buttonEl: HTMLElement;

  @Event() toggleRequest: EventEmitter;

  render() {
    return (
      <Host slot="icon" onClick={() => this.toggleRequest.emit()}>
        <kortxyz-icon></kortxyz-icon>
      </Host>
    );
  }
}
