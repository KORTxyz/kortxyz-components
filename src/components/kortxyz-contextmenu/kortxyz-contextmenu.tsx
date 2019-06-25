import { Component, h } from '@stencil/core';


@Component({
  tag: 'kortxyz-contextmenu',
  styleUrl: 'kortxyz-contextmenu.css'
})

export class kortxyzContextmenu { 

  render() {
    return ([
        <div id="item1" class="item">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <div>Explorer</div>
        <div>Ctrl+shift+E</div>
        </div>,
        <div id="item1" class="item">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <div>Search</div>
        <div>Ctrl+shift+S</div>
        </div>,
        <div id="item1" class="item">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <div>Source Control</div>
        <div>Ctrl+shift+G</div>
        </div>,
        <div id="item1" class="item">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <div>Debug</div>
        <div>Ctrl+shift+D</div>
        </div>,
        <div id="item1" class="item">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <div>Extensions</div>
        <div>Ctrl+shift+X</div>
        </div>,
        <hr></hr>,
        <div id="item1" class="item">		
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"></svg>
        <div>Hide Activitybar</div>
        <div></div>
        </div>,
    ]);
  }
}


