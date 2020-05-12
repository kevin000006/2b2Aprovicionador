import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';
import {OfertaDetalleModel} from '../../../models/oferta';
@Injectable({
  providedIn: 'root'
})
export class OfertaServicioService {

  constructor(private http: HttpClient) { }

    getAllOfertaServicio(param):Observable<OfertaDetalleModel>{
      return this.http.post<OfertaDetalleModel>('/ofertasDetalle/obtenerOfertasDetalle'+param, {  }); 
  }

  
}
