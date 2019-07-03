import { Component, Method, Prop, h } from '@stencil/core';
import Sortable from 'sortablejs';


@Component({
  tag: 'kortxyz-layerlist',
  styleUrl: 'kortxyz-layerlist.css'
})

export class kortxyzLayerlist {

  @Prop() source:any;

  componentDidLoad() {
    Sortable.create(document.querySelector("kortxyz-layerlist"), {
			animation:200
    });

    if(this.source){
      fetch(this.source)
      .then(e=>e.json())
      .then(data=>
            data.collections.forEach(collection=>{
              const name = collection.name;
              const source = collection.links
                            .filter(e=>e.rel=="tiles")
                            .map(e=>{
                                const tiles = [e.href
                                    .replace("{level}","{z}")
                                    .replace("{row}","{x}")
                                    .replace("{col}","{y}")
                                    .replace("{tilingSchemeId}","GoogleMapsCompatible")
                                    .replace("localhost","http://localhost")]

                                const type = e.type=="application/vnd.vector-tile"?"vector":"raster"
                                return {tiles,type}
                              });

              setTimeout(() => {
                document.querySelector("kortxyz-mapbox").map.addSource(name,source[0])
              }, 100);//
              
              const layeritem = document.createElement("kortxyz-layeritem");
              layeritem.name=name;
              layeritem.active=false;
              document.querySelector("kortxyz-layerlist").appendChild(layeritem);
          })
      )
    }
    //<kortxyz-layeritem name="test1"></kortxyz-layeritem>


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