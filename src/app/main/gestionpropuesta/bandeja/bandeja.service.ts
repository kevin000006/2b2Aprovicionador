import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BandejaModel, ClienteModel, EstadoModel } from '../models/oferta';

@Injectable({
  providedIn: 'root'
})
export class BandejaService {
  dataChange: BehaviorSubject<BandejaModel[]> = new BehaviorSubject<BandejaModel[]>([]);


  constructor(private http: HttpClient) { }

  get data(): BandejaModel[] {
    return this.dataChange.value;
  }

  getBandejaAll(param:any): void {
    this.http.post<BandejaModel[]>( '/oferta/findQuery',param || {}).subscribe(data => {

      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  newOferta(data: BandejaModel): Observable<any> {
    return this.http.post<BandejaModel>( '/oferta/saveOferta', data);
  }

  deleteOferta(data: BandejaModel): Observable<any> {
    return this.http.delete( "/oferta/deleteOferta/" + data.id);
  }

  getClienteAll(): Observable<ClienteModel[]> {
    return this.http.post<ClienteModel[]>( '/clientes/findAll',null);
  }

  getEstadoAll(): Observable<EstadoModel[]> {
    return this.http.post<EstadoModel[]>( '/estadoRest/findAll',null);
  }


}
