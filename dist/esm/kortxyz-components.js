import { p as promiseResolve, b as bootstrapLazy } from './index-fc9ae49b.js';
export { s as setNonce } from './index-fc9ae49b.js';

/*
 Stencil Client Patch Browser v4.2.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["kortxyz-mapinfo",[[1,"kortxyz-mapinfo",{"lngLat":[1040]}]]],["kortxyz-mapinfo-content",[[1,"kortxyz-mapinfo-content",{"text":[1025],"url":[1],"template":[1]},[[4,"newMarkerPosition","updateText"]]]]],["kortxyz-maplibre",[[4,"kortxyz-maplibre",{"mapstyle":[1],"mapboxkey":[1],"cooperativeGestures":[4,"cooperative-gestures"],"center":[1],"zoom":[2],"getMap":[64]}]]]], options);
});

//# sourceMappingURL=kortxyz-components.js.map