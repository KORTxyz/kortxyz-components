# kortxyz-app



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `source` | `source`  |             | `string` | `undefined` |


## Dependencies

### Depends on

- [kortxyz-sidebar](..\kortxyz-sidebar)
- [kortxyz-sideitem](..\kortxyz-sideitem)
- [kortxyz-layerlist](..\kortxyz-layerlist)
- [kortxyz-sourcelist](..\kortxyz-sourcelist)
- [kortxyz-mapbox](..\kortxyz-mapbox)
- [kortxyz-footer](..\kortxyz-footer)

### Graph
```mermaid
graph TD;
  kortxyz-app --> kortxyz-sidebar
  kortxyz-app --> kortxyz-sideitem
  kortxyz-app --> kortxyz-layerlist
  kortxyz-app --> kortxyz-sourcelist
  kortxyz-app --> kortxyz-mapbox
  kortxyz-app --> kortxyz-footer
  kortxyz-sidebar --> kortxyz-contextmenu
  kortxyz-layerlist --> kortxyz-dialog
  kortxyz-layerlist --> kortxyz-layeritem
  kortxyz-layeritem --> kortxyz-code
  kortxyz-sourcelist --> kortxyz-sourceitem
  style kortxyz-app fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
