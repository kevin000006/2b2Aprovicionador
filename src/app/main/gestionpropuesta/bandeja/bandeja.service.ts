import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';
import { BandejaModel } from '../models/oferta';
import { Guid } from "guid-typescript";

@Injectable({
  providedIn: 'root'
})
export class BandejaService {
  dataChange: BehaviorSubject<BandejaModel[]> = new BehaviorSubject<BandejaModel[]>([]);
  totalDataBandeja:number=0;

  constructor(private http: HttpClient) { }

  get data(): BandejaModel[] {
    return this.dataChange.value;
  }

  getBandejaAll(param: any): void {

    //let formatoFecha = "yyyy/MM/dd";

    let params = new HttpParams();
    params = params.append('codoportunidad', param.codoportunidad || '');
    params = params.append('cliente', param.cliente || '');
    params = params.append('descripcion', param.descripcion || '');
    params = params.append('complejidad', param.complejidad || '');
    params = params.append('estado', param.estado || '');
    params = params.append('desde', param.desde || '');
    params = params.append('hasta', param.hasta || '');
    params = params.append('page', param.page || 0);
    params = params.append('size', param.size || 5);

    this.http.get<BandejaModel[]>('/oferta/obtenerofertas', { params: params }).subscribe(data => {

     
      let _data1 = new BandejaModel();
      _data1.codigo = '001';
      _data1.id = 1;
      _data1.oportunidad = 'PP0005';

      let urls = [];
      for(let rb of data['data']){
        let _codigo = Guid.create().toString().split('-').join('');;
        urls.push({
          codigo: _codigo,
          url:'gestion-propuesta/oferta',
          model: rb
        });

        rb.url =  'bandeja-redirect/' + _codigo;
      }

      window.localStorage.setItem('bandeja',JSON.stringify(urls));
     

      this.dataChange.next(data);

    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
        
      });

  }

 


}
