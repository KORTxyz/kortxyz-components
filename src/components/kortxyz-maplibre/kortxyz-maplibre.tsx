import { Component, Element,  Host, Prop, Method, h } from '@stencil/core';
import {
	TerraDraw,
	TerraDrawPointMode,
	TerraDrawCircleMode,
	TerraDrawLineStringMode,
	TerraDrawPolygonMode,
	TerraDrawSelectMode,
	TerraDrawFreehandMode,
	TerraDrawRectangleMode,
	TerraDrawMapLibreGLAdapter,
	TerraDrawGreatCircleMode,
} from "terra-draw";

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


  private getModes = () => {
      return [
        new TerraDrawSelectMode({
          flags: {
            arbitary: {
              feature: {},
            },
            polygon: {
              feature: {
                draggable: true,
                rotateable: true,
                scaleable: true,
                coordinates: {
                  midpoints: true,
                  draggable: true,
                  deletable: true,
                },
              },
            },
            freehand: {
              feature: { draggable: true, coordinates: {} },
            },
            linestring: {
              feature: {
                draggable: true,
                coordinates: {
                  midpoints: true,
                  draggable: true,
                  deletable: true,
                },
              },
            },
            circle: {
              feature: {
                draggable: true,
              },
            },
            point: {
              feature: {
                draggable: true,
              },
            },
          },
        }),
        new TerraDrawPointMode(),
        new TerraDrawLineStringMode({
          snapping: true,
          allowSelfIntersections: false,
        }),
        new TerraDrawGreatCircleMode({ snapping: true }),
        new TerraDrawPolygonMode({
          snapping: true,
          allowSelfIntersections: false,
        }),
        new TerraDrawRectangleMode(),
        new TerraDrawCircleMode(),
        new TerraDrawFreehandMode()
      ]
  };

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

		this.map.on("style.load", () => {
			const draw = new TerraDraw({
				adapter: new TerraDrawMapLibreGLAdapter({
					map: this.map,
					coordinatePrecision: 9,
				}),
				modes: this.getModes(),
			});

			draw.start();
      console.log(draw, this.map)
		});

	}

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
