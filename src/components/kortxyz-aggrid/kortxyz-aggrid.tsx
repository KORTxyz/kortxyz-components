import { Component, Element, Host, Prop, h } from '@stencil/core';
import { Listen, Event, EventEmitter } from '@stencil/core';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { createGrid, GridOptions, FilterChangedEvent, GridApi, RowClickedEvent } from 'ag-grid-community';

import { themeBalham, colorSchemeDark, ColDef, ColGroupDef, ITooltipParams } from 'ag-grid-community';

import { getStore } from '../../utils/store';
import {isvalidURL, isValidDateString} from '../../utils/checkUtils';

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

  private loading: boolean = true;

  /** Fetch data from a url */
  @Prop() data: string;

  /** Fetch JSON schema from a url or parse Inline JSON*/
  @Prop({ mutable: true }) schema?: any;

  /** Fetch data from a store */
  @Prop() store: string;

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

  clickedEvent = (e: RowClickedEvent) => {
    const { id, geometry } = e.data;
    this.rowClicked.emit({ store: this.store, id, geometry });

    this.api.flashCells({
      rowNodes: [e.node]
    });

  }

  filterEvent = (e: FilterChangedEvent) => {
    let filteredRows = []
    e.api.forEachNodeAfterFilter(node => filteredRows.push(node.data))
    const geojson = {
      "type": "FeatureCollection",
      "features": filteredRows.map(r => {
        const { id, geometry, ...properties } = r;
        return { id, properties, geometry }
      })
    }
    getStore(this.store).set("data", geojson)
  }

  getColumnDef = (columnKey,exampleData) => {
    const columnSchema = this.schema?.properties[columnKey];

    let columnDef:ColDef = {
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

    if(isValidDateString(exampleData)){
      columnDef = {...columnDef,
        cellDataType : 'date',
        filter: 'agDateColumnFilter',
        valueGetter :  (params) => new Date(params.data[columnKey]),
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

  updateGrid = (geojson) => {
    const data = geojson.features.map(e => ({ id: e.id, ...e.properties, geometry: e.geometry }))
    const columns = Object.keys(data[0]).filter(key => key != "id" && key != "geometry");
    
    const columnDefs: (ColDef | ColGroupDef)[] = columns.map(key => this.getColumnDef(key,data[0][key]))

    this.api.setGridOption('columnDefs', columnDefs)
    this.api.setGridOption('rowData', data);
  }

  createGrid = () => {
    ModuleRegistry.registerModules([AllCommunityModule]);

    this.gridOptions = {
      theme: themeBalham.withPart(colorSchemeDark),
      defaultColDef: {
        filter: true,
        editable: true,
        flex: 1,
        minWidth: 100,
      },
      tooltipShowDelay: 100,
      pagination: false,
      onFilterChanged: e => this.filterEvent(e),
      onRowClicked: e => this.clickedEvent(e)
    }

    this.gridEl.innerHTML = null;
    this.api = createGrid(this.gridEl, this.gridOptions, {});
  }

  async componentWillLoad() {
    if(this.schema){
      if(!isvalidURL(this.schema)) this.schema = JSON.parse(this.schema)
      else{
        const res = await fetch(this.schema)
        this.schema = await res.json();
      }
    }

  }

  async componentDidLoad() {

    this.createGrid();

    let geojson

    if (this.data) {
      const response = await fetch(this.data);
      const json = await response.json();
      geojson = json;

    }
    else if (this.store) {
      while (this.loading) {
        const datastore = getStore(this.store);
        if (datastore == undefined) await new Promise(r => setTimeout(r, 200));
        else {
          if (!datastore) return;
          geojson = datastore.get("data");
          if (!geojson.features) await new Promise(r => setTimeout(r, 200));
          else this.loading = false;
        }
      }
    }

    this.updateGrid(geojson)

  }

  render() {
    return (
      <Host>
      </Host>
    );
  }

}