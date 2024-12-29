import { Component, Element, Prop } from '@stencil/core';

import { initHoverPopupLayer } from '../../utils/utils';

@Component({
  tag: 'kortxyz-maplibre-layer',
  shadow: true,
})
export class KortxyzMaplibreLayer {
  @Element() el: HTMLElement;

  @Prop() layer?: string;
  @Prop() type: 'circle' | 'line';
  @Prop() filter: any;

  @Prop() paint: any = {};
  @Prop() layout: any;

  @Prop() popup: string;
  @Prop() popupcontentcall: string;

  @Prop() clicklink: any;


  async componentDidLoad() {

    const { map } = this.el.closest('kortxyz-maplibre');

    const { id }: { id: string } = this.el.closest('kortxyz-maplibre-source');

    let layerObject: maplibregl.LayerSpecification = {
      'id': this.el.id,
      'type': this.type,
      'source': id,
      'paint': typeof this.paint == "string" ? JSON.parse(this.paint) : this.paint
    };


    if (this.layer) layerObject["source-layer"] = this.layer;
    if (this.filter) layerObject["filter"] = JSON.parse(this.filter);

    if(this.popup || this.popup.length==0) initHoverPopupLayer(map, this.el.id, this.popup, this.popupcontentcall);

    if (this.clicklink) {
      map.on('click', this.el.id, (e) => {
        const link = this.clicklink.replace(/{(\w+)}/g, (_, k) => e.features[0].properties[k]);
        window.open(link, '_blank');
      })
    }



    map.on('load', async () => {
      map.once('sourcedata', (e) => {
        if (e.sourceId == id) {
          map.addLayer(layerObject);
        }
      });



    });
    

  }


}
