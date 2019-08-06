import { Component, Prop, Element, State, h } from '@stencil/core';


@Component({
  tag: 'kortxyz-dialog',
  styleUrl: 'kortxyz-dialog.css'
})

export class kortxyzDialog { 

  @Element() dialogEl: HTMLElement;

  @Prop() top: number = 0;
  @Prop() left: number = 0;

  @State() name: string;
  @State() source: string;
  @State() sources: any[] = [];


  componentDidLoad(){
    this.dialogEl.style.top = this.top+"px"

    this.sources = Object.keys(document.querySelector("kortxyz-mapbox").map.getStyle().sources) 
    this.source = this.sources[0];

    this.dialogEl.oncontextmenu = e=> e.preventDefault();

    document.body.onclick = e =>{
      const path:any = e.composedPath();
      if(!path.filter(e=> e.nodeName == "KORTXYZ-DIALOG").length && !path.filter(e=> e.className == "layerlist__addLayer").length){
        this.dialogEl.remove();
        document.body.onclick = null;
      }
    }
  }

  handleChange(e) {
    this.name = e.target.value;
  }

  handleSelect(e) {
    this.source = e.target.value;
  }
  addLayer(){
    document.querySelector("kortxyz-mapbox").addLayer(this.name,this.source)
    this.dialogEl.remove();
    document.body.onclick = null;
  }

  render() {
    return ([
      <label htmlFor="sources">source</label>,
      <select id="sources" onInput={(event) => this.handleSelect(event)}>
        {this.sources.map(source => <option value={source}>{source}</option> )}
      </select>,
      <label htmlFor="name">name</label>,
      <input id="name" value={this.name} onInput={(e) => this.handleChange(e)}></input>,
      <button onClick={this.addLayer.bind(this)}>Add Layer</button>
      ] 
    );
  }
}


