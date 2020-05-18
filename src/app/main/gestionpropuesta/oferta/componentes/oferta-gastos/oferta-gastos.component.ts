import { Component, OnInit, Input } from '@angular/core';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OfertaGastosService } from './oferta-gastos.service';
import { CommonService } from 'app/common.service';
import { OfertaOpex } from '../../../../../model/Common';
import { catchError, map } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
//https://www.npmjs.com/package/ngx-toastr
@Component({
  selector: 'oferta-gastos',
  templateUrl: './oferta-gastos.component.html',
  styleUrls: ['./oferta-gastos.component.scss']
})
export class OfertaGastosComponent implements OnInit {
  color: ThemePalette = 'warn';
  inProgress: boolean = false;
  progress: number = 0;
  tipoCambio: number = 3.5;
  isPrepositionChecked: boolean = false;
  listaConcepto: any = [];
  listaMoneda = [];
  dataSourceList: OfertaOpex[];
  dataSource = new MatTableDataSource<OfertaOpex>();
  displayedColumns: string[] = ['concepto', 'cantidad', 'nromeses', 'factor', 'moneda', 'montounitmenusal', 'montototalmensual', 'accion'];

  @Input() ofertaBase: any = {};
  constructor(
    public dialog: MatDialog,
    private ofertaGastosService: OfertaGastosService,
    private commonService: CommonService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {    
    // this.toastr.success('Se proceso correctamente la información!','', {
    //   //progressBar:true,
    //   //progressAnimation: 'increasing'	,
    //   closeButton:true      
    // });    

    // this.toastr.warning('Se proceso correctamente la información!','', {
    //   //progressBar:true,
    //   //progressAnimation: 'increasing'	,
    //   closeButton:true
    // });    

    // this.toastr.error('Se proceso correctamente la información!','', {
    //   //progressBar:true,
    //   //progressAnimation: 'increasing'	,
    //   closeButton:true
    // });    

    // this.toastr.info('Se proceso correctamente la información!','', {
    //   //progressBar:true,
    //   //progressAnimation: 'increasing'	,
    //   closeButton:true
    // });    

    this.ofertaBase.id = 5;
    //Lenar combo moneda_id
    await this.commonService.getTipoMonedaAll().subscribe(data => {
      this.listaMoneda = data;
      console.log(data);
    });
    //Lenar combo Comcepto  
    await this.ofertaGastosService.listarConceptoOpex().subscribe(data => {
      this.listaConcepto = data;
    });
    await this.ofertaGastosService.obtenerOfertasOpex(this.ofertaBase.id).subscribe((data: OfertaOpex[]) => {
      if (data != null) {
        this.dataSourceList = data;
        this.dataSource.data = data;
      }
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

      if (objetoConcepto.factor == 0) {//Si el factor es cero no se mostrara ninguna informacion en la bandeja
        row.factor = 0;
        row.totalMensual = this.calcularMontoMensual(row);
      }
      else {
        row.factor = objetoConcepto.factor;
        row.totalMensual = this.calcularMontoMensual(row);
      }
    }
  }
  changeMoneda(event, row) {
    if (event.isUserInput) {
      if (event.source.value == 2) //Cual el tipo de cambio es dolares 
        row.moneda_id = 2;
      else// cuando selecciona la moneda_id de soles
        row.moneda_id = 1;
      row.totalMensual = this.calcularMontoMensual(row);;//.toFixed(2);      
    }
  }
  inputChangeCantidad(input: string, row: any): void {
    if (input === "")
      row.cantidad = 0;
    else
      row.cantidad = parseInt(input);
    row.totalMensual = this.calcularMontoMensual(row);
  }
  inputChangeNumeroMeses(input: string, row: any): void {
    if (input === "")
      row.meses = 0;
    else
      row.meses = parseInt(input);
    row.totalMensual = this.calcularMontoMensual(row);
  }

  inputChangeMontoUnitarioMensual(input: string, row: any): void {
    if (input === "")
      row.unitarioMensual = 0;
    else
      row.unitarioMensual = parseInt(input);
    row.totalMensual = this.calcularMontoMensual(row);
  }
  calcularMontoMensual(row: any): number {
    var montoCalculado: number = 0;
    if (row.factor > 0)
      montoCalculado = row.cantidad * row.meses * ((row.moneda_id == 2 ? row.unitarioMensual * this.tipoCambio : row.unitarioMensual) * (row.factor + 1));
    else
      montoCalculado = row.cantidad * row.meses * (row.moneda_id == 2 ? row.unitarioMensual * this.tipoCambio : row.unitarioMensual);
    return montoCalculado;
  }
  public calcularTotalSoles() {
    return this.dataSource.data.reduce((accum, curr) => accum + curr.totalMensual, 0).toFixed(2);
  }
  public calcularTotalDolares() {
    return this.dataSource.data.reduce((accum, curr) => accum + (curr.totalMensual / this.tipoCambio), 0).toFixed(2);
  }
  crearNuevoGastos(ofertaOpexId: number, ofertaId: number): OfertaOpex {
    return {
      id: ofertaOpexId,
      ofertaId: ofertaId,
      conceptoId: 0,
      nombre: '',
      mostrarConcepto: false,
      cantidad: 0,
      meses: 0,
      factor: 0,
      moneda_id: 1,
      unitarioMensual: 0,
      totalMensual: 0,
      activo: true,
      estado: 0
    };
  }
  addRow(): void {
    var Id = this.dataSource.data.length == 0 ? 1 : this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    let objecto = this.crearNuevoGastos(Id, this.ofertaBase.id);
    this.dataSource.data.push(objecto);
    this.dataSource.filter = "";
  }

  guardarGastosOpex(): void {
    
    const listOfertaOpex = this.dataSourceList.map(item => {
      if (item.estado == 0) //Si es 0 Nuevo Registro
        item.id = 0
      else if (item.estado == 1)// Si es 1 Registro ha sido Actulizado
        item.id = item.id
      else if (item.estado == 2)
        item.activo = false    
      var container = {
        id: item.id,
        ofertaId: item.ofertaId,
        conceptoId: item.conceptoId,
        nombre: item.nombre,
        cantidad: item.cantidad,
        meses: item.meses,
        factor: item.factor,
        moneda_id: item.moneda_id,
        unitarioMensual: item.unitarioMensual,
        totalMensual: item.totalMensual,
        activo: item.activo,
        estado: 0       
      };
      return container;
    });    
    this.inProgress = true;
    debugger;
    console.log(listOfertaOpex);
    this.ofertaGastosService.guardarGastos(listOfertaOpex).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.inProgress = false;
        return of(`fallo al guardar.`);
      })
    ).subscribe((event: any) => {
      debugger;
      if (typeof (event) === 'object') {
        this.inProgress = false;
        this.toastr.success('Se proceso correctamente la información!', '', {
          progressBar:true,
          progressAnimation: 'increasing'	,
          closeButton:true
        });        
      }
    });
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
        debugger;
        var objetoOfertaOpex = this.dataSourceList.find(function (element) { return element.id == item.id; });
        if (objetoOfertaOpex.estado == 0) {// si el registro es agregado, entonce se elimina
          var ObjectIndex = this.dataSourceList.findIndex(function (obj) { return obj.id === item.id; });//Obtenemos el Index del List de Objetos        
          this.dataSourceList.splice(ObjectIndex, 1);
        } else // si el registro ya existe en la base de datos se actualizara el estado 2: Inactivo
          objetoOfertaOpex.estado = 2;
        //Listamos los registro que estan agregado o modificados                
        // this.dataSourceList = this.dataSourceList.filter(function (obj) {
        //   return obj.estado == 0 || obj.estado == 1 || obj.estado == -1
        // });
        this.dataSource = new MatTableDataSource<OfertaOpex>(this.dataSourceList.filter(function (obj) {
          return obj.estado == 0 || obj.estado == 1 || obj.estado == -1
        }));
      }
    });
  }
}