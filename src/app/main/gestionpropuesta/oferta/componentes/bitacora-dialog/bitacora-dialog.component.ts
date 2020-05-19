import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject,ViewChild,ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from   '@angular/cdk/collections';
import { BitacoraModel } from 'app/main/gestionpropuesta/models/oferta';
import { BitacoraDialogService } from './bitacora-dialog.service';


@Component({
  selector: 'app-bitacora-dialog',
  templateUrl: './bitacora-dialog.component.html',
  styleUrls: ['./bitacora-dialog.component.scss']
})
export class BitacoraDialogComponent implements OnInit {
  displayedColumns: string[] = ['estado', 'usuario', 'fecha'];
  bitacoraDatabase: BitacoraDialogService | null;
  dataSource: BitacoraDataSource | null;
  
  pageSize ="5";
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<BitacoraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpClient:HttpClient
    ) { 
      
    }  

  closeDialog() {
    this.dialogRef.close()
  }
  ngOnInit(): void {
    this.bitacoraDatabase = new BitacoraDialogService(this.httpClient);
    this.dataSource = new BitacoraDataSource(this.bitacoraDatabase, this.sort,
      {
        ofertas:{
          id:this.data.id
        }
      },this.pageSize,0);

  }

  changeSizeItems(items):void{
    this.dataSource._pageSize = items;
    this.dataSource.filter = "";
  }

}
export class BitacoraDataSource extends DataSource<BitacoraModel>{
  _filterChange = new BehaviorSubject('');
  filteredData: BitacoraModel[] = [];
  renderedData: BitacoraModel[] = [];
  totalPages:number = 0;

  paginar(page:number):void{
    this._pageIndex = this._pageIndex + page;
    this._filterChange.next('');
  }

  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(public bitacoraDatabase: BitacoraDialogService,    
      public _sort: MatSort,
      public _ofertaObj:any,
      public _pageSize:any,
      public _pageIndex: any) {
              super();
     
   }

   connect(): Observable<BitacoraModel[]> {
    const displayDataChanges = [
      this.bitacoraDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange
    ];

    this.bitacoraDatabase.getBitacoraAll(this._ofertaObj);

    return merge(...displayDataChanges).pipe(map(() => {
      
      let data_ = this.bitacoraDatabase.data || [];

      this.filteredData = data_.slice().filter((issue: BitacoraModel) => {
        const searchStr = (issue.estado.descripcion + issue.usuario.nombres  + issue.usuario.apellidos).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      const sortedData = this.sortData(this.filteredData.slice());
     
     this.renderedData = sortedData.splice(this._pageIndex * this._pageSize, this._pageSize);     
     this.totalPages = Math.ceil((this.filteredData.length / this._pageSize));
     
      return this.renderedData;
    }
    ));

  }

  disconnect() { }

  sortData(data: BitacoraModel[]): BitacoraModel[] {
    if (!this._sort.active || this._sort.direction === '') {
    
      return data;

    }
    
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'estado': [propertyA, propertyB] = [a.estado.descripcion, b.estado.descripcion]; break;
        case 'usuario': [propertyA, propertyB] = [a.usuario.nombres, b.usuario.nombres]; break;
        case 'fecha': [propertyA, propertyB] = [a.fecha, b.fecha]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      
      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}




