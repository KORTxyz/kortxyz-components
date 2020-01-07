# kortxyz-layerlist



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute       | Description | Type  | Default     |
| ------------ | --------------- | ----------- | ----- | ----------- |
| `sourcesURL` | `sources-u-r-l` |             | `any` | `undefined` |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `layerRemoved` |             | `CustomEvent<any>` |


## Methods

### `handleFile(e: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [kortxyz-app](..\kortxyz-app)

### Depends on

- [kortxyz-dialog](..\kortxyz-dialog)
- [kortxyz-layeritem](..\kortxyz-layeritem)

### Graph
```mermaid
graph TD;
  kortxyz-layerlist --> kortxyz-dialog
  kortxyz-layerlist --> kortxyz-layeritem
  kortxyz-layeritem --> kortxyz-code
  kortxyz-app --> kortxyz-layerlist
  style kortxyz-layerlist fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
