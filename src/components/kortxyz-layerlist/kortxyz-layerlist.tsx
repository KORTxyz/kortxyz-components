import { Component, Method, Prop, h } from '@stencil/core';
import Sortable from 'sortablejs';


@Component({
  tag: 'kortxyz-layerlist',
  styleUrl: 'kortxyz-layerlist.css'
})

export class kortxyzLayerlist {

  @Prop() source:any;
  layers:any = ["test"];

  componentDidLoad() {
    const sortDrop = Sortable.create(document.body, {
      group: "shared",
      disabled:true,
      ghostClass:'sortable-noghost'
    });

    var style = document.createElement('style');
        style.innerHTML ='.sortable-noghost { display:none}';
    var ref = document.querySelector('script');
        ref.parentNode.insertBefore(style, ref);

    Sortable.create(document.querySelector("kortxyz-layerlist"), {
      group: "shared",
      animation:200,
      onStart: _=>{
        sortDrop.options.disabled = false
      },
      onRemove: function (evt) {
        var el = evt.item;
        el.parentNode.removeChild(el);
        alert('Dropped: ' + el.textContent);
      },
      onEnd: (evt) => {
        console.log(evt)
        sortDrop.options.disabled = true
        /*
        const map:any = document.querySelector("kortxyz-mapbox").map
              map.moveLayer(evt.item.name+"_circle",evt.item.previousSibling.name+"_circle")
              map.moveLayer(evt.item.name+"_fill",evt.item.previousSibling.name+"_fill")
              map.moveLayer(evt.item.name+"_line",evt.item.previousSibling.name+"_line")
              */
        },
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
                                const tileSize = e.type=="application/vnd.vector-tile"? 512: 256

                                return {tiles,type,"tileSize": tileSize}
                              });

              setTimeout(() => {
                document.querySelector("kortxyz-mapbox").map.addSource(name,source[0])
              }, 100);//
              
              const layeritem = document.createElement("kortxyz-layeritem");
              layeritem.name=name;
              layeritem.active=false;
              document.querySelector("kortxyz-layerlist").appendChild(layeritem);
              this.layers.push([name,false])
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