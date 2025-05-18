# kortxyz-maplibre


<!-- Auto Generated Below -->


## Overview

## Intro
Webcomponent to show a map based on  [MaplibreGL](https://maplibre.org/).

## Example
 Show a demo map 
```html
<kortxyz-maplibre 
    style="width:100%;height: 200px;display:block"
    mapstyle='https://demotiles.maplibre.org/style.json'
></kortxyz-maplibre>
```

 Show a map on top a official basemap
```html
<kortxyz-maplibre 
    style="width:100%;height:500px;display:block;background: whitesmoke;"
    bbox="[12.40100150309453,55.6008931492048,12.28220098836423,55.63638904335573]"
    mapstyle="./assets/skoledistrikter2024.json"
    basemapstyle="https://raw.githubusercontent.com/SDFIdk/vector_tiles_assets/refs/heads/main/styles/official/3857_skaermkort_graa.json"
></kortxyz-maplibre>
```

## Properties

| Property              | Attribute              | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Default                                                                                                                                             |
| --------------------- | ---------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `basemapstyle`        | `basemapstyle`         |             | `string \| { version: 8; name?: string; metadata?: unknown; center?: number[]; centerAltitude?: number; zoom?: number; bearing?: number; pitch?: number; roll?: number; light?: LightSpecification; sky?: SkySpecification; projection?: ProjectionSpecification; terrain?: TerrainSpecification; sources: { [_: string]: SourceSpecification; }; sprite?: SpriteSpecification; glyphs?: string; transition?: TransitionSpecification; layers: LayerSpecification[]; }` | `undefined`                                                                                                                                         |
| `bbox`                | `bbox`                 |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `undefined`                                                                                                                                         |
| `center`              | `center`               |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `undefined`                                                                                                                                         |
| `cooperativeGestures` | `cooperative-gestures` |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `false`                                                                                                                                             |
| `hoverpopup`          | `hoverpopup`           |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined`                                                                                                                                         |
| `map`                 | `map`                  |             | `Map$1`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `undefined`                                                                                                                                         |
| `mapboxkey`           | `mapboxkey`            |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `undefined`                                                                                                                                         |
| `mapstyle`            | `mapstyle`             |             | `string \| { version: 8; name?: string; metadata?: unknown; center?: number[]; centerAltitude?: number; zoom?: number; bearing?: number; pitch?: number; roll?: number; light?: LightSpecification; sky?: SkySpecification; projection?: ProjectionSpecification; terrain?: TerrainSpecification; sources: { [_: string]: SourceSpecification; }; sprite?: SpriteSpecification; glyphs?: string; transition?: TransitionSpecification; layers: LayerSpecification[]; }` | `{       "version": 8,       "name": "name",       "center": [0, 0],       "zoom": 16,       "sources": {       },       "layers": [       ]     }` |
| `showTileBoundaries`  | `show-tile-boundaries` |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `false`                                                                                                                                             |
| `zoom`                | `zoom`                 |             | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `undefined`                                                                                                                                         |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
