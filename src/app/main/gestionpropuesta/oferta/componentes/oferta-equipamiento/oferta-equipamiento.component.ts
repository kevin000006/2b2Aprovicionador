import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { AlertSuccessComponent } from '../alertSuccess/alertSuccess.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'oferta-equipamiento',
  templateUrl: './oferta-equipamiento.component.html',
  styleUrls: ['./oferta-equipamiento.component.scss']
})
export class OfertaEquipamientoComponent implements OnInit {
  tipoCambio: number = 3.5;
  baseDepresiacion: number = 60;
  listaTipos: ModelCombo[] = [];
  listaCondicion: ModelCombo[] = [];
  listaMoneda: ModelCombo[] = [];
  listaMarca: ModelCombo[] = [];
  dataSource = new MatTableDataSource<EquipacmientoElement>(dataSourceList);
  constructor(
    public dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['accion', 'tipo', 'condicion', 'antigueadad', 'marca', 'modelo', 'cantidad', 'moneda', 'costo', 'costototal'];

  ngOnInit(): void {
    //Lenar combo Tipo
    this.listaTipos.push(new ModelCombo("1", "Desmarcador"));
    this.listaTipos.push(new ModelCombo("2", "Desmarcador 1"));
    //Lenar combo Condicion
    this.listaCondicion.push(new ModelCombo("1", "Stock"));
    this.listaCondicion.push(new ModelCombo("2", "No Stock"));
    this.listaCondicion.push(new ModelCombo("3", "Residual"));
    this.listaCondicion.push(new ModelCombo("4", "Renting: CSI"));
    //Lenar combo Moneda
    this.listaMoneda.push(new ModelCombo("1", "S/."));
    this.listaMoneda.push(new ModelCombo("2", "$"));

    //Lenar combo Moneda
    this.listaMarca.push(new ModelCombo("1", "TELDAT"));
    this.listaMarca.push(new ModelCombo("2", "ROUTER"));
    this.listaMarca.push(new ModelCombo("2", "MODEN"));


  }
  crearNuevoGastos(id: number): EquipacmientoElement {
    return {
      id: id,
      tipo: '',
      condicion: '',
      antigueadad: 0,
      marca: '',
      modelo: '',
      cantidad: 0,
      moneda: '',
      costo: 0,
      costototal: 0
    };
  }
  addRow(): void {
    this.dataSource.data.push(this.crearNuevoGastos(this.dataSource.data.length + 1));
    this.dataSource.filter = "";
  }
  Guardar(): void {
    const dialogRef = this.dialog.open(AlertSuccessComponent, {
      width: '700px',
      data: {
        message: 'Se registro correctamente los datos del proyecto.',
        buttonText: { ok: 'Aceptar' }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
      }
    });
  }
  deleteRow(item: any): void {
    const dialogRef = this.dialog.open(AlertConfirmComponent, {
      width: '650px',
      data: {
        message: '¿Esta seguro que desea eliminar esta fila?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.dataSource.data.splice(this.dataSource.data.indexOf(item.id), 1);
        this.dataSource = new MatTableDataSource<EquipacmientoElement>(dataSourceList);
      }
    });
  }


  changeMoneda(event, row) {
    if (event.isUserInput) {
      if (event.source.value == "2") {//Cual el tipo de cambio es dolares 
        row.moneda = "2";
      }
      else// cuando selecciona la moneda de soles
        row.moneda = "1";
      row.costototal = this.calcularMontoMensual(row);
    }
  }
  inputChangeCantidad(input: string, row: any): void {
    if (input === "")
      row.cantidad = 0;
    else
      row.cantidad = parseInt(input);
    row.costototal = this.calcularMontoMensual(row);
  }
  inputChangeCosto(input: string, row: any): void {
    if (input === "")
      row.costo = 0;
    else
      row.costo = parseInt(input);
    row.costototal = this.calcularMontoMensual(row);
  }
  inputChangeAntiguedad(input: string, row: any): void {
    if (input === "")
      row.antigueadad = 0;
    else
      row.antigueadad = parseInt(input);
    row.costototal = this.calcularMontoMensual(row);

  }
  calcularMontoMensual(row: any): number {
    var montoCalculado: number = 0;
    if (row.antigueadad > 0) {
      if (row.moneda == "2")
        montoCalculado = (row.cantidad * row.costo - (row.cantidad * row.costo * row.antigueadad / this.baseDepresiacion)) * this.tipoCambio;
      else
        montoCalculado = row.cantidad * row.costo - (row.cantidad * row.costo * row.antigueadad / this.baseDepresiacion);
    }
    else
      montoCalculado = row.cantidad * (row.moneda == "2" ? row.costo * this.tipoCambio : row.costo);
    return montoCalculado;
  }

  public calcularTotalSoles() {
    return this.dataSource.data.reduce((accum, curr) => accum + curr.costototal, 0);
  }
  public calcularTotalDolares() {
    return this.dataSource.data.reduce((accum, curr) => accum + (curr.costototal / this.tipoCambio), 0).toFixed(2);
  }

}
const dataSourceList: EquipacmientoElement[] = [
  { id: 1, tipo: '', condicion: '', antigueadad: 0, marca: '', modelo: '', cantidad: 0, moneda: '1', costo: 0, costototal: 0 },
  { id: 2, tipo: '', condicion: '', antigueadad: 0, marca: '', modelo: '', cantidad: 0, moneda: '1', costo: 0, costototal: 0 },
  { id: 3, tipo: '', condicion: '', antigueadad: 0, marca: '', modelo: '', cantidad: 0, moneda: '1', costo: 0, costototal: 0 }
];
export interface EquipacmientoElement {
  id: number;
  tipo: string;
  condicion: string;
  antigueadad: number;
  marca: string;
  modelo: string;
  cantidad: number;
  moneda: string;
  costo: number;
  costototal: number;
}
export class ModelCombo {
  constructor(public id?: string, public nombre?: string) {
  }
}