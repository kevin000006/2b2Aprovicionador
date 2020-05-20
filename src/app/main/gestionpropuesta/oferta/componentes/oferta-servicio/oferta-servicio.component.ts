import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { GeodialogComponent } from '../geoDialog/geoDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'app/common.service';
import { OfertaDetalleModel, BandejaModel } from '../../../models/oferta';
import * as $ from 'jquery';
import { OfertaServicioService } from './oferta-servicio.service';
import * as Cookies from 'js-cookie';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
export interface State {
  flag: string;
  name: string;
  population: string;
}
@Component({
  selector: 'oferta-servicio',
  templateUrl: './oferta-servicio.component.html',
  styleUrls: ['./oferta-servicio.component.css']
})
export class OfertaServicioComponent implements OnInit {
  isLoadings: boolean = true;
  color: ThemePalette = 'warn';
  inProgress: boolean = false;
  progress: number = 0;
  _filtro: any = {
    oferta_id: '',
    Pageable: ''
  };
  pageIndex: number = 0;
  //https://stackblitz.com/edit/angular-material-autocomplete-async2?file=src%2Fapp%2Fapp.component.html
  lstBandeja = new Array<OfertaDetalleModel>();
  dataSourceList: any[];
  listAccionIsis = [];
  listTipoEnlace = [];
  listCondicionEnlace = [];
  listTipoCircuito = [];
  listTipoServicio = [];
  listViaAcceso = [];
  lstZonaSisego = [];
  listLDN=[
    {id:0,nombre:'NO'},
    {id:1,nombre:'SI'}
  ];
  lstMedidaVelicidad=[
    {id:'kbps',nombre:'Kbps'},
    {id:'mbps',nombre:'Mbps'},
    {id:'gbps',nombre:'Gbps'},
  ];

  //public seldescrip: string;
  //https://stackblitz.com/edit/mat-paginator-select-page?embed=1

  displayedColumns: string[] = [
    'sede', 'direccion', 'ubigeo', 'geo',
    'contacto', 'telefono', 'circuito', 'nrocircuito',
    'servicio', 'medio', 'bw', 'ldn', 'voz', 'video',
    'platinium', 'oro', 'plata', 'bronce',
    'equipoterminal', 'router', 'otro', 'facturacion',
    'acccionisis',

    'tiposede', 'modo', 'circuitos', 'numerocurcuitos', 'servicios', 'medios', 'sva', 'svadescripcion',
    'bws', 'ldns', 'vozs', 'videos', 'platiniums', 'oros', 'platas', 'bronces',
    'equipoterminals', 'routers', 'otros', 'precio', 'observaciones', 'ofertaisis', 'sesego', 'zona', 'ultimamilla', 'diasejecucion',

    'accion'];
  exampleDatabase: OfertaServicioService | null;
  //dataSource = new MatTableDataSource<ServicioElement>(dataSourceList);//:  EjemploDataSource | null;
  dataSource = new MatTableDataSource<any>();
  stateCtrl = new FormControl();
  filteredStates: Observable<any>;
  @Input() ofertaBase: any = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild('pagesize', { static: true }) pagesize: ElementRef;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private commonService: CommonService,
    private ofertaServicioService: OfertaServicioService,
    private _router: Router,
    private toastr: ToastrService
  ) {
  }
  resetAutoComplete(): void {
    this.filteredStates = null;
  }
  inputChangeUbigeo(input: any, row: any): void {
    if (input.length > 2) {
      row.isLoading = true;
      this.commonService.buscardistrito(input).
        subscribe(data => {
          setTimeout(() => {
            row.isLoading = false;
            this.filteredStates = data;
          }, 1000);
        });
    }
  }
  ngOnInit(): void {
    this.commonService.getCondicionEnlaceAll().subscribe(data => {
      this.listCondicionEnlace = data;
    });
    this.commonService.getTipoEnlaceAll().subscribe(data => {
      this.listTipoEnlace = data;
    });
    this.commonService.getTipoCircuitoAll().subscribe(data => {
      this.listTipoCircuito = data;
    });
    this.commonService.getTipoServicioAll().subscribe(data => {
      this.listTipoServicio = data;
    });
    this.commonService.getViaAccesoAll().subscribe(data => {
      this.listViaAcceso = data;
    });
    this.commonService.getAccionIsisAll().subscribe(data => {
      this.listAccionIsis = data;
    });
    this.ofertaServicioService.obtenerOfertasDetalle({ oferta_id: this.ofertaBase.id }).subscribe(data => {
      if (data != null) {
        this.dataSourceList = data;
        this.dataSource.data = data;
        console.log(data);
      }
    });
  }
  crearNuevoServicio(ofertasDetalleId: number, ofertaId: number): any {
    return {
      ofertasDetalleId: ofertasDetalleId,
      ofertaId: ofertaId,
      accionIsisIdPropuesto: 0,
      bwActualActual: '',
      bwPropuesto: '',
      caudalBronceActual: '',
      caudalBroncePropuesto: '',
      caudalLdnActual: '',
      caudalLdnPropuesto: '',
      caudalOroActual: '',
      caudalOroPropuesto: '',
      caudalPlataPropuesto: '',
      caudalPlatinumActual: '',
      caudalPlatinumPropuesto: '',
      caudalVideoActual: '',
      caudalVideoPropuesto: '',
      caudalVozActual: '',
      caudalVozPropuesto: '',
      caudal_plata_actual: '',
      clienteId: 0,
      codigoSisego: '',
      componentesPropuesto: '',
      contacto: '',
      costoUltimaMilla: 0,
      departamentoId: 0,
      descripcionSvaPropuesto: '',
      detalleAccionEnlacePropuesto: '',
      diasEjecucion: 0,
      direccion: '',
      distritoId: 0,
      dteActual: 0,
      equipoStockPropuesto: '',
      equipoTerminalActual: '',
      equipoTerminalPropuesto: '',
      equipo_adicional_actual: '',
      facturacion_actual: 0,
      fechaLlegadaPropuesto: '',
      latitud: '',
      longitud: '',
      nombreSede: '',
      numeroCdActual: '',
      observacionesPropuesto: '',
      ofertaIsisPropuesto: '',
      otrosEquiposPropuesto: '',
      pozoTierraActual: '',
      precioPropuesto: 0,
      provinciaId: 0,
      recursoTransporteActual: '',
      routerPropuesto: '',
      routerSwitchActual: '',
      secuencia: 0,
      segmentoSatelitalActual: 0,
      svaPropuesto: '',
      telefono: '',
      tipoAntenaActual: '',
      tipoCircuitoActual: '',
      tipoCircuitoIdPropuesto: 0,
      tipoServicioIdActual: 0,
      tipoServicioIdPropuesto: 0,
      ultimaMillaActual: 0,
      upsActual: '',
      viaAccesoIdPropuesto: 0,
      vrfPropuesto: '',
      vrf_actual: '',
      zonaSisego: '',
      zoom: '',
      estado: 0,
      activo: true,


      sede: '',
      ubigeo: '', geo: '',
      //longitud: 0, latitud: 0,contacto: '', telefono: '', 
      circuito: "", nrocircuito: "", servicio: "",
      medio: "", bw: "", nrobw: "", ldn: "", nroldn: "", voz: "", nrovoz: "", video: "", nrovideo: "",
      platinium: "", nroplatinium: "", oro: "", nrooro: "", plata: "", nroplata: "", bronce: "", nrobronce: "",
      equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "", condicionenlace: "", isLoading: false
      , lstZonaSisego: []
    };
  }
  addRow(): void {
    var Id = this.dataSource.data.length == 0 ? 1 : this.dataSource.data[this.dataSource.data.length - 1].ofertasDetalleId + 1;
    let objecto = this.crearNuevoServicio(Id, this.ofertaBase.id);
    this.dataSource.data.push(objecto);
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

        debugger;
        var objetoOfertaOpex = this.dataSourceList.find(function (element) { return element.ofertasDetalleId == item.ofertasDetalleId; });
        if (objetoOfertaOpex.estado == 0) {// si el registro es agregado, entonce se elimina
          var ObjectIndex = this.dataSourceList.findIndex(function (obj) { return obj.ofertasDetalleId === item.ofertasDetalleId; });//Obtenemos el Index del List de Objetos        
          this.dataSourceList.splice(ObjectIndex, 1);
        } else // si el registro ya existe en la base de datos se actualizara el estado 2: Inactivo
          objetoOfertaOpex.estado = 2;
        //Listamos los registro que estan agregado o modificados                
        // this.dataSourceList = this.dataSourceList.filter(function (obj) {
        //   return obj.estado == 0 || obj.estado == 1 || obj.estado == -1
        // });
        this.dataSource = new MatTableDataSource<any>(this.dataSourceList.filter(function (obj) {
          return obj.estado == 0 || obj.estado == 1 || obj.estado == -1
        }));
      }
    });
  }

  geoDialog(item: any): void {
    console.log(item);
    const dialogRef = this.dialog.open(GeodialogComponent, {
      width: '500px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      var settings = {
        "url": "https://cors-anywhere.herokuapp.com/http://200.48.131.82/Api/zonafibra",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": "SDIOxZONASFFTT0819v1",
          "x-User": "jesus.gomez@telefonica.com",
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(result),
      };
      $.ajax(settings).done(function (response) {
        let result_ = JSON.parse(response);
        if (result_.status == "success") {
          let result__ = JSON.parse(result_['result']);
          item.lstZonaSisego = result__['zonas'];
        }
      });
      this.dataSource.filter = '';
    });
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
    this.ofertaServicioService.guardarservicios(listOfertaOpex).pipe(
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

      if (typeof (event) === 'object') {
        this.inProgress = false;
        this.toastr.success('Se proceso correctamente la información!', '', {
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true
        });
      }
    });
  }

  /*
    public filtrarData() {
       var obj = {
        oferta_id: this._filtro.oferta_id,
        page:this.pageIndex,
        size:this.pagesize.nativeElement.value
      }
  
      this.dataSource.filtrar(obj,this.pagesize.nativeElement.value);
    }
  
    public loadData() {
      this.exampleDatabase = new OfertaServicioService(this.httpClient);
  
      this.dataSource = new EjemploDataSource(this.exampleDatabase, this.sort);
      fromEvent(this.filter.nativeElement, 'keyup')
        .subscribe(() => {
          if (!this.dataSource) {
            return;
          }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
  
       /* fromEvent(this.pagesize.nativeElement, 'change')
        .subscribe(() => {
          if (!this.dataSource) {
            return;
          }
          this.filtrarData();
        });/
  
    }
  */

}
// const dataSourceList: ServicioElement[] = [
//   {
//     id: 1, sede: 'Av. Argentina', direccion: 'puente camote', ubigeo: '',
//     geo: 'Balanceador', longitud: 0, latitud: 0,
//     contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "1", nrocircuito: "1", servicio: "1",
//     medio: "1", bw: "1", nrobw: "2", ldn: "1", nroldn: "", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
//     platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
//     equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "", condicionenlace: "", isLoading: false,
//     lstZonaSisego: []
//   },
//   {
//     id: 2, sede: 'Av. Argentina 2', direccion: 'san borja', ubigeo: '',
//     geo: 'Balanceador', longitud: 0, latitud: 0,
//     contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
//     medio: "1", bw: "1", nrobw: "2", ldn: "1", nroldn: "", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
//     platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
//     equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "", condicionenlace: "", isLoading: false
//     , lstZonaSisego: []
//   },
//   {
//     id: 3, sede: 'Av. Argentina 3', direccion: 'plaza norte', ubigeo: '',
//     geo: 'Balanceador', longitud: -70.2190587197085, latitud: -17.9966159197085,
//     contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
//     medio: "1", bw: "1", nrobw: "2", ldn: "1", nroldn: "", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
//     platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
//     equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "", condicionenlace: "", isLoading: false
//     , lstZonaSisego: []
//   }

// ];
// export interface ServicioElement {
//   id: number,
//   sede: string;
//   direccion: string;
//   ubigeo: string;
//   geo: string;
//   longitud: number;
//   latitud: number;
//   contacto: string;
//   telefono: string;
//   circuito: string;
//   nrocircuito: string;
//   servicio: string;
//   medio: string;
//   bw: string;
//   nrobw: string;
//   ldn: string;
//   nroldn: string;
//   voz: string;
//   nrovoz: string;
//   video: string;
//   nrovideo: string;
//   platinium: string;
//   nroplatinium: string;
//   oro: string;
//   nrooro: string;
//   plata: string;
//   nroplata: string;
//   bronce: string;
//   nrobronce: string;
//   equipoterminal: string;
//   router: string;
//   //otro: string;
//   facturacion: string;
//   acccionisis: string;
//   tipoenlace: string;
//   condicionenlace: string;
//   isLoading: boolean;
//   lstZonaSisego: Array<any>;

// }
// export class ModelCombo {
//   constructor(public id?: string, public nombre?: string) {
//   }
// }

