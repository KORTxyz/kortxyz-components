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

| Property     | Attribute    | Description                                                                               | Type                  | Default                                                                                                                                                 |
| ------------ | ------------ | ----------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jsonata`    | `jsonata`    |                                                                                           | `string`              | `'$.{"type": "Feature","geometry": geometri,"properties": { "visningstekst": visningstekst}}'`                                                          |
| `result`     | `result`     | How to format results. Replacement of {} with a attribute. {ATTRIBUTENAME}                | `string`              | `"{visningstekst}"`                                                                                                                                     |
| `resulttype` | `resulttype` | Should a result pick be a marker on the map or a click on the map                         | `"click" \| "marker"` | `"marker"`                                                                                                                                              |
| `resultzoom` | `resultzoom` | How far should the map zoom in on result. Empty prop if no zooming is needed              | `number`              | `14`                                                                                                                                                    |
| `url`        | `url`        | Url to make input calls that return a geojson with points. Input are available as {input} | `string`              | `"https://api.dataforsyningen.dk/rest/gsearch/v2.0/husnummer?q={input}&token=bfe350080dc1da9dbb948d6fd59a8e96&srid=4326&filter=kommunekode=%270183%27"` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
