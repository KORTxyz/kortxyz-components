import { Host, h } from "@stencil/core";
export class KortxyzMapinfoContent {
  constructor() {
    this.getValue = (path, obj) => path.split('.').reduce((acc, c) => acc && acc[c], obj);
    this.parseStringTemplate = (str, obj) => {
      let parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ.]*\}/);
      let args = str.match(/[^{\}]+(?=})/g) || [];
      let parameters = args.map(arg => this.getValue(arg, obj) || (this.getValue(arg, obj) === undefined ? "" : this.getValue(arg, obj)));
      return String.raw({ raw: parts }, ...parameters);
    };
    this.text = "temp";
    this.url = undefined;
    this.template = "";
  }
  async updateText(e) {
    const url = this.parseStringTemplate(this.url, e.detail);
    const response = await fetch(url);
    const geojson = await response.json();
    if (geojson)
      this.text = this.parseStringTemplate(this.template, geojson.features[0]);
  }
  render() {
    return (h(Host, null, this.text));
  }
  static get is() { return "kortxyz-mapinfo-content"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["kortxyz-mapinfo-content.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["kortxyz-mapinfo-content.css"]
    };
  }
  static get properties() {
    return {
      "text": {
        "type": "string",
        "mutable": true,
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
        "attribute": "text",
        "reflect": false,
        "defaultValue": "\"temp\""
      },
      "url": {
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
        "attribute": "url",
        "reflect": false
      },
      "template": {
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
        "attribute": "template",
        "reflect": false,
        "defaultValue": "\"\""
      }
    };
  }
  static get listeners() {
    return [{
        "name": "newMarkerPosition",
        "method": "updateText",
        "target": "document",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=kortxyz-mapinfo-content.js.map
