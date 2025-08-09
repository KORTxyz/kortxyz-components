import { createStore } from "@stencil/store";

let storeContainer = {}

const createNewStore = name => {
  storeContainer[name] = createStore({ data: {},lastOrigin: null })
}

const getStore = name => storeContainer[name]

export {
  createNewStore,
  getStore
}