import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatrizEscalamientoService {

  constructor(private http: HttpClient) {
  }
  obtenermatrizescalamiento():Observable<any[]>{
    return this.http.get<any[]>('/finanzas/obtenermatrizescalamiento?oferta_id=1');    
  } 
  guardarmatrizescalamiento(data: any): Observable<any> {    
    return this.http.post<any>('/finanzas/guardarmatrizescalamiento', data);
  }
}