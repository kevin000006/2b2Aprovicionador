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
    params = params.append('page', param.page || 1);
    params = params.append('size', param.size || 5);
    params = params.append('sort', '');
    params = params.append('cliente', param.cliente || '');
    params = params.append('codoportunidad', param.codoportunidad || '');
    params = params.append('complejidad', param.complejidad || '');
    params = params.append('descripcion', param.descripcion || '');
    params = params.append('desde', param.desde || '');
    params = params.append('estado', param.estado || '');
    params = params.append('hasta', param.hasta || '');
   


    this.http.get<BandejaModel[]>('/oferta/obtenerofertas', { params: params }).subscribe(data => {


      let urls = JSON.parse(window.localStorage.getItem('bandeja') || '[]');
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

  accionOferta(url:string,param:any):Observable<any>{
    return this.http.post(url+'?ofertaId=' + param.ofertaId + '&usuario=' + param.usuario + '&usuarioId=' + param.usuarioId  , param);
  }

}
