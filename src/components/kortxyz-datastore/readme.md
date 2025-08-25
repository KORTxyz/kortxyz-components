# kortxyz-datastore
<!-- Auto Generated Below -->


## Overview

## Intro
Webcomponent to store data that multiple components can use.

## Example
```html
<kortxyz-datastore
store="teststore"
data="https://example.geojson"
></kortxyz-datastore>
```

## Properties

| Property    | Attribute   | Description                                | Type      | Default     |
| ----------- | ----------- | ------------------------------------------ | --------- | ----------- |
| `data`      | `data`      | URL to the data to be fetch into the Store | `string`  | `undefined` |
| `store`     | `store`     | Name of the store                          | `string`  | `undefined` |
| `sync`      | `sync`      | Should edits sync back to the datasource   | `boolean` | `undefined` |
| `transform` | `transform` | Transform geojson-features with JSONata    | `string`  | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
