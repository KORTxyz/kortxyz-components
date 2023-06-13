import { p as promiseResolve, b as bootstrapLazy } from './index-adac3bab.js';
export { s as setNonce } from './index-adac3bab.js';

/*
 Stencil Client Patch Esm v3.3.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["kortxyz-mapinfo_3",[[1,"kortxyz-mapinfo",{"lngLat":[1040]}],[1,"kortxyz-mapinfo-content",{"text":[1025],"url":[1],"template":[1]},[[4,"newMarkerPosition","updateText"]]],[4,"kortxyz-maplibre",{"mapstyle":[1],"mapboxkey":[1],"cooperativeGestures":[4,"cooperative-gestures"],"center":[1],"zoom":[2],"getMap":[64]}]]]], options);
  });
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map