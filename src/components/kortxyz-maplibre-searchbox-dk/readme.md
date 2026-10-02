# kortxyz-maplibre-searchbox



<!-- Auto Generated Below -->


## Overview

### Intro
Webcomponent to use inside kortxyz-maplibre to search for a point.

### Example
```html
<kortxyz-maplibre>
   <kortxyz-maplibre-searchbox
       url="https://api.dataforsyningen.dk/adgangsadresser?q={input}&format=geojson&per_side=5&struktur=mini&autocomplete&kommunekode=183&fuzzy"
       result="{betegnelse}"
   ></kortxyz-maplibre-searchbox>
<kortxyz-maplibre>

```

## Properties

| Property     | Attribute    | Description                                                                               | Type                  | Default                                                                                                        |
| ------------ | ------------ | ----------------------------------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------- |
| `jsonata`    | `jsonata`    | JSONata expresion to turn the responding json into geojson                                | `string`              | `'fund'`                                                                                                       |
| `result`     | `result`     | How to format results. Replacement of {} with a attribute. {ATTRIBUTENAME}                | `string`              | `"{visningstekst}"`                                                                                            |
| `resulttype` | `resulttype` | Should a result pick be a marker on the map or a click on the map                         | `"click" \| "marker"` | `"marker"`                                                                                                     |
| `resultzoom` | `resultzoom` | How far should the map zoom in on result. Empty prop if no zooming is needed              | `number`              | `14`                                                                                                           |
| `url`        | `url`        | Url to make input calls that return a geojson with points. Input are available as {input} | `string`              | `"https://adressevaelger.dk/husnumre/soeg?tekst={input}&maksimum=10&token=adressevaelger123&kommunekode=0183"` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
