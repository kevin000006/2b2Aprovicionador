import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'oferta-equipamiento',
  templateUrl: './oferta-equipamiento.component.html',
  styleUrls: ['./oferta-equipamiento.component.scss']
})
export class OfertaEquipamientoComponent implements OnInit {
  listaTipos: ModelCombo[] = [];
  listaCondicion: ModelCombo[] = [];
  listaMoneda: ModelCombo[] = [];
  dataSource = new MatTableDataSource<EquipacmientoElement>(dataSourceList);
  constructor(
    public dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['accion', 'tipo', 'condicion', 'antigueadad', 'marca', 'modelo', 'cantidad', 'moneda', 'costo', 'costototal'];

  ngOnInit(): void {
    //Lenar combo Tipo
    this.listaTipos.push(new ModelCombo("1", "Equipo de Seguridad 1"));
    this.listaTipos.push(new ModelCombo("2", "Equipo de Seguridad 2"));
    this.listaTipos.push(new ModelCombo("3", "Equipo de Seguridad 3"));
    this.listaTipos.push(new ModelCombo("4", "Equipo de Seguridad 4"));
    //Lenar combo Condicion
    this.listaCondicion.push(new ModelCombo("1", "No Stock"));
    this.listaCondicion.push(new ModelCombo("2", "Si Stock"));
    //Lenar combo Moneda
    this.listaMoneda.push(new ModelCombo("1", "S/."));
    this.listaMoneda.push(new ModelCombo("2", "$"));
  }
  crearNuevoGastos(id: number): EquipacmientoElement {
    return {
      id: id,
      tipo: '',
      condicion: '',
      antigueadad: '',
      marca: '',
      modelo: '',
      cantidad: '',
      moneda: '',
      costo: 0,
      costototal: 0
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
        this.dataSource = new MatTableDataSource<EquipacmientoElement>(dataSourceList);
      }
    });
  }
  public calcularcosto() {
    return this.dataSource.data.reduce((accum, curr) => accum + curr.costo, 0);
  }
  public calcularcostoTotal() {
    return this.dataSource.data.reduce((accum, curr) => accum + curr.costototal, 0);
  }

}
const dataSourceList: EquipacmientoElement[] = [
  { id: 1, tipo: '', condicion: '', antigueadad: '-', marca: 'Balanceador', modelo: '1', cantidad: '1', moneda: '', costo: 13, costototal: 189.6 },
  { id: 2, tipo: '', condicion: '', antigueadad: '-', marca: 'Balanceador', modelo: '1', cantidad: '1', moneda: '', costo: 9.86, costototal: 0 },
  { id: 3, tipo: '', condicion: '', antigueadad: '-', marca: 'Balanceador', modelo: '1', cantidad: '1', moneda: '2', costo: 13, costototal: 0 }
];
export interface EquipacmientoElement {
  id: number;
  tipo: string;
  condicion: string;
  antigueadad: string;
  marca: string;
  modelo: string;
  cantidad: string;
  moneda: string;
  costo: number;
  costototal: number;
}
export class ModelCombo {
  constructor(public id?: string, public nombre?: string) {
  }
}