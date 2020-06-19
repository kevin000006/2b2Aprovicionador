import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject,ViewChild,ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from   '@angular/cdk/collections';
import { PlantaExternaModel, BitacoraModel } from 'app/main/gestionpropuesta/models/oferta';
import { BitacoraDialogService } from '../bitacora-dialog/bitacora-dialog.service';
import { PlantaExternaService } from './planta-externa.service';
import { CommonService } from 'app/common.service';

@Component({
  selector: 'app-planta-externa',
  templateUrl: './planta-externa.component.html',
  styleUrls: ['./planta-externa.component.scss']
})
export class PlantaExternaComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
    'selected','accion', 'circuito', 'operacion','item','cantidad','clasificacion','tipo',
    'marca','fabricante','modelo','descripcion','serie','propiedad'];
  bitacoraDatabase: PlantaExternaService | null;
  dataSource: BitacoraDataSource | null;
  selectedAll:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<PlantaExternaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpClient:HttpClient,
    private service :PlantaExternaService
    ) { 
      
    }  

    onCancel():void{
      this.dialogRef.close();
    }

    ngOnInit(): void {

      
        this.bitacoraDatabase = new PlantaExternaService(this.httpClient);
        this.dataSource = new BitacoraDataSource(this.bitacoraDatabase,this.sort,
          {
            oferta:{
              id:1
            }
          },5,0);
      
      

          
    
    }

}

export class BitacoraDataSource extends DataSource<PlantaExternaModel>{
  _filterChange = new BehaviorSubject('');
  filteredData: PlantaExternaModel[] = [];
  renderedData: PlantaExternaModel[] = [];
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

  constructor(public bitacoraDatabase: PlantaExternaService,    
      public _sort: MatSort,
      public _ofertaObj:any,
      public _pageSize:any,
      public _pageIndex: any) {
           super ();  
     
   }

   connect(): Observable<PlantaExternaModel[]> {
    const displayDataChanges = [
      this.bitacoraDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange
    ];

    this.bitacoraDatabase.getPlantaExternaAll(this._ofertaObj);

    return merge(...displayDataChanges).pipe(map(() => {
      
      let data_ = this.bitacoraDatabase.data || [];

      this.filteredData = data_.slice().filter((issue: PlantaExternaModel) => {
        const searchStr = (issue.accion + issue.circuito  + issue.clasificacion).toLowerCase();
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

  sortData(data: PlantaExternaModel[]): PlantaExternaModel[] {
    if (!this._sort.active || this._sort.direction === '') {
    
      return data;

    }
    
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'accion': [propertyA, propertyB] = [a.accion, b.accion]; break;
        case 'circuito': [propertyA, propertyB] = [a.circuito, b.circuito]; break;
        case 'clasificacion': [propertyA, propertyB] = [a.clasificacion, b.clasificacion]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      
      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
