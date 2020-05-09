import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';

@Injectable()
export class OfertaGastosService{

    constructor(private http: HttpClient) { }

     getAllOfertaOpex():Observable<any>{
         //return this.http.get<any>('/ofertaopex/findAll');
         return this.http.post<any>('/ofertaopex/findAll', {  }); 
     }
}