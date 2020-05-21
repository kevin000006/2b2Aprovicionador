import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  guardarservicios(data: any): Observable<any> {
    return this.http.post<any>('/ofertasDetalle/guardarservicios', data, {
      reportProgress: true,
      observe: 'events'
    });
  }
  obtenerOfertasDetalle(param: any): Observable<any> {
    debugger;
    return this.http.get<OfertaDetalleModel[]>('/ofertasDetalle/obtenerOfertasDetalle?ofertaId=' + param.oferta_id + '&Pageable=' + param.page, {}).pipe(
      map(res => {
        var result: any = res;
        if (result.msj == "200") {
            result.data.map((element) => {
                //element.mostrarConcepto = element.nombre !== "" ? true : false;
                 element.nombreGeolocalizacion;
                 element.estado = -1;
                 element.activo = true;
                 
                 element.nrobwActualActual = element.bwActualActual!=="" ? element.bwActualActual.split(" ")[1]: "";
                 element.bwActualActual = element.bwActualActual!=="" ? element.bwActualActual.split(" ")[0]: "";

                 element.nrocaudalLdnActual = element.nrocaudalLdnActual!=="" ? element.nrocaudalLdnActual.split(" ")[1]: "";
                 element.caudalLdnActual = element.caudalLdnActual!=="" ? element.caudalLdnActual.split(" ")[0]: "";

                 element.nrocaudalVozActual = element.nrocaudalVozActual!=="" ? element.nrocaudalVozActual.split(" ")[1]: "";
                 element.caudalVideoActual = element.caudalVideoActual!=="" ? element.caudalVideoActual.split(" ")[0]: "";
                 
                 element.nrocaudalVideoActual = element.nrocaudalVideoActual!=="" ? element.nrocaudalVideoActual.split(" ")[1]: "";
                 element.caudalVozActual = element.caudalVozActual!=="" ? element.caudalVozActual.split(" ")[0]: "";

                 element.nrocaudalPlatinumActual = element.nrocaudalPlatinumActual!=="" ? element.nrocaudalPlatinumActual.split(" ")[1]: "";
                 element.caudalPlatinumActual = element.caudalPlatinumActual!=="" ? element.caudalPlatinumActual.split(" ")[0]: "";

                 element.nrocaudalOroActual = element.nrocaudalOroActual!=="" ? element.nrocaudalOroActual.split(" ")[1]: "";
                 element.caudalOroActual = element.caudalOroActual!=="" ? element.caudalOroActual.split(" ")[0]: "";

                 element.nrocaudal_plata_actual = element.nrocaudal_plata_actual!=="" ? element.nrocaudal_plata_actual.split(" ")[1]: "";
                 element.caudal_plata_actual = element.caudal_plata_actual!=="" ? element.caudal_plata_actual.split(" ")[0]: "";

                 element.nrocaudalBronceActual = element.nrocaudalBronceActual!=="" ? element.nrocaudalBronceActual.split(" ")[1]: "";
                 element.caudalBronceActual = element.caudalBronceActual!=="" ? element.caudalBronceActual.split(" ")[0]: "";




                 element.nrobwPropuesto = element.nrobwPropuesto!=="" ? element.nrobwPropuesto.split(" ")[1]: "";
                 element.bwPropuesto = element.bwPropuesto!=="" ? element.bwPropuesto.split(" ")[0]: "";

                 element.nrocaudalLdnPropuesto = element.nrocaudalLdnPropuesto!=="" ? element.nrocaudalLdnPropuesto.split(" ")[1]: "";
                 element.caudalLdnPropuesto = element.caudalLdnPropuesto!=="" ? element.caudalLdnPropuesto.split(" ")[0]: "";

                 element.nrocaudalVozPropuesto = element.nrocaudalVozPropuesto!=="" ? element.nrocaudalVozPropuesto.split(" ")[1]: "";
                 element.caudalVozPropuesto = element.caudalVozPropuesto!=="" ? element.caudalVozPropuesto.split(" ")[0]: "";

                 element.nrocaudalVideoPropuesto = element.nrocaudalVideoPropuesto!=="" ? element.nrocaudalVideoPropuesto.split(" ")[1]: "";
                 element.caudalVideoPropuesto = element.caudalVideoPropuesto!=="" ? element.caudalVideoPropuesto.split(" ")[0]: "";

                 element.nrocaudalPlatinumPropuesto = element.nrocaudalPlatinumPropuesto!=="" ? element.nrocaudalPlatinumPropuesto.split(" ")[1]: "";
                 element.caudalPlatinumPropuesto = element.caudalPlatinumPropuesto!=="" ? element.caudalPlatinumPropuesto.split(" ")[0]: "";

                 element.nrocaudalOroPropuesto = element.nrocaudalOroPropuesto!=="" ? element.nrocaudalOroPropuesto.split(" ")[1]: "";
                 element.caudalOroPropuesto = element.caudalOroPropuesto!=="" ? element.caudalOroPropuesto.split(" ")[0]: "";

                 element.nrocaudalPlataPropuesto = element.nrocaudalPlataPropuesto!=="" ? element.nrocaudalPlataPropuesto.split(" ")[1]: "";
                 element.caudalPlataPropuesto = element.caudalPlataPropuesto!=="" ? element.caudalPlataPropuesto.split(" ")[0]: "";

                 element.nrocaudalBroncePropuesto = element.nrocaudalBroncePropuesto!=="" ? element.nrocaudalBroncePropuesto.split(" ")[1]: "";
                 element.caudalBroncePropuesto = element.caudalBroncePropuesto!=="" ? element.caudalBroncePropuesto.split(" ")[0]: "";
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
