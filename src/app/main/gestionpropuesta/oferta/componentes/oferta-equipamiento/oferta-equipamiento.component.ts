import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { AlertSuccessComponent } from '../alertSuccess/alertSuccess.component';
import { MatDialog } from '@angular/material/dialog';
import { EquipamientoService } from '../oferta-equipamiento/oferta-equipamiento.servicio';
import { CommonService } from 'app/common.service';
import { TipoEquipamientoModel, MonedaModel } from 'app/model/Common';
import { OfertaEquipamientoModel, EquipamientoRequest } from 'app/main/gestionpropuesta/models/oferta';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'oferta-equipamiento',
  templateUrl: './oferta-equipamiento.component.html',
  styleUrls: ['./oferta-equipamiento.component.scss']
})
export class OfertaEquipamientoComponent implements OnInit {

  @Input() ofertaBase: any = {};

  tipoCambio: number = 3.5;
  baseDepresiacion: number = 60;
  listaTipos: TipoEquipamientoModel[] = [];
  listaCondicion: ModelCombo[] = [];
  listaMoneda: MonedaModel[] = [];
  listaMarca: ModelCombo[] = [];
  baseDataSource = [];
  dataSource = new MatTableDataSource<OfertaEquipamientoModel>([]);

  constructor(
    public dialog: MatDialog,
    public equipamientoService: EquipamientoService,
    private commonService: CommonService,
    private toastr: ToastrService
  ) { }

  displayedColumns: string[] = ['tipo', 'condicion', 'antigueadad', 'marca', 'modelo', 'cantidad', 'moneda', 'costo', 'costototal', 'instalacion', 'accion'];

  pattern = {
    P: {
      pattern: new RegExp('\\d'),
    },
  };
  customMask = ['0*.00', this.pattern];

  ngOnInit(): void {
    this.commonService.getTipoEquipamiento().subscribe(data => {      
      this.listaTipos = data      
    });
    this.commonService.getTipoMonedaAll().subscribe(data => { this.listaMoneda = data });
    this.equipamientoService.findAllEquipamientoMarca().subscribe(data => { this.listaMarca = data; });
    this.equipamientoService.findAllEquipamientoCondicion().subscribe(data => { this.listaCondicion = data; });
    this.getEquipamientos();
  }

  getEquipamientos(): void {
    this.equipamientoService.getEquipamientoForOfeta(this.ofertaBase.id).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  addRow(): void {
    let row = new OfertaEquipamientoModel();
    row.moneda.id = 2;
    this.dataSource.data.push(row);
    this.dataSource.filter = "";
  }
  Guardar(): void {
    let equipos = [];
    for (let eq of this.dataSource.data) {
      let item = new EquipamientoRequest();
      item.id = eq.id;
      item.antiguedad = eq.antiguedad;
      item.cantidad = eq.cantidad;
      item.condicion = eq.equipamientoCondicion.id;
      item.activo = eq.activo;
      item.idoferta = this.ofertaBase.id;
      item.marca = eq.equipamientomarca.id;
      item.modelo = eq.modelo;
      item.moneda = eq.moneda.id;
      item.tipo = eq.tipoequipamiento.id;
      item.unitario = eq.unitario;
      item.total = eq.total;
      if (item.id > 0 && item.activo == false)
        item.estado = 2;
      else if (item.id == 0 && item.activo == true)
        item.estado = 0;
      else
        item.estado = 1;
      item.proveedor = eq.proveedor == null ? "": eq.proveedor;  // se agrego esta propiedad  faltar enviar el valor del back-->coordianr con omar
      item.instalacion = eq.instalacion;
      equipos.push(item);
    }
    console.log(JSON.stringify(equipos));
    this.equipamientoService.saveAllEquipamiento(equipos).subscribe(data => {
      this.getEquipamientos();
      this.toastr.success('Se proceso correctamente la información!', '', {
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true
      });
    });

  }
  deleteRow(item: OfertaEquipamientoModel): void {
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

        if (item.id > 0) { item.activo = false; }
        else {
          this.dataSource.data.splice(this.dataSource.data.indexOf(item), 1);
          this.dataSource.filter = "";
        }

      }
    });
  }

  calcularMontoTotalSoles(eq: OfertaEquipamientoModel) {
    let total = eq.unitario * eq.cantidad;
    if (eq.moneda.id == 1)
      total = total / this.tipoCambio;

    if (eq.equipamientoCondicion.id == 4){
      if (eq.antiguedad > 0 && eq.antiguedad != null) { total = total * (1 * eq.antiguedad / this.baseDepresiacion); }
      else{  eq.antiguedad = 0;}
    }

    if(eq.tipoequipamiento.id == 11 || eq.tipoequipamiento.id == 13)
    {
      eq.instalacion = (eq.cantidad * 100);
    }

    eq.total = Number(total.toFixed(2));
  }

  calcularMontoMensual(row: OfertaEquipamientoModel): number {
    var montoCalculado: number = 0;
    if (row.antiguedad > 0) {
      if (row.moneda.id == 2)
        montoCalculado = (row.cantidad * row.unitario - (row.cantidad * row.unitario * row.antiguedad / this.baseDepresiacion)) * this.tipoCambio;
      else
        montoCalculado = row.cantidad * row.unitario - (row.cantidad * row.unitario * row.antiguedad / this.baseDepresiacion);
    }
    else
      montoCalculado = row.cantidad * (row.moneda.id == 2 ? row.unitario * this.tipoCambio : row.unitario);
    return (montoCalculado * 1.00);
  }

  public calcularTotalSoles() {
    return this.dataSource.data.filter(x => x.activo == true).reduce((accum, curr) => accum + ((curr.total  + curr.instalacion) * this.tipoCambio), 0);
  }
  public calcularTotalDolares() {
    
    return this.dataSource.data.filter(x => x.activo == true).reduce((accum, curr) => accum + curr.total + curr.instalacion, 0);
  }

  compareValCombos(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  public selectedchangeTipoEquipamiento(opcion, row) {
    if (opcion.id == 11 || opcion.id == 13) { //Si es router o model la instalacion cuesta 100 soles
      row.instalacion = 350;
    } else {
      row.instalacion = 0;
    }
  }

}

export class ModelCombo {
  constructor(public id?: string, public nombre?: string) {
  }
}