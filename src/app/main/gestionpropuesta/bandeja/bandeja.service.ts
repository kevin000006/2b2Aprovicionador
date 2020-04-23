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

  getBandejaAll(): void {
    this.http.get<BandejaModel[]>(this.urlBase + '/oferta/list').subscribe(data => {

      /*  for (var _i = 0; _i < 8; _i++) {
          var _data = new BandejaModel;
          _data.cliente = new ClienteModel;
          _data.codigo = "OTE000003" + _i;
          _data.oportunidad ="PER-00230730" + _i;
          _data.descripcion = "descripción " + _i;
            _data.cliente.descripcion = "cliente " +_i;
            _data.estado = new EstadoModel;
            _data.estado.descripcion = "estado " + _i;
            _data.version = _i;
          data.push(_data);
        }*/
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
    return this.http.get<ClienteModel[]>(this.urlBase + '/clientes/list');
  }

  getEstadoAll(): Observable<EstadoModel[]> {
    return this.http.get<EstadoModel[]>(this.urlBase + '/estadoRest/list');
  }


}
