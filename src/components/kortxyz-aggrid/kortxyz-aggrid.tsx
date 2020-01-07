import { Component, Element, Method, Prop, Event, EventEmitter } from '@stencil/core';
import AgGrid from '../../../node_modules/ag-grid-community/dist/ag-grid-community.min.js';

@Component({
  tag: 'kortxyz-aggrid',
  styleUrl: 'kortxyz-aggrid.css'
})

export class kortxyzAggrid {

  @Element() gridEl: HTMLElement;
  @Prop() api: any;
  @Prop() gridOptions: any;
  @Event() rowClicked: EventEmitter;

  componentDidLoad(){
    this.gridEl.classList.add("ag-theme-balham-dark")

    var features = [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Porsche', model: 'Boxter', price: 72000}
    ];

    var columnDefs = Object.entries(features[0])
        .map(e => {
          return {
            headerName: e[0], 
            field: e[0], 
            filter: (typeof(e[1])) === "number"?'agNumberColumnFilter':'agTextColumnFilter'
          }
        })


      // let the grid know which columns and what data to use
      var gridOptions:any = {
        defaultColDef: {
            sortable: true,
            resizable: true,
        },
        pagination: true,
        onRowClicked: e => this.rowClicked.emit(e.data.id),
        columnDefs: columnDefs,
        animateRows: true,
        sortingOrder: ['desc','asc',null]
      };

    new AgGrid.Grid(this.gridEl, gridOptions);
    gridOptions.api.setRowData(features);
    this.gridOptions = gridOptions;
    this.api = gridOptions.api;
  }


  @Method()
  async addData(data){
    var columnDefs = Object.entries(data[0])
        .map(e => {
          return {
            headerName: e[0], 
            field: e[0], 
            filter: (typeof(e[1])) === "number"?'agNumberColumnFilter':'agTextColumnFilter'
          }
        })

    this.api.setColumnDefs(columnDefs)
    this.api.setRowData(data);
    this.gridOptions.columnApi.autoSizeAllColumns()
  }

  
}