import { Component, Host, Listen, Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-mapinfo-content',
  styleUrl: 'kortxyz-mapinfo-content.css',
  shadow: true,
})


export class KortxyzMapinfoContent {

  @Prop({ mutable: true }) text: string = "temp";
  @Prop() url:string;
  @Prop() template:string = "";

  getValue = (path, obj) => path.split('.').reduce((acc, c) => acc && acc[c], obj);

  parseStringTemplate = (str, obj) => {
    let parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ.]*\}/);
    let args = str.match(/[^{\}]+(?=})/g) || [];
    
    let parameters = args.map(arg => this.getValue(arg,obj) || (this.getValue(arg,obj) === undefined ? "" : this.getValue(arg,obj)));

    return String.raw({ raw: parts }, ...parameters);
  }

  @Listen('newMarkerPosition', { target: 'document' })
  async updateText(e) {
    const url = this.parseStringTemplate(this.url, e.detail)
    
    const response = await fetch(url)

    const geojson = await response.json();
    if (geojson) this.text = this.parseStringTemplate(this.template, geojson.features[0])


  }

  render() {
    return (
      <Host>
        {this.text}
      </Host>
    );
  }

}
 