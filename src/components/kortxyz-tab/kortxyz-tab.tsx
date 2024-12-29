import { Component, Host, Listen, Element, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-tab',
  styleUrl: 'kortxyz-tab.css',
  shadow: true,
})

export class KortxyzTab {
  @Element() el!: HTMLElement;

  @Listen('tabChange')
  tabChangeHandler(event) {   
    this.el.querySelector(`kortxyz-tab-link[active]`).removeAttribute("active")
    this.el.querySelector(`kortxyz-tab-link#${event.detail}`).setAttribute("active","true")

    this.el.querySelector(`kortxyz-tab-content[active]`).removeAttribute("active")
    this.el.querySelector(`kortxyz-tab-content#${event.detail}`).setAttribute("active","true")
  }


  render() {
    return (
      <Host>
        <tabnav>
          <slot name="links" />
        </tabnav>
        <slot name="content" />
      </Host>
    );
  }

}
