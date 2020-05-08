
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OfertaModel} from '../../../models/oferta';

@Injectable({
    providedIn: 'root'
  })

export class OfertaCabezeraService {

    constructor(private http: HttpClient) { }

    getOfertaById(param): Observable<OfertaModel>
    {
       return  this.http.get<OfertaModel>('/oferta/findById/'+param,{});
    }

}