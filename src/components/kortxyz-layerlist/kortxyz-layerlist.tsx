import { Component, Method, Prop, Element, Event, EventEmitter, Listen, h } from '@stencil/core';
import Sortable from 'sortablejs';


@Component({
  tag: 'kortxyz-layerlist',
  styleUrl: 'kortxyz-layerlist.css'
})

export class kortxyzLayerlist {

  @Element() layerlistEl: HTMLElement;

  @Prop() sourcesURL:any;

  @Event() layerRemoved: EventEmitter;

  openAddLayerDialog(){
    const existingContext = document.querySelector("kortxyz-dialog");
    if(existingContext) existingContext.remove();
   
    const dialog = document.createElement("kortxyz-dialog")
    document.body.append(dialog) 
  }

  addTools(){
    const icon = document.createElement("i");
    icon.className = "layerlist__addLayer";
    icon.title = "Add layers";
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
                      </svg>`;
    icon.onclick = ()=>{
          this.openAddLayerDialog();
    }

    const header = document.querySelector("toolbox");
          header.appendChild(icon);
  }


  initSortable(){

    const sortDrop = Sortable.create(document.body, {
      group: "shared",
      disabled:true,
      ghostClass:'sortable-noghost'
    });

    let style = document.createElement('style');
        style.innerHTML ='.sortable-noghost { display:none}';
    let ref = document.querySelector('script');
        ref.parentNode.insertBefore(style, ref);

    Sortable.create(document.querySelector("kortxyz-layerlist"), {
      group: "shared",
      animation:200,
      onStart: _=>{
        sortDrop.options.disabled = false
      },
      onRemove: (evt) => {
        this.layerRemoved.emit(evt.item.name)
        const el = evt.item;
              el.parentNode.removeChild(el);
      },
      onEnd: (evt) => {
        sortDrop.options.disabled = true

        const map:any = document.querySelector("kortxyz-mapbox").map
        if(!!evt.item.previousSibling) map.moveLayer(evt.item.name,evt.item.previousSibling.name)
      },
    });
  }

  @Listen('layerAdded', { target: 'body' })
  addLayeritem(event) {
    const layeritem = document.createElement("kortxyz-layeritem");
          layeritem.name=event.detail;
          layeritem.active=true;

   this.layerlistEl.insertBefore(layeritem,this.layerlistEl.childNodes[1]);

  }


  componentDidLoad() {
    this.addTools()
    this.initSortable()
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