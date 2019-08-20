import { Component, Prop, Element, h } from '@stencil/core';


@Component({
  tag: 'kortxyz-layermenu',
  styleUrl: 'kortxyz-layermenu.css'
})

export class kortxyzContextmenu { 

  @Prop() top: number = 0;
  @Prop() left: number = 0;


  @Element() contextEl: HTMLElement;    
  componentDidLoad(){
    this.contextEl.style.top = this.top+"px"
    this.contextEl.style.left = this.left+"px"
    
    this.contextEl.oncontextmenu = e=> e.preventDefault();

      document.body.onclick = e =>{
        const path:any = e.composedPath();
        if(!path.filter(e=> e.nodeName == "KORTXYZ-LAYERMENU").length){
          document.querySelector("KORTXYZ-LAYERMENU").remove();
          document.body.onclick = null;
        }
        
      }
  
  }
    
  

  render() {
    return ([
          <div id="item1" class="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <div>Rename layer</div>
            <div>Ctrl+shift+L</div>
          </div>,
            <div id="item1" class="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <div>Delete layer</div>
            <div>Ctrl+shift+S</div>
          </div>,
          <hr></hr>,
            <div id="item1" class="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <div>Filter</div>
            <div>Ctrl+shift+D</div>
          </div>,
            <div id="item1" class="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <div>Layout Property</div>
            <div>Ctrl+shift+X</div>
          </div>,
            <div id="item1" class="item">		
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <div>Paint Property</div>
            <div>Ctrl+shift+X</div>
          </div>,
          <hr></hr>,
          <div id="item1" class="item">		
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"></svg>
            <div>Show Attributetable</div>
          </div>,
          <hr></hr>,
      ] 
    );
  }
}


