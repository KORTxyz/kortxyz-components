import { Component, Method, Listen, Element, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-sourcelist',
  styleUrl: 'kortxyz-sourcelist.css'
})

export class kortxyzSourcelist {
  @Element() sourcelistEL: HTMLElement;

  @Listen('sourceAdded', { target: 'body' })
  addSource(e) {
    const sourceitem = document.createElement("kortxyz-sourceitem");
          sourceitem.name=e.detail.sourceId;
    this.sourcelistEL.appendChild(sourceitem);
  }

  @Listen('sourcesAdded', { target: 'body' })
  addSources(e) {
    Object.keys(e.detail).forEach(source => {
      const sourceitem = document.createElement("kortxyz-sourceitem");
            sourceitem.name=source;
            this.sourcelistEL.appendChild(sourceitem);
    })
  }

	
  /*
  *
  */
  @Method()
  async handleFile(e){
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
  };

  render() {
    return ([
        <input type="file" id="fileUpload" onChange={this.handleFile} multiple accept=".fit,.geojson,.gpx,.json,.kml,.zip"></input>,
    ]);
  }
}