import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';
import { BitacoraModel } from '../models/oferta';

@Injectable({
    providedIn: 'root'
})

export class OfertaService{

    constructor(private http: HttpClient) { }

    generarUrl(param):Observable<string>{
       return this.http.post<string>('/compartirurl/save',param);
    }

    getShared(param):Observable<any>{
        return this.http.post<any>('/compartirurl/findQuery',param);
     }

   


}


