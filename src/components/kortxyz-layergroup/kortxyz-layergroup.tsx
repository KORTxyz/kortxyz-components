import { Component, h } from '@stencil/core';
import Sortable from 'sortablejs';


@Component({
  tag: 'kortxyz-layergroup',
  //styleUrl: 'kortxyz-layergroup.css'
})

export class kortxyzLayergroup { 
  componentDidLoad() {
        for (var i = 0; i < document.querySelectorAll("kortxyz-layergroup").length; i++) {
          new Sortable(document.querySelectorAll("kortxyz-layergroup")[i], {
            group: 'nested',
            animation: 150,
            fallbackOnBody: true,
            swapThreshold: 0.65
          });
        }
		
	}

  

  render() {
    return ([
        <div>Test</div>,
    ]);
  }
}