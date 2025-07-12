import { Component, Host, State, Listen, Element, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-maplibre-layerlist',
  styleUrl: 'kortxyz-maplibre-layerlist.css',
  shadow: true,
})
export class KortxyzMaplibreLayerlist {
  @Element() layerlistEl: HTMLElement;

  @State() mapstyle: maplibregl.StyleSpecification;
  @State() selectedLayer: maplibregl.LayerSpecification = null;

  private config?: HTMLElement;
  private list?: HTMLElement;

  @Listen('openPanel', { target: 'document' })
  onSidebarOpen(e) {
    if (e.detail == this.layerlistEl.parentElement.id) {
      const mapDiv = document.querySelector("kortxyz-maplibre");
      this.mapstyle = mapDiv.map.getStyle()
    }

  }

  async toogleConfig(layer) {
    this.selectedLayer =  layer;
    this.list.classList.toggle("open");
    this.config.classList.toggle("open");
  }

  render() {
    return (
      <Host>
        <list ref={el => this.list = el as HTMLElement} class="open">
          {this.mapstyle?.layers.map((layer) => (

            <layer onClick={() => this.toogleConfig(layer)}>
              <div>{layer.id}</div>

            </layer>
          ))}
        </list>

        <config ref={el => this.config = el as HTMLElement} onClick={() => this.toogleConfig(null)}>
          {this.selectedLayer && (
            <div>
              <h3>{this.selectedLayer.id}</h3>
              <pre>{JSON.stringify(this.selectedLayer, null, 2)}</pre>
            </div>
          )}
        </config>

      </Host>
    );
  }
}
