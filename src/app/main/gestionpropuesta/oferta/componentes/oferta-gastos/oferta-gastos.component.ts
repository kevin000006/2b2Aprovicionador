import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oferta-gastos',
  templateUrl: './oferta-gastos.component.html',
  styleUrls: ['./oferta-gastos.component.scss']
})
export class OfertaGastosComponent implements OnInit {
  listaConcepto: ModelCombo[] = [];
  listaMoneda: ModelCombo[] = [];
  constructor() { }

  dataSource: GastoElement[] = [
    { concepto: '', nroconcepto: 1, conceptootro: '', cantidad: '1', nromeses: '6', factor: '-', moneda: '1', montounitmenusal: '5000', montototalmensual: '5,000.00' },
    { concepto: '', nroconcepto: 1, conceptootro: '', cantidad: '1', nromeses: '6', factor: '-', moneda: '2', montounitmenusal: '5', montototalmensual: '5,000.00' },
    { concepto: '', nroconcepto: 1, conceptootro: '', cantidad: '1', nromeses: '6', factor: '-', moneda: '', montounitmenusal: '5', montototalmensual: '5,000.00' }
  ];
  displayedColumns: string[] = ['accion', 'concepto', 'cantidad', 'nromeses', 'factor', 'moneda', 'montounitmenusal', 'montototalmensual'];
  ngOnInit(): void {
    debugger;
    //Lenar combo Comcepto
    this.listaConcepto.push(new ModelCombo("1", "Otros"));
    this.listaConcepto.push(new ModelCombo("2", "Valor 2"));
    this.listaConcepto.push(new ModelCombo("3", "Valor 3"));
    this.listaConcepto.push(new ModelCombo("4", "Valor 4"));
    //Lenar combo Moneda
    this.listaMoneda.push(new ModelCombo("1", "S/."));
    this.listaMoneda.push(new ModelCombo("2", "$"));    
  }
}

export interface GastoElement {
  concepto: string;
  nroconcepto: number;
  conceptootro: string;
  cantidad: string;
  nromeses: string;
  factor: string;
  moneda: string;
  montounitmenusal: string;
  montototalmensual: string;
}
export class ModelCombo {
  constructor(public id?: string, public nombre?: string) {
  }
}