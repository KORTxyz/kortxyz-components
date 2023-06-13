import { Component, Element,  Host, Prop, Method, h } from '@stencil/core';

import maplibregl from 'maplibre-gl';
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer'

@Component({
  tag: 'kortxyz-maplibre',
  styleUrl: 'kortxyz-maplibre.css',
  shadow: false
})

export class KortxyzMaplibre {
	@Element() mapEl: HTMLElement;

	@Prop() mapstyle?: maplibregl.StyleSpecification | string = 'https://demotiles.maplibre.org/style.json';
  @Prop() mapboxkey: string;

  @Prop() cooperativeGestures?: boolean = false;
	@Prop() center?: string = undefined;
	@Prop() zoom?: number = undefined;

  private map:maplibregl.Map;


  @Method()
	async getMap() {
    const map:any = this.map 
    return map
  }

	componentWillLoad() {
		let mapOptions:maplibregl.MapOptions = {
			container: this.mapEl,
			style: this.mapstyle,
			cooperativeGestures: this.cooperativeGestures,
			attributionControl: false,
      transformRequest: (url: string, resourceType: string) => {
				if (isMapboxURL(url)) return transformMapboxUrl(url, resourceType, this.mapboxkey)
				return { url }
			}
		};
    if (this.center) mapOptions["center"] = JSON.parse(this.center);
		if (this.zoom) mapOptions["zoom"] = Number(this.zoom);

		this.map = new maplibregl.Map(mapOptions);
	}

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
