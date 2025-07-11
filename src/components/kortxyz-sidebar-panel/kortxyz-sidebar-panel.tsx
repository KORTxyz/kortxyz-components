import { Component, Host, Prop, Element, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-sidebar-panel',
  styleUrl: 'kortxyz-sidebar-panel.css',
  shadow: true,
})
export class KortxyzSidebarPanel {
  @Element() panelEl: HTMLElement;
  
  @Prop() closed = true
  
  render() {
       return (
      <Host slot="panel" class={{ 'closed': this.closed }}>
        <header> {this.panelEl.id} </header>
        <panel>
          <slot></slot>
        </panel>
      </Host>
    );
  }
}
