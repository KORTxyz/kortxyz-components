'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-bc55bcca.js');

/*
 Stencil Client Patch Browser v4.2.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('kortxyz-components.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["kortxyz-mapinfo.cjs",[[1,"kortxyz-mapinfo",{"lngLat":[1040]}]]],["kortxyz-mapinfo-content.cjs",[[1,"kortxyz-mapinfo-content",{"text":[1025],"url":[1],"template":[1]},[[4,"newMarkerPosition","updateText"]]]]],["kortxyz-maplibre.cjs",[[4,"kortxyz-maplibre",{"mapstyle":[1],"mapboxkey":[1],"cooperativeGestures":[4,"cooperative-gestures"],"center":[1],"zoom":[2],"getMap":[64]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=kortxyz-components.cjs.js.map