import { Component, Element, h } from '@stencil/core';
import AgGrid from '../../../node_modules/ag-grid-community/dist/ag-grid-community.min.js';

@Component({
  tag: 'kortxyz-aggrid',
  styleUrl: 'kortxyz-aggrid.css'
})

export class kortxyzAggrid {

  @Element() gridEl: HTMLElement;

  componentDidLoad(){
    this.gridEl.classList.add("ag-theme-balham")

    var features = [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
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
        columnDefs: columnDefs,
        animateRows: true,
        sortingOrder: ['desc','asc',null]
      };

    new AgGrid.Grid(this.gridEl, gridOptions); 
    gridOptions.api.setRowData(features);

  }


  render() {
    return <div></div>
    ;
  }
}