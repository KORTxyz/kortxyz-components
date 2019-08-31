import { Component, Element, Prop, h } from '@stencil/core';
import { default as style }from '@mapbox/mapbox-gl-style-spec'

@Component({
  tag: 'kortxyz-code',
  styleUrl: 'kortxyz-code.css'
})

export class kortxyzCode { 
  @Element() codeEl: HTMLElement;    
  @Prop() top: number = 0;
  @Prop() left: number = 0;
  @Prop() layer;

  componentDidLoad(){
    this.codeEl.style.top = this.top+"px"
    this.codeEl.style.left = this.left+"px"
    var map = document.querySelector("kortxyz-mapbox").map

    var textarea = document.querySelector("textarea")
    var test:any = map.getLayer(this.layer);
    textarea.value = JSON.stringify(test.serialize(),null,4)
    textarea.focus();
    
  }
    
  handleBlur(e){
    var map = document.querySelector("kortxyz-mapbox").map
    var getStyle = map.getStyle();

    try {
      var layer = JSON.parse(e.target.value)
    } catch (error) {
      alert(error)
    }
    getStyle.layers = [layer]

    var valid = style.validate(getStyle) 
    if(!valid.length) {
      map.removeLayer(this.layer)
      map.addLayer(layer)
      this.codeEl.remove()
    }
    else{
      alert(valid[0].message.slice(10))
    }
  }

/*
  isColor(strColor){
    var s = new Option().style;
    s.color = strColor;
    return s.color !== '';
  }

  handleClick(e){
    textarea = e.target
    txt = textarea.value.slice(textarea.selectionStart,textarea.selectionEnd)

    //console.log( this.isColor(txt) )
  }
*/

  render() {
    return [<div class=".color-picker"></div>,<textarea wrap="off" onBlur={this.handleBlur.bind(this)}></textarea>]
  }
}


