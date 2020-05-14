import { Component, OnInit, Input } from '@angular/core';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OfertaGastosService } from './oferta-gastos.service';
import { CommonService } from 'app/common.service';
import { OfertaOpex } from '../../../../../model/Common';
@Component({
  selector: 'oferta-gastos',
  templateUrl: './oferta-gastos.component.html',
  styleUrls: ['./oferta-gastos.component.scss']
})
export class OfertaGastosComponent implements OnInit {
  tipoCambio: number = 3.5;
  isPrepositionChecked: boolean = false;
  listaConcepto: ModelCombo[] = [];
  //listamoneda_id: ModelCombo[] = [];
  listaMoneda = [];
  dataSourceList: any = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['concepto', 'cantidad', 'nromeses', 'factor', 'moneda', 'montounitmenusal', 'montototalmensual', 'accion'];

  @Input() ofertaBase: any = {};
  constructor(
    public dialog: MatDialog,
    private ofertaGastosService: OfertaGastosService,
    private commonService: CommonService,
  ) { }

  async ngOnInit() {
    //debugger;
    //console.log(this.ofertaBase);
    this.ofertaBase.id = 1;

    //Lenar combo moneda_id
    await this.commonService.getTipoMonedaAll().subscribe(data => {
      this.listaMoneda = data;
      console.log(this.listaMoneda);
    });

    //Lenar combo Comcepto  
    await this.ofertaGastosService.listarConceptoOpex().subscribe(data => {
      this.listaConcepto = data;
    });

    await this.ofertaGastosService.obtenerOfertasOpex(this.ofertaBase.id).subscribe((data:OfertaOpex[]) => {
      if (data != null)
        this.dataSource.data = data;
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
      }
      else {
        row.factor = objetoConcepto.factor;
        row.montototalmensual = this.calcularMontoMensual(row);
      }
    }
  }
  changeMoneda(event, row) {
    if (event.isUserInput) {
      if (event.source.value == "2") {//Cual el tipo de cambio es dolares 
        row.moneda_id = "2";
      }
      else// cuando selecciona la moneda_id de soles
        row.moneda_id = "1";
      row.montototalmensual = this.calcularMontoMensual(row);;//.toFixed(2);      
    }
  }
  inputChangeCantidad(input: string, row: any): void {
    if (input === "")
      row.cantidad = 0;
    else
      row.cantidad = parseInt(input);
    row.montototalmensual = this.calcularMontoMensual(row);
  }
  inputChangeNumeroMeses(input: string, row: any): void {
    if (input === "")
      row.meses = 0;
    else
      row.meses = parseInt(input);
    row.montototalmensual = this.calcularMontoMensual(row);
  }

  inputChangeMontoUnitarioMensual(input: string, row: any): void {
    if (input === "")
      row.unitarioMensual = 0;
    else
      row.unitarioMensual = parseInt(input);
    row.montototalmensual = this.calcularMontoMensual(row);
  }
  calcularMontoMensual(row: any): number {
    var montoCalculado: number = 0;
    if (row.factor > 0)
      montoCalculado = row.cantidad * row.meses * ((row.moneda_id == "2" ? row.unitarioMensual * this.tipoCambio : row.unitarioMensual) * (row.factor + 1));
    else
      montoCalculado = row.cantidad * row.meses * (row.moneda_id == "2" ? row.unitarioMensual * this.tipoCambio : row.unitarioMensual);
    return montoCalculado;
  }
  //summaryIncome: item.incomes.reduce((acc, income) => acc + income.value, 0).toFixed(2)
  public calcularTotalSoles() {
    return this.dataSource.data.reduce((accum, curr) => accum + curr.totalMensual, 0).toFixed(2);
  }
  public calcularTotalDolares() {
    return this.dataSource.data.reduce((accum, curr) => accum + (curr.totalMensual / this.tipoCambio), 0).toFixed(2);
  }
  crearNuevoGastos(ofertaOpexId: number, ofertaId: number): GastoElement {
    return {
      ofertaOpexId: ofertaOpexId,
      ofertaId: ofertaId,
      conceptoId: -1,
      mostrarConcepto: false,
      nombre: '',
      cantidad: 0,
      meses: 0,
      factor: 0,
      moneda_id_id: 1,
      unitarioMensual: 0,
      totalMensual: 0,
    };
  }
  addRow(): void {

    this.dataSource.data.push(this.crearNuevoGastos(this.dataSource.data.length + 1, this.ofertaBase.id));
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
        this.dataSource = new MatTableDataSource<GastoElement>(this.dataSourceList);
      }
    });
  }
}
// const dataSourceList: GastoElement[] = [
//   { ofertaOpexId: 1, concepto: '', mostrarConcepto: false, nroconcepto: '', conceptootro: '', cantidad: 0, meses: 0, factor: 0, moneda_id: '1', unitarioMensual: 0, montototalmensual: 0 },
//   { ofertaOpexId: 2, concepto: '', mostrarConcepto: false, nroconcepto: '', conceptootro: '', cantidad: 0, meses: 0, factor: 0, moneda_id: '1', unitarioMensual: 0, montototalmensual: 0 },
//   { ofertaOpexId: 3, concepto: '', mostrarConcepto: false, nroconcepto: '', conceptootro: '', cantidad: 0, meses: 0, factor: 0, moneda_id: '1', unitarioMensual: 0, montototalmensual: 0 }
// ];
export interface GastoElement {
  ofertaOpexId: number,
  ofertaId: number,
  conceptoId: number;
  mostrarConcepto: boolean,
  nombre: string;
  cantidad: number;
  meses: number;
  factor: number;
  moneda_id_id: number;
  unitarioMensual: number;
  totalMensual: number;
}
export class ModelCombo {
  constructor(public id?: string, public nombre?: string, public factor?: number, public tipo?: string) {
  }
}