# kortxyz-aggrid
<!-- Auto Generated Below -->


## Overview

## Intro
Webcomponent to show a table. A rowclicked event occurs when a row is clicked 

## Example
 Get geojson from a datastore
```html
<kortxyz-aggrid
store="teststore"
></kortxyz-aggrid>
```

 Get geojson from a url
```html
<kortxyz-aggrid
data="https://example.geojson"
></kortxyz-aggrid>
```

## Properties

| Property | Attribute | Description                                       | Type     | Default     |
| -------- | --------- | ------------------------------------------------- | -------- | ----------- |
| `data`   | `data`    | Fetch data from a url                             | `string` | `undefined` |
| `schema` | `schema`  | Fetch JSON schema from a url or parse Inline JSON | `any`    | `undefined` |
| `store`  | `store`   | Fetch data from a store                           | `string` | `undefined` |


## Events

| Event        | Description               | Type               |
| ------------ | ------------------------- | ------------------ |
| `rowClicked` | Event when row is clicked | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
