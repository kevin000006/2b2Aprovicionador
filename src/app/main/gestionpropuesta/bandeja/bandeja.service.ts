import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BandejaModel, ClienteModel, EstadoModel } from '../models/oferta';
import { fuseConfig } from '../../../fuse-config'

@Injectable({
  providedIn: 'root'
})
export class BandejaService {
  private readonly urlBase: string = fuseConfig.corsUrl + "https://webapp-b2b.azurewebsites.net/api";
  dataChange: BehaviorSubject<BandejaModel[]> = new BehaviorSubject<BandejaModel[]>([]);


  constructor(private http: HttpClient) { }

  get data(): BandejaModel[] {
    return this.dataChange.value;
  }

  getBandejaAll(param:any): void {
    this.http.post<BandejaModel[]>(this.urlBase + '/oferta/findQuery',param || {}).subscribe(data => {

      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  newOferta(data: BandejaModel): Observable<any> {
    return this.http.post<BandejaModel>(this.urlBase + '/oferta/saveOferta', data);
  }

  deleteOferta(data: BandejaModel): Observable<any> {
    return this.http.delete(this.urlBase + "/oferta/deleteOferta/" + data.id);
  }

  getClienteAll(): Observable<ClienteModel[]> {
    return this.http.post<ClienteModel[]>(this.urlBase + '/clientes/findAll',null);
  }

  getEstadoAll(): Observable<EstadoModel[]> {
    return this.http.post<EstadoModel[]>(this.urlBase + '/estadoRest/findAll',null);
  }


}
