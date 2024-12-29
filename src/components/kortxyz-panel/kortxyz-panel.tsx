import { Component, Element, Host, Listen, State, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-panel',
  styleUrl: 'kortxyz-panel.css',
  shadow: true,
})
export class KortxyzPanel {
  @Element() panelEl: HTMLElement;

  private drawer;
  private activePanel;

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
    if (e.x > 300 && e.x < 700) {
      this.panelEl.style.setProperty('--drawer-width', e.x-40 + "px")
    }

  };


  @State() collapsed: boolean = true;


  @Listen('tooglePanel')
  async tooglePanelHandler(event: CustomEvent<any>) {
    const {itemEl} = event.detail;
    const {panel} = itemEl;

    if (this.activePanel?.panel == panel) {
      this.collapsed = !this.collapsed;
      itemEl.active = !true;
      this.activePanel = null;
    }
    else {
      if(this.activePanel) this.activePanel.active = false;
      this.collapsed = false;

      this.drawer.innerHTML = `<${panel}></${panel}>`;

      this.activePanel = itemEl;
      itemEl.active = true;
    }

  }

  render() {
    return (
      <Host>
        <slot></slot>
        <drawer
          ref={el => this.drawer = el as HTMLInputElement}
          className={(this.collapsed ? "collapsed" : "open")}
        ></drawer>
        <resizer onMouseDown={() => this.initResize()} ></resizer>
      </Host>
    );
  }

}
