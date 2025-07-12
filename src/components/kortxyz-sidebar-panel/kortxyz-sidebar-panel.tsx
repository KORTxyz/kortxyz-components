import { Component, Host, Prop, Element, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-sidebar-panel',
  styleUrl: 'kortxyz-sidebar-panel.css',
  shadow: true,
})
export class KortxyzSidebarPanel {
  @Element() panelEl: HTMLElement;
  
  /** Controls if the panel should be shown or not.*/
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
