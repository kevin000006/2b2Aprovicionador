import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ClienteModel,EstadoModel,ComplejidadModel,TipoContratoModel, TipoProyectoModel } from './model/Common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CommonService{
    
    constructor(private http: HttpClient) { }

    getClienteAll(): Observable<ClienteModel[]> {
        return this.http.post<ClienteModel[]>('/clientes/findAll', null);
    }
    
    getEstadoAll(): Observable<EstadoModel[]> {
        return this.http.post<EstadoModel[]>('/estadoRest/findAll', null);
    }

    getComplejidadAll(): Observable<ComplejidadModel[]> {
        return this.http.post<ComplejidadModel[]>('/complejidad/findAll', null);
    }

    getTipoContratoAll(): Observable<TipoContratoModel[]> {
        return this.http.post<TipoContratoModel[]>('/tipoContrato/findAll', null);
    }

    getTipoProyectoAll(): Observable<TipoProyectoModel[]> {
        return this.http.post<TipoProyectoModel[]>('/tipoproyecto/findAll', null);
    }

}
