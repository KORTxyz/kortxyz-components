# kortxyz-maplibre



<!-- Auto Generated Below -->


## Properties

<<<<<<< HEAD
| Property              | Attribute              | Description | Type                                                                                                                                                                                                                                                                                                                                                              | Default                                       |
| --------------------- | ---------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `center`              | `center`               |             | `string`                                                                                                                                                                                                                                                                                                                                                          | `undefined`                                   |
| `cooperativeGestures` | `cooperative-gestures` |             | `boolean`                                                                                                                                                                                                                                                                                                                                                         | `false`                                       |
| `mapboxkey`           | `mapboxkey`            |             | `string`                                                                                                                                                                                                                                                                                                                                                          | `undefined`                                   |
| `mapstyle`            | `mapstyle`             |             | `string \| { version: 8; name?: string; metadata?: unknown; center?: number[]; zoom?: number; bearing?: number; pitch?: number; light?: LightSpecification; terrain?: TerrainSpecification; sources: { [_: string]: SourceSpecification; }; sprite?: SpriteSpecification; glyphs?: string; transition?: TransitionSpecification; layers: LayerSpecification[]; }` | `'https://demotiles.maplibre.org/style.json'` |
| `zoom`                | `zoom`                 |             | `number`                                                                                                                                                                                                                                                                                                                                                          | `undefined`                                   |
=======
| Property       | Attribute      | Description | Type                                                                                                                                                                                                                                                                                                                                                                                           | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------- | -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `basemapstyle` | `basemapstyle` |             | `string \| { version: number; name?: string; metadata?: unknown; center?: number[]; zoom?: number; bearing?: number; pitch?: number; light?: LightSpecification; sky?: SkySpecification; terrain?: TerrainSpecification; sources: { [_: string]: SourceSpecification; }; sprite?: SpriteSpecification; glyphs?: string; transition?: TransitionSpecification; layers: LayerSpecification[]; }` | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `mapstyle`     | `mapstyle`     |             | `string \| { version: number; name?: string; metadata?: unknown; center?: number[]; zoom?: number; bearing?: number; pitch?: number; light?: LightSpecification; sky?: SkySpecification; terrain?: TerrainSpecification; sources: { [_: string]: SourceSpecification; }; sprite?: SpriteSpecification; glyphs?: string; transition?: TransitionSpecification; layers: LayerSpecification[]; }` | `{       "version": 8,       "name": "name",       "center": [12.356231321327698, 55.61676705920823],       "zoom": 12.5,       "sources": {         's2maps-tiles': {           'type': 'raster',           'tiles': [             'https://s2maps-tiles.eu/wmts?layer=s2cloudless-2021_3857&style=default&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}'           ],           'tileSize': 256,           'maxzoom': 14,         },       },       "layers": [         {           'id': 's2maps',           'type': 'raster',           'source': 's2maps-tiles'         }       ]     }` |
>>>>>>> 7045811 (first commit)


## Methods

<<<<<<< HEAD
### `getMap() => Promise<any>`
=======
### `getMap() => Promise<maplibregl.Map>`
>>>>>>> 7045811 (first commit)



#### Returns

<<<<<<< HEAD
Type: `Promise<any>`
=======
Type: `Promise<Map$1>`
>>>>>>> 7045811 (first commit)




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
