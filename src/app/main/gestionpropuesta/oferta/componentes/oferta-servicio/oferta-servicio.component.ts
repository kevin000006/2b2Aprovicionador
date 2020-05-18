import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

import {
  ClienteModel, MonedaModel,
  TipoServicioModel, ViaAccesoModel, EquipamientoMarcaModel, EquipamientoCondicionModel,
  SisegoCondicionModel, ConceptosOpexModel, TipoEnlaceModel, CondicionEnlaceModel,
  TipoCircuitoModel
} from 'app/model/Common';
import { OfertaServicioService } from './oferta-servicio.service';
import * as Cookies from 'js-cookie';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map, startWith, finalize, debounceTime,tap,switchMap } from 'rxjs/operators';

import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

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
  isLoadings : boolean = true;
  _filtro: any = {
    oferta_id: '',
    Pageable: ''
  };
  pageIndex: number = 0;
//https://stackblitz.com/edit/angular-material-autocomplete-async2?file=src%2Fapp%2Fapp.component.html
  lstBandeja = new Array<OfertaDetalleModel>();
 
  listAccionIsis = [];
  listTipoEnlace = [];
  listCondicionEnlace = [];
  listTipoCircuito = [];
  listTipoServicio = [];
  listViaAcceso = [];
  lstZonaSisego=[];

  //public seldescrip: string;
  //https://stackblitz.com/edit/mat-paginator-select-page?embed=1

  displayedColumns: string[] = [
    'sede', 'direccion', 'ubigeo', 'geo',
    'contacto', 'telefono', 'circuito', 'nrocircuito',     
    'servicio', 'medio', 'bw', 'ldn', 'voz', 'video',
    'platinium', 'oro', 'plata', 'bronce',
    'equipoterminal', 'router', 'otro', 'facturacion',
    'acccionisis',

    'tiposede','modo','circuitos','numerocurcuitos','servicios','medios','sva','svadescripcion',
     'bws', 'ldns', 'vozs', 'videos','platiniums', 'oros', 'platas', 'bronces',
     'equipoterminals', 'routers', 'otros','precio','observaciones','ofertaisis','sesego','zona','ultimamilla','diasejecucion',

    'accion'];
  exampleDatabase: OfertaServicioService | null;
  dataSource = new MatTableDataSource<ServicioElement>(dataSourceList);//:  EjemploDataSource | null;
  stateCtrl = new FormControl();  
  filteredStates: Observable<any>;
  

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
  }
  crearNuevoServicio(id: number): ServicioElement {
    return {
      id: id, sede: '', direccion: '', ubigeo: '', geo: '', longitud: 0, latitud: 0,
      contacto: '', telefono: '', circuito: "", nrocircuito: "", servicio: "",
      medio: "", bw: "", nrobw: "", ldn: "",nroldn : "", voz: "", nrovoz: "", video: "", nrovideo: "",
      platinium: "", nroplatinium: "", oro: "", nrooro: "", plata: "", nroplata: "", bronce: "", nrobronce: "",
      equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "",condicionenlace:"", isLoading: false
    ,lstZonaSisego:[]
    };
  } 
  addRow(): void {
    this.dataSource.data.push(this.crearNuevoServicio(this.dataSource.data.length + 1));
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
        this.dataSource = new MatTableDataSource<ServicioElement>(dataSourceList);
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
        if(result_.status == "success"){
          let result__ = JSON.parse(result_['result']);
          item.lstZonaSisego=result__['zonas'];
         
          
        }
        
      }); 
     
        this.dataSource.filter = '';

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
const dataSourceList: ServicioElement[] = [
  {
    id: 1, sede: 'Av. Argentina', direccion: 'puente camote', ubigeo: '',
    geo: 'Balanceador', longitud: 0, latitud: 0,
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "1", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", nroldn: "", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "", condicionenlace: "", isLoading: false,
    lstZonaSisego:[]
  },
  {
    id: 2, sede: 'Av. Argentina 2', direccion: 'san borja', ubigeo: '',
    geo: 'Balanceador', longitud: 0, latitud: 0,
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", nroldn: "", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "", condicionenlace: "", isLoading: false
    ,lstZonaSisego:[]
  },
  {
    id: 3, sede: 'Av. Argentina 3', direccion: 'plaza norte', ubigeo: '',
    geo: 'Balanceador', longitud: -70.2190587197085, latitud: -17.9966159197085,
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", nroldn: "", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "", condicionenlace: "", isLoading: false
    ,lstZonaSisego:[]
  }

];
export interface ServicioElement {
  id: number,
  sede: string;
  direccion: string;
  ubigeo: string;
  geo: string;
  longitud: number;
  latitud: number;
  contacto: string;
  telefono: string;
  circuito: string;
  nrocircuito: string;
  servicio: string;
  medio: string;
  bw: string;
  nrobw: string;
  ldn: string;
  nroldn: string;
  voz: string;
  nrovoz: string;
  video: string;
  nrovideo: string;
  platinium: string;
  nroplatinium: string;
  oro: string;
  nrooro: string;
  plata: string;
  nroplata: string;
  bronce: string;
  nrobronce: string;
  equipoterminal: string;
  router: string;
  //otro: string;
  facturacion: string;
  acccionisis: string;
  tipoenlace: string;
  condicionenlace: string;
  isLoading: boolean;
  lstZonaSisego:Array<any>;

}
export class ModelCombo {
  constructor(public id?: string, public nombre?: string) {
  }
}


export class EjemploDataSource extends DataSource<BandejaModel>{
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filtrar(param, size) {
    this.loadingSubject.next(true);
    this._exampleDatabase.dataChange.next([]);
    this._exampleDatabase.getAllOfertaServicio(param);
    this.pageSize = size || 5;
  }
  pageSize = 5;
  private loadingSubject = new BehaviorSubject<boolean>(true);
  public isWait$ = this.loadingSubject.asObservable();
  totalPages: number = 0;
  totalRegistros: number = 0;
  filteredData: BandejaModel[] = [];
  renderedData: BandejaModel[] = [];

  constructor(public _exampleDatabase: OfertaServicioService,
    //  public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    //this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<BandejaModel[]> {

    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
    ];

    this._exampleDatabase.getAllOfertaServicio({});

    return merge(...displayDataChanges).pipe(map(() => {
      debugger;
      // Filter data
      let data_ = this._exampleDatabase.data['data'] || [];

      this.filteredData = data_.slice().filter((issue: BandejaModel) => {
        const searchStr = (issue.version + issue.codigo + issue.cliente + issue.oportunidad + issue.descripcion).toLowerCase();
        this.loadingSubject.next(false);
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;

      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());
      if (sortedData.length == 0 && this._exampleDatabase.data['data'] !== undefined) { this.loadingSubject.next(false); }

      // Grab the page's slice of the filtered sorted data.

      // const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      // this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      this.renderedData = sortedData.splice(0, 100);
      this.totalRegistros = this._exampleDatabase.data['rows'] || 0;
      this.totalPages = Math.ceil((this.totalRegistros / this.pageSize));

      return this.renderedData;
    }
    ));

    this.loadingSubject.next(false);

  }

  disconnect() { }

  sortData(data: BandejaModel[]): BandejaModel[] {
    if (!this._sort.active || this._sort.direction === '') {

      return data;

    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      /* switch (this._sort.active) {
         case 'codigo': [propertyA, propertyB] = [a.codigo, b.codigo]; break;
         case 'version': [propertyA, propertyB] = [a.version, b.version]; break;
         case 'oportunidad': [propertyA, propertyB] = [a.oportunidad, b.oportunidad]; break;
         case 'cliente': [propertyA, propertyB] = [a.cliente, b.cliente]; break;
         case 'descripcion': [propertyA, propertyB] = [a.descripcion, b.descripcion]; break;
         case 'estado': [propertyA, propertyB] = [a.estado, b.estado]; break;
       }*/

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}