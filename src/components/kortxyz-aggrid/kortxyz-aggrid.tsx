import { Component, Element, Host, Prop, h } from '@stencil/core';
import { Listen, Event, EventEmitter } from '@stencil/core';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { createGrid, GridOptions, FilterChangedEvent, GridApi, RowClickedEvent } from 'ag-grid-community';

import { themeBalham, colorSchemeDark } from 'ag-grid-community';

import {getStore} from '../../utils/store';


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
        rowNodes: [rowNode], // Flash this row
        //columns: Object.keys(rowNode.data) // Flash all columns
      });
    }
  }

  clickedEvent = (e: RowClickedEvent) => {
    const {id,geometry} = e.data;
    this.rowClicked.emit({store:this.store,id,geometry});
    const rowNode = this.api.getRowNode(String(id - 1)); // Get row node

    this.api.flashCells({
      rowNodes: [rowNode], // Flash this row
      columns: Object.keys(rowNode.data) // Flash all columns
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

  updateGrid = (geojson) => {
    const data = geojson.features.map(e => ({ id: e.id, ...e.properties, geometry: e.geometry }))
    const columnDefs = Object.keys(data[0]).filter(key => key != "id" && key != "geometry").map(key => ({ field: key }))

    this.api.setGridOption('columnDefs',columnDefs)
    this.api.setGridOption('rowData', data);
  }

  createGrid = () => {
    ModuleRegistry.registerModules([AllCommunityModule]);

    this.gridOptions = {
      theme: themeBalham.withPart(colorSchemeDark),
      defaultColDef: {
        editable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
      pagination: false,
      onFilterChanged: e => this.filterEvent(e),
      onRowClicked: e => this.clickedEvent(e)
    }

    this.gridEl.innerHTML = null;
    this.api = createGrid(this.gridEl, this.gridOptions, {});
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
        console.log("datastore",datastore)
        if(datastore == undefined ) await new Promise(r => setTimeout(r, 200));
        else {
          if(!datastore) return;
          geojson = datastore.get("data");
          console.log(geojson)
          if (!geojson.features) await new Promise(r => setTimeout(r, 200));
          else this.loading=false;
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