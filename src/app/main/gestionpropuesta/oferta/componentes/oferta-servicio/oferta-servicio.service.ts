import { Injectable,Input } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';
import {OfertaDetalleModel} from '../../../models/oferta';
import { Guid } from "guid-typescript";
@Injectable({
  providedIn: 'root'
})
export class OfertaServicioService {

  dataChange: BehaviorSubject<OfertaDetalleModel[]> = new BehaviorSubject<OfertaDetalleModel[]>([]);
  totalDataBandeja:number=0;
  @Input() ofertaBase:any={}; 
  constructor(private http: HttpClient) { }
 
  get data(): OfertaDetalleModel[] {
    return this.dataChange.value;
  }

  
  
  getAllOfertaServicio(param: any): void {
  
   this.http.get<OfertaDetalleModel[]>('/ofertasDetalle/obtenerOfertasDetalle?'
    +'oferta_id=' + param.oferta_id + '&Pageable=' + param.page, {   }).subscribe(data => {


    /*  let urls = JSON.parse(window.localStorage.getItem('bandeja') || '[]');
      for(let rb of data['data']){
        let _codigo = Guid.create().toString().split('-').join('');;
        urls.push({
          codigo: _codigo,
          url:'gestion-propuesta/oferta',
          model: rb
        }); 

       /// rb.url =  'bandeja-redirect/' + _codigo;
      }*/

      ///window.localStorage.setItem('bandeja',JSON.stringify(urls));
            this.dataChange.next(data);

    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
        
      });

  }
  
}
