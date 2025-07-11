import { Component, Host, State,Listen, Element, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-maplibre-layerlist',
  styleUrl: 'kortxyz-maplibre-layerlist.css',
  shadow: true,
})
export class KortxyzMaplibreLayerlist {
  @Element() layerlistEl: HTMLElement;
  
  private list?: HTMLElement;
  private config?: HTMLElement;

  @Listen('open', { target: 'document' })
  onSidebarOpen(e) {
    console.log(e.detail,this.layerlistEl.parentElement.id)
    if(e.detail.panel==this.layerlistEl.parentElement.id){
      const mapDiv = document.querySelector("kortxyz-maplibre");
      this.mapstyle = mapDiv.map.getStyle()
      console.log(this.mapstyle)
    }

  }

  @State() mapstyle;
  

  async openConfig(){
    this.list.classList.toggle("open");
    this.config.classList.toggle("open");
  }

  render() {
    return (
      <Host>
        <list ref={el => this.list = el as HTMLElement} class="open">
         {this.mapstyle?.layers.map((layers) => (
              
            <div onClick={()=>this.openConfig()}>
              <div>{layers.id}</div>

            </div>
          ))}
        </list>

        <config ref={el => this.config = el as HTMLElement} onClick={()=>this.openConfig()}>
        
        </config>
       
      </Host>
    );
  }
}
