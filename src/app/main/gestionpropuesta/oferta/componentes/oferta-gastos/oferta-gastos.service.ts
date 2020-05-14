import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, empty } from 'rxjs';
import { OfertaOpex  } from '../../../../../model/Common';
import { map } from 'rxjs/operators';
@Injectable()
export class OfertaGastosService {

    constructor(private http: HttpClient) { }

    getAllOfertaOpex(): Observable<any> {
        
        return this.http.post<any>('/ofertaopex/findAll', {});
    }
    obtenerOfertasOpex(id: number): Observable<OfertaOpex[]> {        
        return this.http.get<OfertaOpex[]>('/ofertaopex/obtenerOfertasOpex?ofertaId=' + id).pipe(
            map(res => {                
                var result: any = res;
                if(result.msj=="200")
                    return result.data;
                return null;              
            })
        );
    }
    listarConceptoOpex(): Observable<any> {
        return this.http.post<any>('/ConceptosOpex/findAll',{});
    }    
}

