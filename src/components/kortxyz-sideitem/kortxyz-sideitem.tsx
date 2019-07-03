import { Component,Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-sideitem',
  styleUrl: 'kortxyz-sideitem.css'
})

export class KortxyzSideItem {
@Prop() name: string;
@Prop() icon: string;
@Prop() small: boolean; 
@Prop({ mutable: true, reflect: true }) width: Number = 200;

@Event() sidebarResized: EventEmitter;


setActive = (clickedElement)=>{

    if(window["activeSidetab"] != clickedElement.target){
      window["activeSidetab"] = clickedElement.target;
      var label:any = document.querySelectorAll('.sideitem__label');
      label.forEach(element => {
        element.style.marginRight = element.parentElement.width + 'px';
      });
      var resizer:any = document.querySelectorAll('.sideitem__resizer');
      resizer.forEach(element => {
        element.style.display = 'block';
      });
    }

    else{
      window["activeSidetab"].checked = false;
      window["activeSidetab"] = null;
      var label:any = document.querySelectorAll('.sideitem__label');
      label.forEach(element => {
        element.style.marginRight = 0 + 'px';
      });
      var resizer:any = document.querySelectorAll('.sideitem__resizer');
      resizer.forEach(element => {
        element.style.display = 'none';
      });
    }

    this.sidebarResized.emit();
}

Resize = e => {
  if(e.clientX>150 && e.clientX<500){
    var content:any = document.querySelectorAll('.sideitem__content');
    content.forEach(element => {
      console.log(element)
      element.style.width = (e.clientX - element.offsetLeft) + 'px';
    });

    var label:any = document.querySelectorAll('.sideitem__label');
    label.forEach(element => {
      element.parentElement.width = (e.clientX - element.offsetLeft-40)
      element.style.marginRight = (e.clientX - element.offsetLeft-40) + 'px';
    });

    var resizer:any = document.querySelectorAll('.sideitem__resizer');
    resizer.forEach(element => {
      element.style.left = e.clientX-10+ 'px';
    });

    this.sidebarResized.emit();
  }
}

initResize = _ => {
  document.body.style.cursor = 'ew-resize';
  window.addEventListener('mousemove', this.Resize, false);
  window.addEventListener('mouseup', this.stopResize, false);
  }

stopResize = _ => {
  document.body.style.cursor = '';
  window.removeEventListener('mousemove', this.Resize, false);
  window.removeEventListener('mouseup', this.stopResize, false);
}




icons = {
  layers: <svg  class="sideitem__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/>
          </svg>,
  search: <svg  class="sideitem__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>,
  help: <svg  class="sideitem__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>,
  share: <svg  class="sideitem__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
        </svg>,
  settings:   <svg class="sideitem__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path fill="none" d="M0 0h20v20H0V0z"/>
          <path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
        </svg>,
  edit: <svg class="sideitem__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>,
  analysis: <svg class="sideitem__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"/>
            </svg>,
  apps: <svg class="sideitem__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 2l-5.5 9h11z"/><circle cx="17.5" cy="17.5" r="4.5"/><path d="M3 13.5h8v8H3z"/>
          <path fill="none" d="M0 0h24v24H0z"/>
        </svg>,
  sources: <svg class="sideitem__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
           </svg>,

}

  render() {
    return ([
      <input class="sideitem__input" type="radio" id={this.name} name="tab-group-side" onClick={this.setActive}></input>,
      <label class="sideitem__label" htmlFor={this.name} title={this.name}>
        {this.icons[this.icon]}
      </label>,
      <content class="sideitem__content">
        <header class="sideitem__header"><p>{this.name}</p><spacer></spacer><toolbox></toolbox></header>
        <slot />
      </content>,
      <div onMouseDown={ this.initResize } class="sideitem__resizer"></div>

    ]);
  }
}
