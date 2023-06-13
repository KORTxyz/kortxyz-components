'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-0906e4f3.js');

/*
 Stencil Client Patch Esm v3.3.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["kortxyz-mapinfo_3.cjs",[[1,"kortxyz-mapinfo",{"lngLat":[1040]}],[1,"kortxyz-mapinfo-content",{"text":[1025],"url":[1],"template":[1]},[[4,"newMarkerPosition","updateText"]]],[4,"kortxyz-maplibre",{"mapstyle":[1],"mapboxkey":[1],"cooperativeGestures":[4,"cooperative-gestures"],"center":[1],"zoom":[2],"getMap":[64]}]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map