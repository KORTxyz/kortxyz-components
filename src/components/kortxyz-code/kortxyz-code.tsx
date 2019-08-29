import { Component, Element, Prop, h } from '@stencil/core';
import { default as style }from '@mapbox/mapbox-gl-style-spec'
import Pickr from '@simonwep/pickr';

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

    //@ts-ignore
    var textarea = document.querySelector("textarea")
    var test:any = map.getLayer(this.layer);
    textarea.value = JSON.stringify(test.serialize(),null,4)
    console.log(this.layer,)
  }
    
  handleBlur(e){
    var textarea = document.querySelector("textarea")

    textarea.reportValidity()	

    var map = document.querySelector("kortxyz-mapbox").map
    var getStyle = map.getStyle();

    try {
      var layer = JSON.parse(e.target.value)
    } catch (error) {
      alert(error)
    }
    getStyle.layers = [layer]

    var valid = style.validate(getStyle) 
    console.log(valid,layer)
    if(!valid.length) {
      map.removeLayer(this.layer)
      map.addLayer(layer)
      this.codeEl.remove()
    }
    else{
      alert(valid[0].message.slice(10))
    }
  }
  getCaretPosition(textarea) {
    
      return textarea.value.slice(textarea.selectionStart,textarea.selectionEnd);
    
  }

  isColor(strColor){
    var s = new Option().style;
    s.color = strColor;
    var pcik = Pickr.create({
      el: '.color-picker',
      theme: 'nano', 
      container: 'body',
      
   });
   pcik.show()
    return s.color !== '';
  }

  handleClick(e){
    console.log( this.isColor(this.getCaretPosition(e.target))    )
  }


  render() {
    return [<div class=".color-picker"></div>,<textarea wrap="off" onClick={this.handleClick.bind(this)} onBlur={this.handleClick.bind(this)}></textarea>]
  }
}


