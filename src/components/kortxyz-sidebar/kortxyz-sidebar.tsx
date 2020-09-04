import { Component, Element, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-sidebar',
  styleUrl: 'kortxyz-sidebar.css'
})

export class kortxyzSidebar {
  @Element() sidebarEl: HTMLElement;
/*
  context(e){
    e.preventDefault();
    e.stopPropagation();

    const existingContext = document.querySelector("kortxyz-contextmenu");
    if(existingContext) existingContext.remove();
    console.log(e)
    const contextMenu = document.createElement("kortxyz-contextmenu")
    contextMenu.left =  e.clientX;
    contextMenu.top =  e.clientY>document.body.clientHeight-150? document.body.clientHeight-150 :  e.clientY;
    document.body.append(contextMenu) 
  }

  componentDidLoad() {
    this.sidebarEl.addEventListener('contextmenu',e=>this.context(e))
  }
*/
  render() {
    return <slot />;
	}
	
}