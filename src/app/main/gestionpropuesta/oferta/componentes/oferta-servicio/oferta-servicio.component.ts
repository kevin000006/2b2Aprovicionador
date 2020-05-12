import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { GeodialogComponent } from '../geoDialog/geoDialog.component';
import { MatDialog } from '@angular/material/dialog';
import {CommonService} from 'app/common.service';
import { OfertaDetalleModel,BandejaModel } from '../../../models/oferta';
import { ClienteModel, MonedaModel,
  TipoServicioModel,ViaAccesoModel,EquipamientoMarcaModel,EquipamientoCondicionModel,
  SisegoCondicionModel,ConceptosOpexModel,TipoEnlaceModel,CondicionEnlaceModel,
  TipoCircuitoModel
} from 'app/model/Common';
import { OfertaServicioService } from './oferta-servicio.service';
import * as Cookies from 'js-cookie';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { DataSource } from   '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'oferta-servicio',
  templateUrl: './oferta-servicio.component.html',
  styleUrls: ['./oferta-servicio.component.css']
})
export class OfertaServicioComponent implements OnInit {

  _filtro: any = { 
    oferta_id: '', 
    Pageable: '' 
   };
   pageIndex:number=0;

  lstBandeja = new Array<OfertaDetalleModel>();
/*
  listBw: ModelCombo[] = [];
  listLDN: ModelCombo[] = [];
  listVoz: ModelCombo[] = [];
  listVideo: ModelCombo[] = [];
  listPlatinium: ModelCombo[] = [];
  listOro: ModelCombo[] = [];
  listPlata: ModelCombo[] = [];
  listBronce: ModelCombo[] = [];
*/

  listAccionIsis = [];
  listTipoEnlace = [];
  listCondicionEnlace = [];
  listTipoCircuito = [];
  listTipoServicio = [];
  listViaAcceso = [];

  //public seldescrip: string;
  //https://stackblitz.com/edit/mat-paginator-select-page?embed=1

  displayedColumns: string[] = [
    'accion', 'sede', 'direccion', 'ubigeo', 'geo',
    'contacto', 'telefono', 'circuito', 'nrocircuito',
     'acccionisis', 'tipoenlace','condicionenlace',
    'servicio', 'medio', 'bw', 'ldn', 'voz', 'video',
    'platinium', 'oro', 'plata', 'bronce',
    'equipoterminal', 'router', 'otro', 'facturacion'];
  exampleDatabase: OfertaServicioService | null;
  dataSource :  EjemploDataSource | null;
  //new MatTableDataSource<ServicioElement>(dataSourceList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild('pagesize', { static: true }) pagesize: ElementRef;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private commonService : CommonService,
    private ofertaServicioService: OfertaServicioService,
    private _router: Router,
  ) { }
  //
  ngOnInit(): void {
 
    this.commonService.getCondicionEnlaceAll().subscribe(data => {
      this.listCondicionEnlace = data;
    });
    this.commonService.getTipoEnlaceAll().subscribe(data => {
      this.listTipoEnlace = data;
    });
    this.commonService.getTipoCircuitoAll().subscribe(data => {
      this.listTipoCircuito= data;
    });
    this.commonService.getTipoServicioAll().subscribe(data => {
      this.listTipoServicio= data;
    });
    this.commonService.getViaAccesoAll().subscribe(data => {
      this.listViaAcceso = data;
    });
    this.commonService.getAccionIsisAll().subscribe(data => {
      this.listAccionIsis = data;
    });

    this.loadData();  
   /*
    this.listBw.push(new ModelCombo("1", "Bw 1"));
    this.listBw.push(new ModelCombo("2", "Bw 2"));
    this.listBw.push(new ModelCombo("3", "Bw 3"));
    this.listBw.push(new ModelCombo("4", "Bw 4"));
    //Lenar combo LDN
    this.listLDN.push(new ModelCombo("1", "Si"));
    this.listLDN.push(new ModelCombo("2", "No"));
    //Lenar combo Voz
    this.listVoz.push(new ModelCombo("1", "Kbps"));
    this.listVoz.push(new ModelCombo("2", "Mbps"));
    //Lenar combo Video
    this.listVideo.push(new ModelCombo("1", "Kbps"));
    this.listVideo.push(new ModelCombo("2", "Mbps"));
    //Lenar combo Platinium
    this.listPlatinium.push(new ModelCombo("1", "Kbps"));
    this.listPlatinium.push(new ModelCombo("2", "Mbps"));
    //Lenar combo Oro
    this.listOro.push(new ModelCombo("1", "Kbps"));
    this.listOro.push(new ModelCombo("2", "Mbps"));
    //Lenar combo plata
    this.listPlata.push(new ModelCombo("1", "Kbps"));
    this.listPlata.push(new ModelCombo("2", "Mbps"));
    //Lenar combo bronce
    this.listBronce.push(new ModelCombo("1", "Kbps"));
    this.listBronce.push(new ModelCombo("2", "Mbps"));
 */
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }/*
  crearNuevoServicio(id: number): ServicioElement {
    return {
      id: id, sede: '', direccion: '', ubigeo: '', geo: '', longitud: 0, latitud: 0,
      contacto: '', telefono: '', circuito: "", nrocircuito: "", servicio: "",
      medio: "", bw: "", nrobw: "", ldn: "", voz: "", nrovoz: "", video: "", nrovideo: "",
      platinium: "", nroplatinium: "", oro: "", nrooro: "", plata: "", nroplata: "", bronce: "", nrobronce: "",
      equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "",condicionenlace:""
    };
  }
  addRow(): void {
    this.dataSource.data.push(this.crearNuevoServicio(this.dataSource.data.length + 1));
    this.dataSource.filter = "";
  }
  */
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

    /*dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.dataSource.data.splice(this.dataSource.data.indexOf(item.id), 1);
        this.dataSource = new MatTableDataSource<ServicioElement>(dataSourceList);
      }
    });*/
  }
  geoDialog(item: any): void {
    console.log(item);
    const dialogRef = this.dialog.open(GeodialogComponent, {
      width: '500px',
      data: item
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      // if (confirmed) {
      //   const a = document.createElement('a');
      //   a.click();
      //   a.remove();
      //   this.dataSource.data.splice(this.dataSource.data.indexOf(item.id), 1);
      //   this.dataSource = new MatTableDataSource<ServicioElement>(dataSourceList);
      // }
    });
  }

  public filtrarData() {
     var obj = {
      oferta_id: this._filtro.oferta_id,
      page:this.pageIndex,
      size:this.pagesize.nativeElement.value
    }

    this.dataSource.filtrar(obj,this.pagesize.nativeElement.value);
  }

public addRow(){}


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
      });*/

  }

}
 /*
const dataSourceList: ServicioElement[] = [
 {
    id: 1, sede: 'Av. Argentina', direccion: 'puente camote', ubigeo: 'Callao. Callao, Callao',
    geo: 'Balanceador', longitud: 0, latitud: 0,
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "1", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "",condicionenlace:""
  },
  {
    id: 2, sede: 'Av. Argentina 2', direccion: 'san borja', ubigeo: 'Callao. Callao, Callao',
    geo: 'Balanceador', longitud: 0, latitud: 0,
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "",condicionenlace:""
  },
  {
    id: 3, sede: 'Av. Argentina 3', direccion: 'plaza norte', ubigeo: 'Callao. Callao, Callao',
    geo: 'Balanceador', longitud: -70.2190587197085, latitud: -17.9966159197085,
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal: "", router: "", facturacion: "", acccionisis: "", tipoenlace: "",condicionenlace:""
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
  condicionenlace:string;

}
export class ModelCombo {
  constructor(public id?: string, public nombre?: string) {
  }
}
 */

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
  totalPages:number=0;
  totalRegistros:number=0;
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
      if(sortedData.length == 0 && this._exampleDatabase.data['data'] !== undefined){this.loadingSubject.next(false);}

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