import { Component, Host, Element,h } from '@stencil/core';
import { KortxyzSidebarPanel } from '../kortxyz-sidebar-panel/kortxyz-sidebar-panel';

@Component({
  tag: 'kortxyz-sidebar',
  styleUrl: 'kortxyz-sidebar.css',
  shadow: true,
})

export class KortxyzSidebar {
  @Element() sidebarEl: HTMLElement;

  handleToggle = (e) => {
    const panelId = e.target.getAttribute("panel");
    const panel = this.sidebarEl.querySelector("kortxyz-sidebar-panel#"+panelId) as unknown as KortxyzSidebarPanel;
    panel.closed = !panel.closed;
    console.log(panel.closed)
  };

  render() {
    return (
      <Host>
        <icon onToggleRequest={this.handleToggle}>
          <slot name="icon" ></slot>
        </icon>
        <panel active="test">
          <slot name="panel"></slot>
        </panel>
       
      </Host>
    );
  }
}
