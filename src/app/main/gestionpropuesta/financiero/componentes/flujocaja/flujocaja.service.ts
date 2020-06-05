import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlujoCajaModel } from '../../../models/oferta';
@Injectable({
  providedIn: 'root'
})
export class FlujoCajaService {

  constructor(private http: HttpClient) { }
  Obtenerflujocaja(ofertaId: number): Observable<FlujoCajaModel[]> {    
    return this.http.get<FlujoCajaModel[]>('/finanzas/obtenerflujocaja?ofertaId=' + ofertaId);
  }
  guardarparametrooferta(data: any): Observable<any> {    
    return this.http.post<any>('/finanzas//api/finanzas/guardarparametrooferta',data);
  }
}