import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';
import { BitacoraModel } from 'app/main/gestionpropuesta/models/oferta';

@Injectable({
    providedIn: 'root'
  })

export class BitacoraDialogService{

  dataChange: BehaviorSubject<BitacoraModel[]> = new BehaviorSubject<BitacoraModel[]>([]);

  constructor(private http: HttpClient) { }

  get data(): BitacoraModel[] {
    return this.dataChange.value;
  }

  getBitacoraAll(param:any):void{
      this.http.post<BitacoraModel[]>('/bitacora/findQuery',param).subscribe(data => {
        this.dataChange.next(data);
      });
  }


}


