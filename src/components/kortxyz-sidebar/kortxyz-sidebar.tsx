import { Component ,h } from '@stencil/core';

@Component({
  tag: 'kortxyz-sidebar',
  styleUrl: 'kortxyz-sidebar.css'
})

export class kortxyzSidebar {

  context(e){
    e.preventDefault()
    console.log(e)
    const existingContext = document.querySelector("kortxyz-contextmenu");
    if(existingContext) existingContext.remove();

    const contextMenu = document.createElement("kortxyz-contextmenu")
    contextMenu.left = e.clientX;
    contextMenu.top = e.clientY;
    document.body.append(contextMenu) 
  }
  componentDidLoad(){
    document.querySelector("kortxyz-sidebar").oncontextmenu = e=> this.context(e)
  }

  render() {
    return <slot />;
	}
	
}