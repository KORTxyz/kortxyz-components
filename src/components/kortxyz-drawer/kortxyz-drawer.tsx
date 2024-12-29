import { Component, Host, Prop, Method, Element, h } from '@stencil/core';
import globalStore from '../../utils/store';

@Component({
  tag: 'kortxyz-drawer',
  styleUrl: 'kortxyz-drawer.css',
  scoped:true,
})

export class KortxyzDrawer {
  @Element() drawerEl: HTMLElement;
  @Prop() margin = "0";

  private initResize = () => {
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = "none"

    window.addEventListener('mousemove', this.doResize, false);
    window.addEventListener('mouseup', this.stopResize, false);
  }

  private stopResize = () => {
    document.body.style.cursor = '';
    document.body.style.userSelect = "all"

    window.removeEventListener('mousemove', this.doResize, false);
    window.removeEventListener('mouseup', this.stopResize, false);
  }

  private doResize = e => {
    if (e.x > 300) {
      globalStore.state.drawerwidth = e.x - Number(this.margin)
    }

  };

  private maxMinSize = () => {
    if (globalStore.state.drawerwidth <= 400) globalStore.state.drawerwidth = window.innerWidth
    else if (globalStore.state.drawerwidth > 400) globalStore.state.drawerwidth = 300
  };


  connectedCallback() {
    this.drawerEl.style.setProperty('--drawer-width', globalStore.state.drawerwidth + "px")

    globalStore.onChange("drawerwidth", drawerwidth => {
      this.drawerEl.style.setProperty('--drawer-width', drawerwidth + "px")

    });
  }

  closeDrawer() {
    this.drawerEl.classList.remove("open");
    setTimeout(() => {
      this.drawerEl.remove()
    }, 100);
  }

  @Method()
  async addContent(content) {
    this.drawerEl.classList.add("open");
    await new Promise(resolve => setTimeout(resolve, 100));
    this.drawerEl.insertAdjacentHTML("beforeend", content);

  }


  componentWillLoad() {
    this.drawerEl.style.setProperty('--drawer-margin', this.margin + "px");
  }

  render() {
    return (
      <Host>
          <kortxyz-icon icon="back" class="small" onClick={() => this.closeDrawer()}></kortxyz-icon>
          <div class="menu"><slot name="menu"/></div>
          <div class="main">
            <slot name="main"></slot>
          </div>
          <div class="bottom">
            <slot name="bottom"></slot>
          </div>
        <resizer onMouseDown={() => this.initResize()} ondblclick={() => this.maxMinSize()}></resizer>
      </Host>
    );
  }

}
