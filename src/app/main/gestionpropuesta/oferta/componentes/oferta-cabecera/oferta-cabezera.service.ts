
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OfertaModel,ClienteModel,OportunidadModel} from '../../../models/oferta';
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

    getOportunidadSearch(search:any):Observable<OportunidadModel[]>{
      return this.http.get<OportunidadModel[]>('/oportunidad/obteneroportunidad?search=' + search,{});
    }

    guardarOferta(param):Observable<number>{

        return this.http.post<number>('/oferta/guardaroferta' ,param);
    }

    enviarIsis(oferta:any):Observable<any>{
      return this.http.post('/isis/enviartrama?oferta_id=' + oferta,{});
    }

    derivarOferta(param:any):Observable<any>{
      return this.http.post('/oferta/_derivaroferta?ofertaId=' + param.ofertaId + '&usuarioId=' + param.usuarioId ,{});
    }

    asignarOfertAF(param):Observable<any>{
      return this.http.post('/oferta/_asignaraf?analistafinancieroId=' + param.analistafinancieroId + '&ofertaId=' + param.ofertaId + '&usuarioId=' + param.usuarioId ,{});
    }

    devolverOfertaPreventa(param):Observable<any>{
      return this.http.post('/oferta/_devolverpv?ofertaId=' + param.ofertaId + '&usuarioId=' + param.usuarioId ,{});
    }

}