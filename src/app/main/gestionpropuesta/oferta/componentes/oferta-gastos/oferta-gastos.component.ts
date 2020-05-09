import { Component, OnInit } from '@angular/core';
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
  listaConcepto: ModelCombo[] = [];
  listaMoneda: ModelCombo[] = [];
  dataSource = new MatTableDataSource<GastoElement>(dataSourceList);
  //dataSource = new MatTableDataSource;
  displayedColumns: string[] = ['accion', 'concepto', 'cantidad', 'nromeses', 'factor', 'moneda', 'montounitmenusal', 'montototalmensual']; 

  constructor(
    public dialog: MatDialog,
    private http: OfertaGastosService
  ) { }

  ngOnInit(): void {
    
    //Lenar combo Comcepto
    this.listaConcepto.push(new ModelCombo("1", "Otros"));
    this.listaConcepto.push(new ModelCombo("2", "Valor 2"));
    this.listaConcepto.push(new ModelCombo("3", "Valor 3"));
    this.listaConcepto.push(new ModelCombo("4", "Valor 4"));
    //Lenar combo Moneda
    this.listaMoneda.push(new ModelCombo("1", "S/."));
    this.listaMoneda.push(new ModelCombo("2", "$"));    

    this.http.getAllOfertaOpex().subscribe(data =>{
      //this.dataSource.data =data;    
      console.log("ofertaopex:");
      console.log(data);
    });
  }

  public calcularMontoTotalMensual() {    
    return this.dataSource.data.reduce((accum, curr) => accum + curr.montototalmensual, 0);
  }
  public calcularMontoUnitarioMensual() {    
    return this.dataSource.data.reduce((accum, curr) => accum + curr.montounitmenusal, 0);
  }
  crearNuevoGastos(id: number): GastoElement {
    return {
      id: id,
      concepto: '',
      nroconcepto: 0,
      conceptootro: '',
      cantidad: '',
      nromeses: '',
      factor: '',
      moneda: '',
      montounitmenusal: 0,
      montototalmensual: 0
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
  { id:1,concepto: '', nroconcepto: 1, conceptootro: '', cantidad: '1', nromeses: '6', factor: '-', moneda: '1', montounitmenusal: 5000, montototalmensual: 1 },
  { id:2,concepto: '', nroconcepto: 1, conceptootro: '', cantidad: '1', nromeses: '6', factor: '-', moneda: '2', montounitmenusal: 5, montototalmensual: 0 },
  { id:3,concepto: '', nroconcepto: 1, conceptootro: '', cantidad: '1', nromeses: '6', factor: '-', moneda: '', montounitmenusal: 5, montototalmensual: 500 }

];
export interface GastoElement {
  id: number,
  concepto: string;
  nroconcepto: number;
  conceptootro: string;
  cantidad: string;
  nromeses: string;
  factor: string;
  moneda: string;
  montounitmenusal: number;
  montototalmensual: number;
}
export class ModelCombo {
  constructor(public id?: string, public nombre?: string) {
  }
}