import { Component, OnInit } from '@angular/core';
//import { CurrencyPipe } from '@angular/common';

import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OfertaGastosService } from './oferta-gastos.service';


@Component({
  selector: 'oferta-gastos',
  templateUrl: './oferta-gastos.component.html',
  styleUrls: ['./oferta-gastos.component.scss']
})
export class OfertaGastosComponent implements OnInit {
  tipoCambio: number = 3.5;
  isPrepositionChecked: boolean = false;
  listaConcepto: ModelCombo[] = [];
  listaMoneda: ModelCombo[] = [];
  dataSource = new MatTableDataSource<GastoElement>(dataSourceList);
  //dataSource = new MatTableDataSource;
  displayedColumns: string[] = ['accion', 'concepto', 'cantidad', 'nromeses', 'factor', 'moneda', 'montounitmenusal', 'montototalmensual'];

  constructor(
    //private currencyPipe: CurrencyPipe,
    public dialog: MatDialog,
    private http: OfertaGastosService
  ) { }

  ngOnInit(): void {
    //Lenar combo Comcepto
    this.listaConcepto.push(new ModelCombo("1", "Gestión del Proyecto", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("2", "Ingeniero Residente", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("3", "Asistente de Proyecto", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("4", "Solarwind", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("5", "Smart VPN", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("6", "Capacitación", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("7", "Dirección IP", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("8", "Servicios Móviles", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("9", "Costo de Venta de Hardware", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("10", "Tráfico seguro por mega", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("11", "Costo Internacional Recurrente", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("12", "Gestión Soc", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("13", "Costo de Traslado", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("14", "Venta de BGAN Explorer 510", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("15", "Venta de Isatphone", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("16", "Penalidad", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("17", "Costo Internacional Único", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("18", "Venta de BGAN HNS9202", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("19", "Costo de Venta Seguridad", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("20", "Traslado VSAT", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("21", "Traslado CCHH+SPCR+SPAT", 0, 'F'));
    this.listaConcepto.push(new ModelCombo("22", "Otros", 0, 'O'));
    this.listaConcepto.push(new ModelCombo("23", "Otros2", 0, 'O'));
    this.listaConcepto.push(new ModelCombo("24", "Otros3", 0, 'O'));
    this.listaConcepto.push(new ModelCombo("25", "Renting Equipos", 0.45, 'R'));
    //Lenar combo Moneda
    this.listaMoneda.push(new ModelCombo("1", "S/."));
    this.listaMoneda.push(new ModelCombo("2", "$"));

    this.http.getAllOfertaOpex().subscribe(data => {
      console.log("ofertaopex:");
      console.log(data);
    });
  }
  changeConcepto(event, row) {
    if (event.isUserInput) {
      console.log(event.source.value, event.source.selected);
      var objetoConcepto = this.listaConcepto.find(function (element) { return element.id == event.source.value; });
      if (objetoConcepto.tipo == "O")// si seleccione otros se mostrara el campo nroconcepto
        row.mostrarConcepto = true;
      else
        row.mostrarConcepto = false;

        console.log(row.mostrarConcepto);

      if (objetoConcepto.factor == 0) {//Si el factor es cero no se mostrara ninguna informacion en la bandeja
        row.factor = 0;
        row.montototalmensual = this.calcularMontoMensual(row);
        row.montototalmensualParseado = row.montototalmensual.toFixed(2);
      }
      else {
        row.factor = objetoConcepto.factor;
        row.montototalmensual = this.calcularMontoMensual(row);
        row.montototalmensualParseado = row.montototalmensual.toFixed(2);
      }
    }
  }
  changeMoneda(event, row) {
    if (event.isUserInput) {
      if (event.source.value == "2") {//Cual el tipo de cambio es dolares 
        row.moneda = "2";
      }
      else// cuando selecciona la moneda de soles
        row.moneda = "1";
      row.montototalmensual = this.calcularMontoMensual(row);;//.toFixed(2);
      row.montototalmensualParseado = row.montototalmensual.toFixed(2);
    }
  }
  inputChangeCantidad(input: string, row: any): void {
    if (input === "")
      row.cantidad = 0;
    else
      row.cantidad = parseInt(input);
    row.montototalmensual = this.calcularMontoMensual(row);
    row.montototalmensualParseado = row.montototalmensual.toFixed(2);

  }
  inputChangeNumeroMeses(input: string, row: any): void {
    if (input === "")
      row.nromeses = 0;
    else
      row.nromeses = parseInt(input);
    row.montototalmensual = this.calcularMontoMensual(row);
    row.montototalmensualParseado = row.montototalmensual.toFixed(2);
  }

  inputChangeMontoUnitarioMensual(input: string, row: any): void {
    if (input === "")
      row.montounitmenusal = 0;
    else
      row.montounitmenusal = parseInt(input);
    row.montototalmensual = this.calcularMontoMensual(row);
    row.montototalmensualParseado = row.montototalmensual.toFixed(2); //this.formatMoney(row.montototalmensual)//.toFixed(2);
  }
  calcularMontoMensual(row: any): number {
    var montoCalculado: number = 0;
    if (row.factor > 0)
      montoCalculado = row.cantidad * row.nromeses * ((row.moneda == "2" ? row.montounitmenusal * this.tipoCambio : row.montounitmenusal) * (row.factor + 1));
    else
      montoCalculado = row.cantidad * row.nromeses * (row.moneda == "2" ? row.montounitmenusal * this.tipoCambio : row.montounitmenusal);
    return montoCalculado;
  }
  //summaryIncome: item.incomes.reduce((acc, income) => acc + income.value, 0).toFixed(2)
  public calcularTotalSoles() {
    return this.dataSource.data.reduce((accum, curr) => accum + curr.montototalmensual, 0).toFixed(2);
  }
  public calcularTotalDolares() {
    return this.dataSource.data.reduce((accum, curr) => accum + (curr.montototalmensual / this.tipoCambio), 0).toFixed(2);
  }
  crearNuevoGastos(id: number): GastoElement {
    return {
      id: id,
      concepto: '',
      mostrarConcepto: false,
      nroconcepto: '',
      conceptootro: '',
      cantidad: 0,
      nromeses: 0,
      factor: 0,
      moneda: '1',
      montounitmenusal: 0,
      montototalmensual: 0,      
    };
  }
  addRow(): void {
    this.dataSource.data.push(this.crearNuevoGastos(this.dataSource.data.length + 1));
    this.dataSource.filter = "";
  }
  deleteRow(item: any): void {
    const dialogRef = this.dialog.open(AlertConfirmComponent, {
      width: '450px',
      data: {
        message: '¿Esta seguro que desea eliminar esta fila?',
        buttonText: {
          ok: 'Aceptar',
          cancel: 'Cancelar'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.dataSource.data.splice(this.dataSource.data.indexOf(item.id), 1);
        this.dataSource = new MatTableDataSource<GastoElement>(dataSourceList);
      }
    });
  }
}
const dataSourceList: GastoElement[] = [
  { id: 1, concepto: '', mostrarConcepto: false, nroconcepto: '', conceptootro: '', cantidad: 0, nromeses: 0, factor: 0, moneda: '1', montounitmenusal: 0, montototalmensual: 0 },
  { id: 2, concepto: '', mostrarConcepto: false, nroconcepto: '', conceptootro: '', cantidad: 0, nromeses: 0, factor: 0, moneda: '1', montounitmenusal: 0, montototalmensual: 0 },
  { id: 3, concepto: '', mostrarConcepto: false, nroconcepto: '', conceptootro: '', cantidad: 0, nromeses: 0, factor: 0, moneda: '1', montounitmenusal: 0, montototalmensual: 0 }
];
export interface GastoElement {
  id: number,
  concepto: string;
  mostrarConcepto: boolean,
  nroconcepto: string;
  conceptootro: string;
  cantidad: number;
  nromeses: number;
  factor: number;
  moneda: string;
  montounitmenusal: number;
  montototalmensual: number;  
}
export class ModelCombo {
  constructor(public id?: string, public nombre?: string, public factor?: number, public tipo?: string) {
  }
}