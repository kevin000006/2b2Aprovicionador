import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {DatePipe } from '@angular/common' 
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BandejaService } from './bandeja.service';
import { CommonService } from '../../../common.service';
import { BandejaModel } from '../models/oferta';
import { ComplejidadModel,EstadoModel } from '../../../model/Common';
import { DataSource } from '@angular/cdk/collections';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as Cookies from 'js-cookie';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  animations: fuseAnimations,
  styleUrls: ['./bandeja.component.scss'],
  providers:[
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    DatePipe
  ]
})

export class BandejaComponent implements OnInit {

  _filtro: any = { 
    odoportunidad: '', 
    cliente: '', 
    descripcion: '', 
    complejidad:'', 
    estado:'', 
    desde: '', 
    hasta:''
   };
  pageIndex:number=0;
  fileName = 'bandeja_oferta.xlsx';

  lstBandeja = new Array<BandejaModel>();
  lstComplejidad = new Array<ComplejidadModel>();
  lstEstado = new Array<EstadoModel>();
  checked = false;
  visible_filtro = false;
  self = null;

  displayedColumns: string[] = ['codigo', 'version', 'oportunidad', 'cliente', 'descripcion', 'estado','menu'];
  exampleDatabase: BandejaService | null;
  dataSource: EjemploDataSource | null;
  index: number;
  id: number;
  currentUser: any = { nombres: '', apellidos: '', nombrecorto: '' };;

  constructor(public httpClient: HttpClient,
    private bandejaService: BandejaService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private _router: Router,
    public datepipe: DatePipe) {
    this.commonService.getComplejidadAll()
      .subscribe(data => this.lstComplejidad = data);

    this.commonService.getEstadoAll()
      .subscribe(data => this.lstEstado = data);

  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild('pagesize', { static: true }) pagesize: ElementRef;

  ngOnInit(): void {

    if (Cookies.get('currentUser') === undefined) {
      this._router.navigate(['pages/auth/login-2'], { state: {} });
    }
    else {
      this.currentUser = JSON.parse(Cookies.get('currentUser'));
      this.loadData();
      
    }
  }

  public descargar_excel() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);


    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  public paginar(accion:number){
    this.pageIndex = this.pageIndex + accion;
    this.filtrarData();
  }

  public limpiar():void{

    this._filtro.codoportunidad = '';
    this._filtro.cliente = '';
    this._filtro.descripcion= '';
    this._filtro.complejidad='';
    this._filtro.estado= '';
    this._filtro.desde='';
    this._filtro.hasta='';

  }

  public filtrarData() {

    let _desde = '', _hasta = '';
    if(this._filtro.desde != null && this._filtro.desde !== undefined)
      _desde = this.datepipe.transform(this._filtro.desde,'yyyy/MM/dd');
    

    if(this._filtro.hasta != null && this._filtro.hasta !== undefined)
      _hasta = this.datepipe.transform(this._filtro.hasta,'yyyy/MM/dd');
   

    var obj = {
      codoportunidad: this._filtro.codoportunidad,
      cliente: this._filtro.cliente,
      descripcion: this._filtro.descripcion,
      complejidad:this._filtro.complejidad,
      estado: this._filtro.estado,
      desde: _desde,
      hasta: _hasta,
      page:this.pageIndex,
      size:this.pagesize.nativeElement.value
    }

    this.dataSource.filtrar(obj,this.pagesize.nativeElement.value);
  }

  public loadData() {
    this.exampleDatabase = new BandejaService(this.httpClient);

    //this.dataSource = new EjemploDataSource(this.exampleDatabase, this.paginator, this.sort);
    this.dataSource = new EjemploDataSource(this.exampleDatabase, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });

      fromEvent(this.pagesize.nativeElement, 'change')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.filtrarData();
      });

  }

    

}

export class EjemploDataSource extends DataSource<BandejaModel>{
  _filterChange = new BehaviorSubject('');
  pageSize = 5;

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filtrar(param, size) {
    this._exampleDatabase.getBandejaAll(param);
    this.pageSize = size || 5;
  }
  totalPages:number=0;
  totalRegistros:number=0;
  filteredData: BandejaModel[] = [];
  renderedData: BandejaModel[] = [];

  constructor(public _exampleDatabase: BandejaService,
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
     // this._paginator.page
    ];

    this._exampleDatabase.getBandejaAll({});

    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      let data_ = this._exampleDatabase.data['data'] || [];
      this.filteredData = data_.slice().filter((issue: BandejaModel) => {
        const searchStr = (issue.version + issue.codigo + issue.cliente + issue.oportunidad + issue.descripcion).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      
     // const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
     // this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
     this.renderedData = sortedData.splice(0, 100);
     
      this.totalRegistros = this._exampleDatabase.data['rows'] || 0;

     this.totalPages = Math.ceil((this.totalRegistros / this.pageSize));

      return this.renderedData;
    }
    ));

  }

  disconnect() { }

  sortData(data: BandejaModel[]): BandejaModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'codigo': [propertyA, propertyB] = [a.codigo, b.codigo]; break;
        case 'version': [propertyA, propertyB] = [a.version, b.version]; break;
        case 'oportunidad': [propertyA, propertyB] = [a.oportunidad, b.oportunidad]; break;
        case 'cliente': [propertyA, propertyB] = [a.cliente, b.cliente]; break;
        case 'descripcion': [propertyA, propertyB] = [a.descripcion, b.descripcion]; break;
        case 'estado': [propertyA, propertyB] = [a.estado, b.estado]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}