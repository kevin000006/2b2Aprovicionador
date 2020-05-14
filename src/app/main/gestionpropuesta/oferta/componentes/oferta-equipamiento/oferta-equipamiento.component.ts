import { Component, OnInit,Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { AlertSuccessComponent } from '../alertSuccess/alertSuccess.component';
import { MatDialog } from '@angular/material/dialog';
import { EquipamientoService } from '../oferta-equipamiento/oferta-equipamiento.servicio';
import { CommonService } from 'app/common.service';
import { TipoEquipamientoModel,MonedaModel } from 'app/model/Common';
import { OfertaEquipamientoModel } from 'app/main/gestionpropuesta/models/oferta';

@Component({
  selector: 'oferta-equipamiento',
  templateUrl: './oferta-equipamiento.component.html',
  styleUrls: ['./oferta-equipamiento.component.scss']
})
export class OfertaEquipamientoComponent implements OnInit {

  @Input() ofertaBase:any={}; 

  tipoCambio: number = 3.5;
  baseDepresiacion: number = 60;
  listaTipos: TipoEquipamientoModel[] = [];
  listaCondicion: ModelCombo[] = [];
  listaMoneda: MonedaModel[] = [];
  listaMarca: ModelCombo[] = [];
  dataSource =new MatTableDataSource<OfertaEquipamientoModel>([]);

  constructor(
    public dialog: MatDialog,
    public equipamientoService :EquipamientoService,
    private commonService: CommonService
  ) { }

  displayedColumns: string[] = ['tipo', 'condicion', 'antigueadad', 'marca', 'modelo', 'cantidad', 'moneda', 'costo', 'costototal','accion'];

  ngOnInit(): void {
    this.commonService.getTipoEquipamiento().subscribe(data=>{ this.listaTipos = data });
    this.commonService.getTipoMonedaAll().subscribe(data => {this.listaMoneda = data});

    this.equipamientoService.findAllEquipamientoMarca().subscribe(data => {     
      this.listaMarca = data;
    });

    this.equipamientoService.findAllEquipamientoCondicion().subscribe(data => {     
      this.listaCondicion = data;
    });

    this.equipamientoService.getEquipamientoForOfeta(this.ofertaBase.id).subscribe(data=>{

      for(let d of data)
      {
        d["editable"]=false;
        d["iconEdit"]="edit";
        d["labelEditar"]="Editar";
      }
      

      this.dataSource.data = data;

      
      
    });

  }
 

  openEdit(eq:OfertaEquipamientoModel):void{

    if(eq.editable){
      eq.labelEditar = "Editar";
      eq.iconEdit = "edit";
    }else{
      eq.labelEditar = "Grabar";
      eq.iconEdit = "save";
    }
    
    eq.editable = !eq.editable;

  }

  addRow(): void {
    debugger;
    let row = new OfertaEquipamientoModel();
    this.dataSource.data.unshift(row);
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
      
      }
    });
  }


  changeMoneda(event, row:OfertaEquipamientoModel) {
    if (event.isUserInput) {
      row.total = this.calcularMontoMensual(row);
    }
  }
  inputChangeCantidad(input: string, row: any): void {
    if (input === "")
      row.cantidad = 0;
    else
      row.cantidad = parseInt(input);
    row.costototal = this.calcularMontoMensual(row);
  }
  inputChangeCosto(input: string, row: OfertaEquipamientoModel): void {
    if (input === "")
      row.unitario = 0;
    else
      row.unitario = parseInt(input);
    row.total = this.calcularMontoMensual(row);
  }
  inputChangeAntiguedad(input: string, row: OfertaEquipamientoModel): void {
    if (input === "")
      row.antiguedad = 0;
    else
      row.antiguedad = parseInt(input);
    row.total = this.calcularMontoMensual(row);

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
    return montoCalculado;
  }

  public calcularTotalSoles() {
    return this.dataSource.data.reduce((accum, curr) => accum + curr.total, 0);
  }
  public calcularTotalDolares() {
    return this.dataSource.data.reduce((accum, curr) => accum + (curr.total / this.tipoCambio), 0).toFixed(2);
  }

  compareValCombos(c1: any, c2:any): boolean {     
    return c1 && c2 ? c1.id === c2.id : c1 === c2; 
  }


}

export class ModelCombo {
  constructor(public id?: string, public nombre?: string) {
  }
}