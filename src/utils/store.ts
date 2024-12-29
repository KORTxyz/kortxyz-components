import { createStore } from "@stencil/store";

let globalStore = createStore({
  activemap:null,
  style:{
    "version": 8,
    "sources": {},
    "layers": []
  },
  drawerwidth: 400
});

export default globalStore;
