import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class OfertaService{

    constructor(private http: HttpClient) { }

    generarUrl(param):Observable<string>{
       return this.http.post<string>('http://localhost:3000/api/share/save',param);
    }

    getShared(param):Observable<any>{
        return this.http.post<any>('http://localhost:3000/api/share/find',param);
     }

}


