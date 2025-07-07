import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-sidebar-panel',
  styleUrl: 'kortxyz-sidebar-panel.css',
  shadow: true,
})
export class KortxyzSidebarPanel {
  @Prop() closed = true
  
  render() {
    console.log(this.closed)
       return (
      <Host slot="panel" class={{
          'closed': this.closed,
        }}>
        {this.closed ? 'Closed' : 'Open'}
      </Host>
    );
  }
}
