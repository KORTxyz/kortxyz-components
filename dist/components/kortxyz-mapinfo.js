import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { m as maplibregl } from './maplibre-gl.js';

const kortxyzMapinfoCss = ":host{background-color:white;bottom:0.5rem;display:flex;flex-direction:column;left:0;margin:auto;max-height:calc(50vh - 5rem);position:absolute;right:0;width:400px;z-index:2;display:none}:host(.show){display:block}table{background:var(--white);font-family:Roboto, \"Droid Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;font-size:12px}#closebutton{align-items:center;background:var(--white);display:flex;height:24px;justify-content:center;margin-left:auto;width:24px}#closebutton:hover{background:var(--grey-10);cursor:pointer}";

const KortxyzMapinfo$1 = /*@__PURE__*/ proxyCustomElement(class KortxyzMapinfo extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.newMarkerPosition = createEvent(this, "newMarkerPosition", 7);
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
  get infoboxEl() { return this; }
  static get style() { return kortxyzMapinfoCss; }
}, [1, "kortxyz-mapinfo", {
    "lngLat": [1040]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["kortxyz-mapinfo"];
  components.forEach(tagName => { switch (tagName) {
    case "kortxyz-mapinfo":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, KortxyzMapinfo$1);
      }
      break;
  } });
}

const KortxyzMapinfo = KortxyzMapinfo$1;
const defineCustomElement = defineCustomElement$1;

export { KortxyzMapinfo, defineCustomElement };

//# sourceMappingURL=kortxyz-mapinfo.js.map