# kortxyz-aggrid


## Intro
Webcomponent to show a table. A rowclicked event occurs when a row is clicked 

## Example
* Get geojson from a datastore
```html
<kortxyz-aggrid
store="teststore"
></kortxyz-aggrid>
```

* Get geojson from a url
```html
<kortxyz-aggrid
data="https://example.geojson"
></kortxyz-aggrid>
```
<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description             | Type     | Default     |
| -------- | --------- | ----------------------- | -------- | ----------- |
| `data`   | `data`    | Fetch data from a url   | `string` | `undefined` |
| `store`  | `store`   | Fetch data from a store | `string` | `undefined` |


## Events

| Event        | Description               | Type               |
| ------------ | ------------------------- | ------------------ |
| `rowClicked` | Event when row is clicked | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
