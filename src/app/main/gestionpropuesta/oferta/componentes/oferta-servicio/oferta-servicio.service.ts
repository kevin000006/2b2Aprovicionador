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
  ///api/condicionservicio/findAll

  listarCondicionServicios(): Observable<any> {
    return this.http.post<any>('/condicionservicio/findAll', {});
  }

  guardarservicios(data: any): Observable<any> {
    return this.http.post<any>('/ofertasDetalle/guardarservicios', data, {
      reportProgress: true,
      observe: 'events'
    });
  }


  obtenerOfertasDetalle(param: any): Observable<any> {    
    return this.http.get<OfertaDetalleModel[]>('/ofertasDetalle/obtenerOfertasDetalle?ofertaId=' + param.oferta_id + '&Pageable=' + param.page, {}).pipe(
      map(res => {
        var result: any = res;
        if (result.msj == "200") {
          result.data.map((element) => {
            //element.mostrarConcepto = element.nombre !== "" ? true : false;
            element.nombreGeolocalizacion;
            element.estado = -1;
            element.activo = true;
                        
            element.nrobwActualActual = element.bwActualActual !== null ? element.bwActualActual.split(" ")[1] : "";
            element.bwActualActual = element.bwActualActual !== null ? element.bwActualActual.split(" ")[0] : "";

            element.nrocaudalLdnActual = element.caudalLdnActual !== null ? element.caudalLdnActual.split(" ")[1] : "";
            element.caudalLdnActual = element.caudalLdnActual !== null ? element.caudalLdnActual.split(" ")[0] : "";

            element.nrocaudalVozActual = element.caudalVideoActual !== null ? element.caudalVideoActual.split(" ")[1] : "";
            element.caudalVideoActual = element.caudalVideoActual !== null ? element.caudalVideoActual.split(" ")[0] : "";

            element.nrocaudalVideoActual = element.caudalVozActual !== null ? element.caudalVozActual.split(" ")[1] : "";
            element.caudalVozActual = element.caudalVozActual !== null ? element.caudalVozActual.split(" ")[0] : "";

            element.nrocaudalPlatinumActual = element.caudalPlatinumActual !== null ? element.caudalPlatinumActual.split(" ")[1] : "";
            element.caudalPlatinumActual = element.caudalPlatinumActual !== null ? element.caudalPlatinumActual.split(" ")[0] : "";

            element.nrocaudalOroActual = element.caudalOroActual !== null ? element.caudalOroActual.split(" ")[1] : "";
            element.caudalOroActual = element.caudalOroActual !== null ? element.caudalOroActual.split(" ")[0] : "";

            element.nrocaudal_plata_actual = element.caudal_plata_actual !== null ? element.caudal_plata_actual.split(" ")[1] : "";
            element.caudal_plata_actual = element.caudal_plata_actual !== null ? element.caudal_plata_actual.split(" ")[0] : "";

            element.nrocaudalBronceActual = element.caudalBronceActual !== null ? element.caudalBronceActual.split(" ")[1] : "";
            element.caudalBronceActual = element.caudalBronceActual !== null ? element.caudalBronceActual.split(" ")[0] : "";

            element.nrobwPropuesto = element.bwPropuesto !== null ? element.bwPropuesto.split(" ")[1] : "";
            element.bwPropuesto = element.bwPropuesto !== null ? element.bwPropuesto.split(" ")[0] : "";

            element.nrocaudalLdnPropuesto = element.caudalLdnPropuesto !== null ? element.caudalLdnPropuesto.split(" ")[1] : "";
            element.caudalLdnPropuesto = element.caudalLdnPropuesto !== null ? element.caudalLdnPropuesto.split(" ")[0] : "";

            element.nrocaudalVozPropuesto = element.caudalVozPropuesto !== null ? element.caudalVozPropuesto.split(" ")[1] : "";
            element.caudalVozPropuesto = element.caudalVozPropuesto !== null ? element.caudalVozPropuesto.split(" ")[0] : "";

            element.nrocaudalVideoPropuesto = element.caudalVideoPropuesto !== null ? element.caudalVideoPropuesto.split(" ")[1] : "";
            element.caudalVideoPropuesto = element.caudalVideoPropuesto !== null ? element.caudalVideoPropuesto.split(" ")[0] : "";

            element.nrocaudalPlatinumPropuesto = element.caudalPlatinumPropuesto !== null ? element.caudalPlatinumPropuesto.split(" ")[1] : "";
            element.caudalPlatinumPropuesto = element.caudalPlatinumPropuesto !== null ? element.caudalPlatinumPropuesto.split(" ")[0] : "";

            element.nrocaudalOroPropuesto = element.caudalOroPropuesto !== null ? element.caudalOroPropuesto.split(" ")[1] : "";
            element.caudalOroPropuesto = element.caudalOroPropuesto !== null ? element.caudalOroPropuesto.split(" ")[0] : "";

            element.nrocaudalPlataPropuesto = element.caudalPlataPropuesto !== null ? element.caudalPlataPropuesto.split(" ")[1] : "";
            element.caudalPlataPropuesto = element.caudalPlataPropuesto !== null ? element.caudalPlataPropuesto.split(" ")[0] : "";

            element.transmision = !element.transmision ? 0 : element.transmision;
            element.planta_externa = !element.planta_externa ? 0 : element.planta_externa;

            element.nrocaudalBroncePropuesto = element.caudalBroncePropuesto !== null ? element.caudalBroncePropuesto.split(" ")[1] : "";
            element.caudalBroncePropuesto = element.caudalBroncePropuesto !== null ? element.caudalBroncePropuesto.split(" ")[0] : "";
            if( element.zonaSisego && element.zonaSisego != 'Residual'){
              element.IdZonaSigego = 1;
              element.lstZonaSisego  = [{ id: 1, nombre: element.zonaSisego }]
            }else if(element.zonaSisego && element.zonaSisego == 'Residual'){
              element.IdZonaSigego = -1;
              element.lstZonaSisego  = [{ id: -1, nombre: element.zonaSisego }]
            }else{
              element.IdZonaSigego = 0;
            }
            
            return element;
          });
          return result.data;
        }
        return null;
      })
    );
  }
}
