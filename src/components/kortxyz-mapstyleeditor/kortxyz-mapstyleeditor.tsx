import { Component, Host, State, Element, Listen, h } from '@stencil/core';

import maplibregl from 'maplibre-gl';

import globalStore from '../../utils/store';

@Component({
  tag: 'kortxyz-mapstyleeditor',
  styleUrl: 'kortxyz-mapstyleeditor.css',
  shadow: true,
})
export class KortxyzMapstyleeditor {
  private configEl;
  private sourcesEl;
  private tabEl;

  @Element() layerEl: HTMLElement;

  @State() style: maplibregl.StyleSpecification;

  showLayerconfig(layer) {
    this.tabEl.classList.add("hidden")
    this.configEl.innerHTML = `<kortxyz-mapstyleeditor-layerconfig layerid="${layer.id}"></kortxyz-mapstyleeditor-layerconfig>`
  }

  showSourceconfig(source = "new") {
    this.tabEl.classList.add("hidden")
    this.configEl.innerHTML = `<kortxyz-mapstyleeditor-sourceconfig sourceid="${source}"></kortxyz-mapstyleeditor-sourceconfig>`
  }


  addLayer() {

  }

  addSource() {
    this.sourcesEl.insertAdjacentHTML("afterbegin",
      `<layer id="new" contenteditable="true"></layer>`
    )

    const newLayerEl: HTMLElement = this.sourcesEl.querySelector("layer#new")

    newLayerEl.focus();

    newLayerEl.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        newLayerEl.blur()
      }
    });

    newLayerEl.addEventListener('blur', () => {
      const sourceName = newLayerEl.innerText.replace(/\W/g, '');
      globalStore.state.style.sources[sourceName] = {
        "type": "vector",
        "url": "https://demotiles.maplibre.org/tiles/tiles.json"
      }
      this.showSourceconfig(sourceName)
      newLayerEl.remove()
    })
  }

  componentWillLoad() {
    this.style = globalStore.get("style");
    globalStore.onChange('style', (stylesheet: maplibregl.StyleSpecification) => this.style = { ...stylesheet })
  }

  @Listen('closeConfig')
  hideConfig() {
    this.tabEl.classList.remove("hidden")
    this.configEl.innerHTML = ``

  }

  render() {
    return (
      <Host>
        <kortxyz-tab ref={el => this.tabEl = el as HTMLElement}>
          <kortxyz-tab-link id="layers" for="layers" active>Layers</kortxyz-tab-link>
          <kortxyz-tab-link id="sources" for="sources">Sources</kortxyz-tab-link>

          <kortxyz-tab-content id="layers" active>
            <toolbar>
              <div>search</div>
              <kortxyz-icon class="add" icon="addfile" onClick={() => this.addLayer()}></kortxyz-icon>
            </toolbar>
            <list>
              {this.style.layers.map((layer) => (
                <layer onClick={() => this.showLayerconfig(layer)}>
                  <kortxyz-icon icon={layer.type}></kortxyz-icon>
                  {layer.id}
                </layer>
              ))}
            </list>
          </kortxyz-tab-content>

          <kortxyz-tab-content id="sources">
            <toolbar>
              <div>search</div>
              <kortxyz-icon class="add" icon="addfile" onClick={() => this.addSource()}></kortxyz-icon>
            </toolbar>
            <list ref={el => this.sourcesEl = el as HTMLElement}>
              {Object.entries(this.style.sources).map((source) => (
                <layer onClick={() => this.showSourceconfig(source[0])}>
                  <kortxyz-icon icon={source[1].type}></kortxyz-icon>
                  {source[0]}
                </layer>
              ))}
            </list>
          </kortxyz-tab-content>
        </kortxyz-tab>


        <config ref={el => this.configEl = el as HTMLElement} ></config>

      </Host>
    )
  }

}
