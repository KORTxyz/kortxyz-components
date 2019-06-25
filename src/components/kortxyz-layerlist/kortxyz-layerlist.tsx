import { Component, Method, h } from '@stencil/core';
import Sortable from 'sortablejs';


@Component({
  tag: 'kortxyz-layerlist',
  styleUrl: 'kortxyz-layerlist.css'
})

export class kortxyzLayerlist { 
  componentDidLoad() {
    
    Sortable.create(document.querySelector("kortxyz-layerlist"), {
			animation:200,
			onEnd: function (/**Event*/evt) {
				window["map"].moveLayer(evt.item.name,evt.item.previousSibling.name)
			}
    });
	}
	
  /*
  *
  */
  @Method()
  handleFile(e){
    const filesArray:any = Array.from(e.target.files).reduce((groups, item:any) => {
      var val = item.name.split(".")[0];
        groups[val] = groups[val] || [];
        groups[val].push(item);
      return groups;
    }, {});
         
    for(const files in filesArray){
      const file = filesArray[files][0];
      let type = file.name.split(".").pop().toLowerCase();
          type = type == "json" ? "geojson" : type;
      import(`./${type}.js`).then(m => { m.load(file); });
    }
  }

  render() {
    return ([
        <input type="file" id="fileUpload" onChange={this.handleFile} multiple accept=".fit,.geojson,.gpx,.json,.kml,.zip"></input>,
    ]);
  }
}