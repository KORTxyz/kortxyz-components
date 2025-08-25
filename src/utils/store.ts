import { createStore } from "@stencil/store";

let storeContainer = {}

const createNewStore = name => {

  const newStore = createStore({
    data: {
      "type": "FeatureCollection",
      "features": []
    },
    editeddata: {
      "type": "FeatureCollection",
      "features": []
    },
    lastOrigin: null
  });

  storeContainer[name] = newStore
  return newStore
}

const getStore = name => storeContainer[name]

export {
  createNewStore,
  getStore
}