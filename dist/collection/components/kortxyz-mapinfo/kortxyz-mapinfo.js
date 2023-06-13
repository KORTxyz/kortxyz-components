import { h } from '@stencil/core';
import maplibregl from 'maplibre-gl';
export class KortxyzMapinfo {
  constructor() {
    this.onDragEnd = () => {
      this.lngLat = this.marker.getLngLat();
      console.log(this.lngLat);
    };
    this.lngLat = undefined;
  }
  async componentWillLoad() {
    const mapDiv = this.infoboxEl.parentElement;
    mapDiv.getMap().then((map) => {
      map.on('click', async (e) => {
        this.lngLat = e.lngLat;
        this.newMarkerPosition.emit(this.lngLat);
        if (!this.marker)
          this.marker = new maplibregl.Marker({ color: "#333", draggable: true }).setLngLat(this.lngLat).addTo(map).on('dragend', this.onDragEnd);
        else
          this.marker.setLngLat(this.lngLat);
        this.infoboxEl.classList.add("show");
      });
    });
  }
  async close() {
    this.marker.remove();
    this.marker = null;
    this.infoboxEl.classList.remove("show");
  }
  render() {
    return ([
      h("div", null, h("kortxyz-button", { icon: "close", id: "closebutton", onClick: () => this.close() })),
      h("div", null, h("div", null, this.lngLat ? this.lngLat.toArray().map(e => Math.floor(e * 1000) / 1000).toString() : ""), h("slot", null))
    ]);
  }
  static get is() { return "kortxyz-mapinfo"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["kortxyz-mapinfo.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["kortxyz-mapinfo.css"]
    };
  }
  static get properties() {
    return {
      "lngLat": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "maplibregl.LngLat",
          "resolved": "LngLat",
          "references": {
            "maplibregl": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "newMarkerPosition",
        "name": "newMarkerPosition",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "infoboxEl"; }
}
//# sourceMappingURL=kortxyz-mapinfo.js.map
