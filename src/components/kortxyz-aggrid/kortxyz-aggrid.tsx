import { Component, Element, Host, Prop, h } from '@stencil/core';
import { Listen, Event, EventEmitter } from '@stencil/core';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { createGrid, GridOptions, CellEditingStoppedEvent, FilterChangedEvent, GridApi, RowClickedEvent } from 'ag-grid-community';

import { themeBalham, colorSchemeDark, ColDef, ColGroupDef, ITooltipParams } from 'ag-grid-community';

import { GeoJSON } from 'geojson';

import { getStore } from '../../utils/store';
import { isvalidURL, isValidDateString } from '../../utils/checkUtils';

/**
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
 */

@Component({
  tag: 'kortxyz-aggrid',
})


export class KortxyzAggrid {
  @Element() gridEl: HTMLElement;

  api: GridApi;
  gridOptions: GridOptions;

  /** Fetch data from a url */
  @Prop() data: string;

  /** Fetch JSON schema from a url or parse Inline JSON */
  @Prop({ mutable: true }) schema?: any;

  /** Fetch data from a store */
  @Prop() store: string;

  /** Control if the tabel can be edited. */
  @Prop() editable: boolean;

  /** Event when row is clicked */
  @Event() rowClicked: EventEmitter;


  @Listen('featureClicked', { target: 'body' })
  featureClickedHandler(event) {
    const rowNode = this.api.getRowNode(String(event.detail - 1)); // Get row node
    if (rowNode) {
      this.api.ensureIndexVisible(rowNode.rowIndex)
      this.api.flashCells({
        rowNodes: [rowNode]
      });
    }
  }

  convertToGeojson = (rowdata) => ({
    "type": "FeatureCollection",
    "features": rowdata.map(({ id, geometry, ...properties }) => ({ id, properties, geometry }))
  })

  onCellEditingStopped = (e: CellEditingStoppedEvent) => {
    if(e.newValue !== e.oldValue){
    const allData = [];
    e.api.forEachNode(node => allData.push(node.data));
    const geojson = this.convertToGeojson(allData)

    const datastore = getStore(this.store);
    datastore.set("lastOrigin", "table");
    datastore.set("data", geojson);
    }
  }

  onRowClicked = (e: RowClickedEvent) => {
    const { id, geometry } = e.data;
    this.rowClicked.emit({ store: this.store, id, geometry });

    this.api.flashCells({
      rowNodes: [e.node]
    });

  }

  onFilterChanged = (e: FilterChangedEvent) => {
    let filteredRows = []
    e.api.forEachNodeAfterFilter(node => filteredRows.push(node.data));

    if (filteredRows.length == 0) this.api.showNoRowsOverlay();
    else this.api.hideOverlay();

    const geojson = this.convertToGeojson(filteredRows)

    getStore(this.store).set("data", geojson)
  }

  getColumnDef = (columnKey, columnSchema, exampleData) => {

    let columnDef: ColDef = {
      field: columnKey,
      headerName: columnSchema?.title || columnKey,
      headerTooltip: columnSchema?.description || null,
      tooltipValueGetter: (p: ITooltipParams) => {
        const value = columnSchema?.oneOf?.find(e => e.const === p.data[columnKey]);
        if (!value) return;
        return value.description;
      },
      cellEditor: this.editorTypes(columnSchema) || null,
      cellEditorParams: {
        values: columnSchema?.oneOf?.map(e => e.const) || columnSchema?.enum
      },
    };

    if (isValidDateString(exampleData)) {
      columnDef = {
        ...columnDef,
        cellDataType: 'date',
        filter: 'agDateColumnFilter',
        valueGetter: (params) => new Date(params.data[columnKey]),
        cellEditor: 'agDateCellEditor',
      }
    }

    return columnDef
  }

  editorTypes = (property?: any) => {
    if (!property) return undefined;
    const { type, enum: enumVals, oneOf } = property;
    if (enumVals || oneOf) return 'agSelectCellEditor';
    if (type === 'integer') return 'agNumberCellEditor';
    if (type === 'string') return 'agTextCellEditor';
    if (type === 'boolean') return 'agCheckboxCellEditor';
  };

  updateRows = (geojson) => {
    const data = geojson.features.map(e => ({ id: e.id, ...e.properties, geometry: e.geometry }))
    this.api.setGridOption('rowData', data);
  }

  initGrid = () => {
    ModuleRegistry.registerModules([AllCommunityModule]);

    this.gridOptions = {
      theme: themeBalham.withPart(colorSchemeDark),
      defaultColDef: {
        filter: true,
        editable: !!this.editable ? true : false,
        flex: 1,
        minWidth: 100,
      },
      tooltipShowDelay: 100,
      pagination: false,
      onCellEditingStopped: e => this.onCellEditingStopped(e),
      onFilterChanged: e => this.onFilterChanged(e),
      onRowClicked: e => this.onRowClicked(e)
    };

    this.gridEl.innerHTML = null;
    this.api = createGrid(this.gridEl, this.gridOptions, {});
  }

  columnDefsFromSchema = async () => {
    let schemaDef;
    if (isvalidURL(this.schema)) {
      const res = await fetch(this.schema)
      const json = await res.json();
      schemaDef = json.properties.properties;
    }
    else schemaDef = JSON.parse(this.schema)

    const columns = Object.keys(schemaDef.properties).filter(prop => !["id", "geometry"].includes(prop))
    const columnDefs: (ColDef | ColGroupDef)[] = columns.map(key => this.getColumnDef(key, schemaDef.properties[key], null))

    this.api.setGridOption('columnDefs', columnDefs)
  }

  columnDefsFromGeojson = async (geojson) => {
    const columns = Object.keys(geojson.features[0].properties);
    let columnDefs: (ColDef | ColGroupDef)[] = columns.map(key => this.getColumnDef(key, null, geojson.features[0].properties[key]))
    columnDefs = [
      ...columnDefs
    ]

    this.api.setGridOption('columnDefs', columnDefs)
  }

  getGeojson = async () => {
    let geojson;

    if (this.data) {
      const response = await fetch(this.data);
      const json = await response.json();
      geojson = json;
    }

    else if (this.store) {
      let datastore;
      while ((datastore = getStore(this.store)) == undefined || !datastore.get("data").features)  await new Promise(r => setTimeout(r, 200));
      datastore.onChange("data", (e: GeoJSON) => { if(datastore.get("lastOrigin") !== "table") this.updateRows(e)})
      geojson = datastore.get("data");
    }

    return geojson;
  }


  async componentDidLoad() {
    this.initGrid();
    if (this.schema) this.columnDefsFromSchema();

    let geojson = await this.getGeojson();

    if (!this.schema) this.columnDefsFromGeojson(geojson);

    this.updateRows(geojson);
  }

  render() {
    return (
      <Host>
      </Host>
    );
  }

}