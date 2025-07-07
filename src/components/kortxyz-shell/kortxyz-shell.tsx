import { Component, Host, State, Element, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-shell',
  styleUrl: 'kortxyz-shell.css',
  shadow: true,
})

export class KortxyzShell {
  @Element() host: HTMLElement;
  @State() hasSlotContent: boolean = false;

  private onSlotChange = () => {
    const slots = this.host.shadowRoot.querySelectorAll('slot');
    slots.forEach(slot=>{
      const nodes = slot.assignedNodes({flatten: true});
      if(nodes.length>0) slot.parentElement.classList.add('has-content')
    })

  };

  render() {
    return (
      <Host>
        <left>
          <slot name="left" onSlotchange={this.onSlotChange}></slot>
        </left>

        <main>
          <slot name="main" onSlotchange={this.onSlotChange}></slot>
        </main>

        <right>
          <slot name="right" onSlotchange={this.onSlotChange}></slot>
        </right>
      </Host>
    );
  }
}
