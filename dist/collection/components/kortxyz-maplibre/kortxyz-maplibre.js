import { Host, h } from '@stencil/core';
import maplibregl from 'maplibre-gl';
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer';
export class KortxyzMaplibre {
  constructor() {
    this.mapstyle = 'https://demotiles.maplibre.org/style.json';
    this.mapboxkey = undefined;
    this.cooperativeGestures = false;
    this.center = undefined;
    this.zoom = undefined;
  }
  async getMap() {
    const map = this.map;
    return map;
  }
  componentWillLoad() {
    let mapOptions = {
      container: this.mapEl,
      style: this.mapstyle,
      cooperativeGestures: this.cooperativeGestures,
      attributionControl: false,
      transformRequest: (url, resourceType) => {
        if (isMapboxURL(url))
          return transformMapboxUrl(url, resourceType, this.mapboxkey);
        return { url };
      }
    };
    if (this.center)
      mapOptions["center"] = JSON.parse(this.center);
    if (this.zoom)
      mapOptions["zoom"] = Number(this.zoom);
    this.map = new maplibregl.Map(mapOptions);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  static get is() { return "kortxyz-maplibre"; }
  static get originalStyleUrls() {
    return {
      "$": ["kortxyz-maplibre.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["kortxyz-maplibre.css"]
    };
  }
  static get properties() {
    return {
      "mapstyle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "maplibregl.StyleSpecification | string",
          "resolved": "string | { version: 8; name?: string; metadata?: unknown; center?: number[]; zoom?: number; bearing?: number; pitch?: number; light?: LightSpecification; terrain?: TerrainSpecification; sources: { [_: string]: SourceSpecification; }; sprite?: SpriteSpecification; glyphs?: string; transition?: TransitionSpecification; layers: LayerSpecification[]; }",
          "references": {
            "maplibregl": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "mapstyle",
        "reflect": false,
        "defaultValue": "'https://demotiles.maplibre.org/style.json'"
      },
      "mapboxkey": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "mapboxkey",
        "reflect": false
      },
      "cooperativeGestures": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "cooperative-gestures",
        "reflect": false,
        "defaultValue": "false"
      },
      "center": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "center",
        "reflect": false,
        "defaultValue": "undefined"
      },
      "zoom": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "zoom",
        "reflect": false,
        "defaultValue": "undefined"
      }
    };
  }
  static get methods() {
    return {
      "getMap": {
        "complexType": {
          "signature": "() => Promise<any>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<any>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "mapEl"; }
}
//# sourceMappingURL=kortxyz-maplibre.js.map
