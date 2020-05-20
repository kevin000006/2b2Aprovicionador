import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { GeodialogComponent } from '../geoDialog/geoDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'app/common.service';
import { OfertaDetalleModel } from '../../../models/oferta';
import * as $ from 'jquery';
import { OfertaServicioService } from './oferta-servicio.service';
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
  //lstBandeja = new Array<OfertaDetalleModel>();
  dataSourceList: OfertaDetalleModel[];
  listAccionIsis = [];
  listTipoEnlace = [];
  listCondicionEnlace = [];
  listTipoCircuito = [];
  listTipoServicio = [];
  listViaAcceso = [];
  lstZonaSisego = [];
  listLDN = [
    { id: 0, nombre: 'NO' },
    { id: 1, nombre: 'SI' }
  ];
  lstMedidaVelicidad = [
    { id: 'kbps', nombre: 'Kbps' },
    { id: 'mbps', nombre: 'Mbps' },
    { id: 'gbps', nombre: 'Gbps' },
  ];

  //public seldescrip: string;
  //https://stackblitz.com/edit/mat-paginator-select-page?embed=1

  displayedColumns: string[] = [
    'sede', 'direccion', 'ubigeo', 'geo', 'contacto', 'telefono',

    'servicioActual_circuito', 'servicioActual_nrocircuito', 'servicioActual_servicio',
    'servicioActual_medio', 'servicioActual_bw', 'servicioActual_ldn',
    'servicioActual_voz', 'servicioActual_video', 'servicioActual_platinium',
    'servicioActual_oro', 'servicioActual_plata', 'servicioActual_bronce', 'servicioActual_equipoterminal',
    'servicioActual_router', 'servicioActual_otro', 'servicioActual_facturacion',

    'servicioPropuesto_acccionisis', 'servicioPropuesto_tiposede',
    'servicioPropuesto_modo', //Parece que esto es el campo Condicion    
    'servicioPropuesto_circuito', 'servicioPropuesto_nrocircuito',
    'servicioPropuesto_servicio', 'servicioPropuesto_medio',
    'servicioPropuesto_sva', 'servicioPropuesto_svadescripcion',//creo que son campos nuevo agregado pos jorge
    'servicioPropuesto_bw',
    'servicioPropuesto_ldn', 'servicioPropuesto_voz', 'servicioPropuesto_video', 'servicioPropuesto_platinium', 'servicioPropuesto_oro', 'servicioPropuesto_plata', //nuevos campos agregado por jorge
    'servicioPropuesto_bronce',

    'equipos_equipoterminal', 'equipos_routers', 'equipos_otros', 'equipos_precio', 'equipos_observaciones', 'ofertaisis',

    'sesego', 'sisego_zona', 'sisego_ultimamilla', 'sisego_diasejecucion',

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
      //console.log(this.listViaAcceso);
    });
    this.commonService.getAccionIsisAll().subscribe(data => {
      this.listAccionIsis = data;
    });
    this.ofertaServicioService.obtenerOfertasDetalle({ oferta_id: this.ofertaBase.id, page: 0 }).subscribe(data => {
      if (data != null) {
        this.dataSourceList = data;
        this.dataSource.data = data;
        console.log(data);
      }
    });
  }
  crearNuevoServicio(ofertasDetalleId: number, ofertaId: number): OfertaDetalleModel {
    return {
      clienteId: 0,
      ofertasDetalleId: ofertasDetalleId,
      ofertaId: ofertaId,
      nombreSede: '',
      direccion: '',
      departamentoId: 0,
      provinciaId: 0,
      distritoId: 0,
      latitud: '',
      longitud: '',
      contacto: '',
      telefono: '',
      //Servicio Actual
      tipoCircuitoActual: '',
      tipoServicioIdActual: -1,
      //servicioActual_medio  ==>  falta este atributo
      bwActualActual: '',
      caudalLdnActual: '',
      caudalVozActual: '',
      caudalVideoActual: '',
      caudalPlatinumActual: '',
      caudalOroActual: '',
      caudal_plata_actual: '',
      caudalBronceActual: '',
      equipoTerminalActual: '',
      routerSwitchActual: '',
      facturacion_actual: 0,
      //servicioActual_otro ==> facta  estre atributo
      equipo_adicional_actual: '',

      //Servicio Propuesto y Caudal presupuesto
      accionIsisIdPropuesto: 0,
      //servicioPropuesto_tiposede ==> falta estre atributo
      //servicioPropuesto_modo ==> falta estre atributo
      tipoCircuitoIdPropuesto: 0,
      //servicioPropuesto_nrocircuito ==> falta estre atributo
      tipoServicioIdPropuesto: 0,
      //servicioPropuesto_medio ==> falta estre atributo
      svaPropuesto: '',
      descripcionSvaPropuesto: '',
      bwPropuesto: '',
      caudalLdnPropuesto: '',
      caudalVozPropuesto: '',
      caudalVideoPropuesto: '',
      caudalPlatinumPropuesto: '',
      caudalOroPropuesto: '',
      caudalPlataPropuesto: '',
      caudalBroncePropuesto: '',

      equipoTerminalPropuesto: '',
      routerPropuesto: '',
      otrosEquiposPropuesto: '',
      precioPropuesto: 0,
      observacionesPropuesto: '',

      ofertaIsisPropuesto: '',
      codigoSisego: '',
      zonaSisego: '',
      costoUltimaMilla: 0,
      diasEjecucion: 0,

      componentesPropuesto: '',
      fechaLlegadaPropuesto: '',
      equipoStockPropuesto: '',
      viaAccesoIdPropuesto: 0,
      vrfPropuesto: '',
      detalleAccionEnlacePropuesto: '',
      dteActual: 0,
      numeroCdActual: '',
      pozoTierraActual: '',
      recursoTransporteActual: '',
      segmentoSatelitalActual: 0,
      tipoAntenaActual: '',
      secuencia: 0,
      ultimaMillaActual: 0,
      upsActual: '',
      vrf_actual: '',
      zoom: '',
      estado: 0,
      activo: true,
      isLoading: false
      //, lstZonaSisego: []
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
        var objetoOfertaOpex = this.dataSourceList.find(function (element) { return element.ofertasDetalleId == item.ofertasDetalleId; });
        if (objetoOfertaOpex.estado == 0) {// si el registro es agregado, entonce se elimina
          var ObjectIndex = this.dataSourceList.findIndex(function (obj) { return obj.ofertasDetalleId === item.ofertasDetalleId; });//Obtenemos el Index del List de Objetos        
          this.dataSourceList.splice(ObjectIndex, 1);
        } else // si el registro ya existe en la base de datos se actualizara el estado 2: Inactivo
          objetoOfertaOpex.estado = 2;
        //Listamos los registro que estan agregado o modificados                        
        this.dataSource = new MatTableDataSource<any>(this.dataSourceList.filter(function (obj) {
          return obj.estado == 0 || obj.estado == 1 || obj.estado == -1
        }));
      }
    });
  }

  geoDialog(item: any): void {
    const dialogRef = this.dialog.open(GeodialogComponent, {
      width: '500px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      item.longitud = result.lng;
      item.latitud = result.lat;
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

  guardarServicios(): void {
    const listOfertaDetalle = this.dataSourceList.map(item => {
      if (item.estado == 0) //Si es 0 Nuevo Registro
        item.ofertasDetalleId = 0
      else if (item.estado == 1)// Si es 1 Registro ha sido Actulizado
        item.ofertasDetalleId = item.ofertasDetalleId
      else if (item.estado == 2)
        item.activo = false
      var container = {
        bw_actual: item.bwActualActual,
        bronce_actual: item.caudalBronceActual,
        bronce_propuesto: item.caudalBroncePropuesto,
        bw_propuesto: item.bwPropuesto,
        contacto: item.contacto,
        dias: 0,
        direccion: item.direccion,
        equipo: item.equipoTerminalActual,
        equipo2: item.equipoTerminalPropuesto,
        facturacion: item.facturacion_actual,
        id: item.ofertasDetalleId,
        idaccionisis: 0,
        idcircuito: item.tipoCircuitoActual,
        idcircuito2: item.tipoCircuitoIdPropuesto,
        iddistrito: item.distritoId,
        idmedio: 0,
        idmedio2: 0,
        idmodo: 0,
        idservicio: item.tipoServicioIdActual,
        idservicio2: item.tipoServicioIdPropuesto,
        idtiposede: 0,
        lat: item.latitud,
        ldn_actual: item.caudalLdnActual,
        ldn_propuesto: item.caudalLdnPropuesto,
        lon: item.longitud,
        ncircuito: item.tipoCircuitoActual,
        ncircuito2: item.tipoCircuitoIdPropuesto,
        observaciones: item.observacionesPropuesto,
        ofertaisis: item.ofertaIsisPropuesto,
        oro_actual: item.caudalOroActual,
        oro_propuesto: item.caudalOroPropuesto,
        otros: '',
        otros2: '',
        plata_actual: item.caudal_plata_actual,
        plata_propuesto: item.caudalPlataPropuesto,
        platinium_actual: item.caudalPlatinumActual,
        platinium_propuesto: item.caudalPlatinumPropuesto,
        precio: item.precioPropuesto,
        router: item.routerSwitchActual,
        router2: item.routerPropuesto,
        sede: item.nombreSede,
        sisego: item.codigoSisego,
        sva: item.svaPropuesto,
        svadescripcion: item.descripcionSvaPropuesto,
        telefono: item.telefono,
        ultima: 0,
        video_actual: item.caudalVideoActual,
        video_propuesto: item.caudalVideoPropuesto,
        voz_actual: item.caudalVozActual,
        voz_propuesto: item.caudalVozPropuesto,
        zona: item.zonaSisego
        // id: item.id,
        // ofertaId: item.ofertaId,
        // conceptoId: item.conceptoId,
        // nombre: item.nombre,
        // cantidad: item.cantidad,
        // meses: item.meses,
        // factor: item.factor,
        // moneda_id: item.moneda_id,
        // unitarioMensual: item.unitarioMensual,
        // totalMensual: item.totalMensual,
        // activo: item.activo,
        // estado: 0
      };
      return container;
    });
    debugger;

    this.inProgress = true;
    this.ofertaServicioService.guardarservicios(listOfertaDetalle).pipe(
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
}


