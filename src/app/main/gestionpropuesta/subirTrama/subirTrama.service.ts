import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BandejaModel, ClienteModel, EstadoModel } from '../models/oferta';


@Injectable({
  providedIn: 'root'
})
export class SubirTramaService {
  private readonly urlBase: string = "https://cors-anywhere.herokuapp.com/https://webapp-b2b.azurewebsites.net/api";
  constructor(private http: HttpClient) { }  

  GuardarArchivo(data: any): Observable<any> {
    return this.http.post<BandejaModel>(this.urlBase + '/oferta/saveOferta', data);
  }
}
