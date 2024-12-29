import { Component, Host, Event, EventEmitter, Listen, Prop, h } from '@stencil/core';
import globalStore from '../../utils/store';

@Component({
  tag: 'kortxyz-mapstyleeditor-sourceconfig',
  styleUrl: 'kortxyz-mapstyleeditor-sourceconfig.css',
  shadow: true,
})
export class kortxyzMapstyleeditorSourceconfig {
  sourceJson;
  @Prop() sourceid: string;

  @Event() closeConfig: EventEmitter<any>;

  @Listen('docChanged')
  changeStyle(e){
    this.sourceJson = e.detail;
    const map = globalStore.get("activemap")
    
    //map.setPaintProperty(this.layerid, 'fill-color', '#faafee');
    let mapStyle = map.getStyle()
    mapStyle.sources[this.sourceid] = this.sourceJson;

    map.setStyle(mapStyle)

  }

  close() {
    this.closeConfig.emit();
  }

  componentWillLoad() {
    this.sourceJson  = globalStore.get("style").sources[this.sourceid]
  }

  render() {
    return (
      <Host>
        <kortxyz-icon icon="back" onClick={() => this.close()}></kortxyz-icon>
        <kortxyz-codemirror doc={this.sourceJson}></kortxyz-codemirror>
      </Host>
    );
  }

}
