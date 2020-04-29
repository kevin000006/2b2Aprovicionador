import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oferta-gastos',
  templateUrl: './oferta-gastos.component.html',
  styleUrls: ['./oferta-gastos.component.scss']
})
export class OfertaGastosComponent implements OnInit {

  constructor() { }

  dataSource:GastoElement[]=[
    {concepto:'Otros',conceptootro:'',cantidad:'1',nromeses:'6', factor:'-',moneda:'S/.',montounitmenusal:'5,000.00',montototalmensual:'5,000.00'},
    {concepto:'Otros',conceptootro:'',cantidad:'1',nromeses:'6', factor:'-',moneda:'S/.',montounitmenusal:'5,000.00',montototalmensual:'5,000.00'},
    {concepto:'Otros',conceptootro:'',cantidad:'1',nromeses:'6', factor:'-',moneda:'S/.',montounitmenusal:'5,000.00',montototalmensual:'5,000.00'}
  ];
  displayedColumns: string[] = ['accion', 'concepto', 'cantidad', 'nromeses', 'factor', 'moneda','montounitmenusal', 'montototalmensual'];


  ngOnInit(): void {
  }

}

export interface GastoElement {
  concepto: string;
  conceptootro:string;
  cantidad: string;
  nromeses: string;
  factor: string;
  moneda:string;
  montounitmenusal: string;
  montototalmensual: string;
}