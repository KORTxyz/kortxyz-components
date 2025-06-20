# kortxyz-tauchart



<!-- Auto Generated Below -->


## Overview

## Intro
Webcomponent to visualise data on charts.

## Example

### From data url
```html
<kortxyz-tauchart
  data="https://geodk.kort.xyz/collections/bygning/items?limit=100&properties=vertikalnoejagtighed,plannoejagtighed,planstedfaestelsesmetode"
  type="scatterplot"
  y="vertikalnoejagtighed"
  x="plannoejagtighed"
  color="planstedfaestelsesmetode"
  tooltip
  legend
></kortxyz-tauchart>
```

### From store
```html
<kortxyz-datastore style="visibility: hidden;"
  store="items" 
  data="https://geodk.kort.xyz/collections/vejmidte/items?limit=7000&properties=Trafikart,Vejkategori,Vejmidtetype"
></kortxyz-datastore>

<kortxyz-tauchart
  store="items"
  type="horizontal-stacked-bar"
  y="vejkategori"
  x="count"
  color="trafikart"
  colorbrewer="Dark2"
  group-by-keys="trafikart,vejkategori,vejmidtetype"
  tooltip
  legend
></kortxyz-tauchart>
```

## Properties

| Property      | Attribute       | Description                                                   | Type                                                                                                                                         | Default     |
| ------------- | --------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `color`       | `color`         | Attribute to use for color                                    | `string`                                                                                                                                     | `undefined` |
| `colorbrewer` | `colorbrewer`   | Colorscheme based on Colorbrewer2                             | `string`                                                                                                                                     | `undefined` |
| `data`        | `data`          | Fetch data from a url                                         | `string`                                                                                                                                     | `undefined` |
| `groupByKeys` | `group-by-keys` | Group data by these keys returning a attribute called "count" | `string`                                                                                                                                     | `undefined` |
| `legend`      | `legend`        | Add a legend                                                  | `boolean`                                                                                                                                    | `false`     |
| `store`       | `store`         | Fetch data from a store                                       | `string`                                                                                                                                     | `undefined` |
| `tooltip`     | `tooltip`       | Show tooltips on hover                                        | `boolean`                                                                                                                                    | `false`     |
| `type`        | `type`          | Type of chart                                                 | `"bar" \| "horizontal-bar" \| "horizontal-stacked-bar" \| "line" \| "map" \| "parallel" \| "scatterplot" \| "stacked-area" \| "stacked-bar"` | `undefined` |
| `x`           | `x`             | Attribute to use on the x axis                                | `string`                                                                                                                                     | `undefined` |
| `y`           | `y`             | Attribute to use on the y axis                                | `string`                                                                                                                                     | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
