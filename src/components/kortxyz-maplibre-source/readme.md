# kortxyz-maplibre-source



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                                                                                                                                                                                                                                | Default     |
| ---------- | ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `data`     | `data`     |             | `Feature<Geometry, { [name: string]: any; }> \| FeatureCollection<Geometry, { [name: string]: any; }> \| GeometryCollection<Geometry> \| LineString \| MultiLineString \| MultiPoint \| MultiPolygon \| Point \| Polygon \| string` | `undefined` |
| `maxzoom`  | `maxzoom`  |             | `number`                                                                                                                                                                                                                            | `undefined` |
| `tiles`    | `tiles`    |             | `string`                                                                                                                                                                                                                            | `undefined` |
| `tilesize` | `tilesize` |             | `number`                                                                                                                                                                                                                            | `undefined` |
| `type`     | `type`     |             | `"geojson" \| "raster" \| "vector"`                                                                                                                                                                                                 | `undefined` |


## Methods

### `addLayer(layer: maplibregl.LayerSpecification) => Promise<void>`



#### Parameters

| Name    | Type                                                                                                                                                                                                                                                                  | Description |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `layer` | `FillLayerSpecification \| LineLayerSpecification \| SymbolLayerSpecification \| CircleLayerSpecification \| HeatmapLayerSpecification \| FillExtrusionLayerSpecification \| RasterLayerSpecification \| HillshadeLayerSpecification \| BackgroundLayerSpecification` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
