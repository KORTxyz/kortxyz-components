import { Component, Host, Event, EventEmitter, Listen, Prop, h } from '@stencil/core';
import globalStore from '../../utils/store';

@Component({
  tag: 'kortxyz-mapstyleeditor-layerconfig',
  styleUrl: 'kortxyz-mapstyleeditor-layerconfig.css',
  shadow: true,
})
export class kortxyzMapstyleeditorLayerconfig {
  layerJson;
  @Prop() layerid: string;

  @Event() closeConfig: EventEmitter<any>;

  @Listen('docChanged')
  changeStyle(e){
    this.layerJson = e.detail;
    const map = globalStore.get("activemap")
    
    //map.setPaintProperty(this.layerid, 'fill-color', '#faafee');
    let mapStyle = map.getStyle()
    mapStyle.layers = mapStyle.layers.map(layer =>  layer.id === this.layerid ? this.layerJson : layer)

    map.setStyle(mapStyle)

  }

  close() {
    this.closeConfig.emit();
  }

  componentWillLoad() {
    this.layerJson  = globalStore.get("style").layers.find(layer => this.layerid == layer.id)
  }

  render() {
    return (
      <Host>
        <kortxyz-icon icon="back" onClick={() => this.close()}></kortxyz-icon>
        <kortxyz-codemirror doc={this.layerJson}></kortxyz-codemirror>
      </Host>
    );
  }

}
