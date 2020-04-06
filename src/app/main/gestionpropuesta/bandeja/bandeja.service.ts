import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BandejaModel, ClienteModel, EstadoModel } from '../models/oferta';


@Injectable({
  providedIn: 'root'
})
export class BandejaService {
  private readonly urlBase:string = "https://webapp-b2b.azurewebsites.net/api"; 


  constructor(private http: HttpClient) { }

  getBandejaAll(): Observable<BandejaModel[]>{
    return this.http.get<BandejaModel[]>(this.urlBase + '/oferta/listOferta');
  }

  newOferta(data: BandejaModel):Observable<any>
  {
    return this.http.post<BandejaModel>(this.urlBase + '/oferta/saveOferta',data);
  }

  deleteOferta(data:BandejaModel):Observable<any>
  {
    return this.http.delete(this.urlBase + "/oferta/deleteOferta/" + data.id);
  }
  
  getClienteAll(): Observable<ClienteModel[]>{
    return this.http.get<ClienteModel[]>(this.urlBase + '/clientes/listClientes');
  }

  getEstadoAll(): Observable<EstadoModel[]>{
    return this.http.get<EstadoModel[]>(this.urlBase + '/estados/listEstados');
  }


}
