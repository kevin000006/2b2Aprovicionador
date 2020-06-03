import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CMIService {

  constructor(private http: HttpClient) {
  }
  obtenercmi(ofertaId:number):Observable<any[]>{
    return this.http.get<any[]>('/finanzas/obtenercmi?oferta_id=' + ofertaId);
  }
}