import { Component, Host, Element, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-panel-item',
  styleUrl: 'kortxyz-panel-item.css',
  shadow: true,
})
export class KortxyzPanelItem {
  @Element() itemEl: HTMLElement;

  @Prop() active: boolean;
  @Prop() icon: string
  @Prop() panel: string
  @Prop() link: string


  @Event() tooglePanel: EventEmitter<any>;
  
  tooglePanelHandler() {
    if(this.link) window.location.href = this.link;
    else {
      this.tooglePanel.emit({
        id:this.panel,
        itemEl:this.itemEl,
        status: this.active
      });
    }
  }

  render() {
    return (
      <Host 
        onClick={() => this.tooglePanelHandler()} 
        class={(this.active ? "active" : "")}
      >
        <kortxyz-icon icon={this.icon}></kortxyz-icon>
      </Host>
    );
  }
}
