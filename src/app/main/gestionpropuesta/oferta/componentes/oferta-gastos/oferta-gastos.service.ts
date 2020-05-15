import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';
import { OfertaOpex } from '../../../../../model/Common';
import { map } from 'rxjs/operators';
// import * as _ from 'lodash';
@Injectable()
export class OfertaGastosService {

    constructor(private http: HttpClient) { }

    getAllOfertaOpex(): Observable<any> {

        return this.http.post<any>('/ofertaopex/findAll', {});
    }
    obtenerOfertasOpex(id: number): Observable<any> {
        return this.http.get<any>('/ofertaopex/obtenerOfertasOpex?ofertaId=' + id).pipe(
            map(res => {
                var result: any = res;
                if (result.msj == "200") {
                    result.data.map((element) => {
                        element.mostrarConcepto = element.nombre !== "" ? true : false;
                        element.estado = -1;
                        element.activo = true;
                        return element;
                    });
                    return result.data;
                }
                return null;
            })
        );
    }
    guardarGastos(data: any): Observable<any> {
        return this.http.post<any>('/ofertaopex/guardargastos', data, {
            reportProgress: true,
            observe: 'events'
        });
    }
    ///api/ofertaopex/saveAll
    listarConceptoOpex(): Observable<any> {
        return this.http.post<any>('/ConceptosOpex/findAll', {});
    }
}

