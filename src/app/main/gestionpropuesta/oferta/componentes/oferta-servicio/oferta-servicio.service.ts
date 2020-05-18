import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';
import { OfertaDetalleModel } from '../../../models/oferta';
import { Guid } from "guid-typescript";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OfertaServicioService {

  dataChange: BehaviorSubject<OfertaDetalleModel[]> = new BehaviorSubject<OfertaDetalleModel[]>([]);
  totalDataBandeja: number = 0;
  @Input() ofertaBase: any = {};
  constructor(private http: HttpClient) { }

  get data(): OfertaDetalleModel[] {
    return this.dataChange.value;
  }
  obtenerOfertasDetalle(param: any): Observable<any> {
    return this.http.get<OfertaDetalleModel[]>('/ofertasDetalle/obtenerOfertasDetalle?oferta_id=' + param.oferta_id + '&Pageable=' + param.page, {}).pipe(
      map(res => {
        var result: any = res;
        if (result.msj == "200") {
            result.data.map((element) => {
                //element.mostrarConcepto = element.nombre !== "" ? true : false;
                 element.nombreGeolocalizacion;
                 element.estado = -1;
                 element.activo = true;
                // element.activo = true;
                return element;
            });
            return result.data;
        }
        return null;
      })
    );
  }
}
