import { Component, Host, Element, State, Event, EventEmitter, h } from '@stencil/core';
import { KortxyzSidebarPanel } from '../kortxyz-sidebar-panel/kortxyz-sidebar-panel';

@Component({
  tag: 'kortxyz-sidebar',
  styleUrl: 'kortxyz-sidebar.css',
  shadow: true,
})

export class KortxyzSidebar {

  @Element() sidebarEl: HTMLElement;

  @State() panelActive = false;
  @Event() open: EventEmitter;

  private activePanel;
  private activeIcon;

  handleToggle = (e) => {
    const clickedIcon = e.target as HTMLElement;
    // If the clicked icon is already active → deactivate it
    if (this.activeIcon === clickedIcon) {
      clickedIcon.classList.remove("active");
      this.activeIcon = null;
      this.activePanel.closed = true;
      this.activePanel = null;
      this.panelActive = false;
      return;
    }

    // Deactivate the previous one
    this.activeIcon?.classList.remove("active");
    if (this.activePanel) this.activePanel.closed = true;

    // Activate the new one
    this.activeIcon = clickedIcon;
    this.activeIcon.classList.add("active");
    const panelId = this.activeIcon.getAttribute("panel");
    this.activePanel = this.sidebarEl.querySelector("kortxyz-sidebar-panel#" + panelId) as unknown as KortxyzSidebarPanel;
    this.activePanel.closed = false;

    this.panelActive = true;
    this.open.emit({ panel: panelId });
  };

  render() {
    return (
      <Host>
        <iconbar onToggleRequest={this.handleToggle} is-active={this.panelActive}>
          <icons><slot name="icon-top"></slot></icons>
          <icons><slot name="icon-middle"></slot></icons>
          <icons><slot name="icon-bottom"></slot></icons>
        </iconbar>
        <panel>
          <slot name="panel" ></slot>
        </panel>

      </Host>
    );
  }
}
