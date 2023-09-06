import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const kortxyzMapinfoContentCss = ":host{display:block;border-bottom:1px solid #eee;padding:0 0 0 15px}";

const KortxyzMapinfoContent$1 = /*@__PURE__*/ proxyCustomElement(class KortxyzMapinfoContent extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  static get style() { return kortxyzMapinfoContentCss; }
}, [1, "kortxyz-mapinfo-content", {
    "text": [1025],
    "url": [1],
    "template": [1]
  }, [[4, "newMarkerPosition", "updateText"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["kortxyz-mapinfo-content"];
  components.forEach(tagName => { switch (tagName) {
    case "kortxyz-mapinfo-content":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, KortxyzMapinfoContent$1);
      }
      break;
  } });
}

const KortxyzMapinfoContent = KortxyzMapinfoContent$1;
const defineCustomElement = defineCustomElement$1;

export { KortxyzMapinfoContent, defineCustomElement };

//# sourceMappingURL=kortxyz-mapinfo-content.js.map