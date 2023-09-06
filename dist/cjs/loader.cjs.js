'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-bc55bcca.js');

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return undefined;
  return index.bootstrapLazy([["kortxyz-mapinfo.cjs",[[1,"kortxyz-mapinfo",{"lngLat":[1040]}]]],["kortxyz-mapinfo-content.cjs",[[1,"kortxyz-mapinfo-content",{"text":[1025],"url":[1],"template":[1]},[[4,"newMarkerPosition","updateText"]]]]],["kortxyz-maplibre.cjs",[[4,"kortxyz-maplibre",{"mapstyle":[1],"mapboxkey":[1],"cooperativeGestures":[4,"cooperative-gestures"],"center":[1],"zoom":[2],"getMap":[64]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map