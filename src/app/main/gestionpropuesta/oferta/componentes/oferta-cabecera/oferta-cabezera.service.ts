
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OfertaModel,ClienteModel} from '../../../models/oferta';
import { SearchClassicComponent } from 'app/main/pages/search/classic/search-classic.component';

@Injectable({
    providedIn: 'root'
  })

export class OfertaCabezeraService {

    constructor(private http: HttpClient) { }

    getOfertaById(param): Observable<OfertaModel>
    {
       return  this.http.get<OfertaModel>('/oferta/findById/'+param,{});
    }

    getClientesSearch(search:any):Observable<ClienteModel[]>{
      return this.http.get<ClienteModel[]>('/clientes/obtenerclientes?search=' + search,{});
    }



}