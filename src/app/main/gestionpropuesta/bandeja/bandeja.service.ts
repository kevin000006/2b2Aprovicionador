import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';
import { BandejaModel, ClienteModel, EstadoModel } from '../models/oferta';

@Injectable({
  providedIn: 'root'
})
export class BandejaService {
  dataChange: BehaviorSubject<BandejaModel[]> = new BehaviorSubject<BandejaModel[]>([]);
  totalDataBandeja:number=0;

  constructor(private http: HttpClient) { }

  get data(): BandejaModel[] {
    return this.dataChange.value;
  }

  getBandejaAll(param: any): void {

    let formatoFecha = "yyyy/MM/dd";

    let params = new HttpParams();
    params = params.append('codoportunidad', param.codoportunidad || '');
    params = params.append('cliente', param.cliente || '');
    params = params.append('descripcion', param.descripcion || '');
    params = params.append('complejidad', param.complejidad || '');
    params = params.append('estado', param.estado || '');
    params = params.append('desde', param.desde || '');
    params = params.append('hasta', param.hasta || '');
    params = params.append('page', param.page || 0);
    params = params.append('size', param.size || 5);

    this.http.get<BandejaModel[]>('/oferta/obtenerofertas', { params: params }).subscribe(data => {

      let _data = new BandejaModel();
     

      this.dataChange.next(data);

    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  newOferta(data: BandejaModel): Observable<any> {
    return this.http.post<BandejaModel>('/oferta/saveOferta', data);
  }

  deleteOferta(data: BandejaModel): Observable<any> {
    return this.http.delete("/oferta/deleteOferta/" + data.id);
  }

  getClienteAll(): Observable<ClienteModel[]> {
    return this.http.post<ClienteModel[]>('/clientes/findAll', null);
  }

  getEstadoAll(): Observable<EstadoModel[]> {
    return this.http.post<EstadoModel[]>('/estadoRest/findAll', null);
  }


}
