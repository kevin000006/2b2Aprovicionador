import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ClienteModel,EstadoModel,ComplejidadModel,TipoContratoModel, TipoProyectoModel,
    TipoServicioModel,ViaAccesoModel,TipoInstalacionSatelitalModel,EquipamientoMarcaModel,EquipamientoCondicionModel,
    SisegoCondicionModel,ConceptosOpexModel,TipoEnlaceModel,CondicionEnlaceModel,
    TipoCircuitoModel,MonedaModel,AccionIsisModel, TipoEquipamientoModel, AnalistaFinancieroModel
} from './model/Common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CommonService{
    
    constructor(private http: HttpClient) { }

    getTipoAdjuntoAll():Observable<any[]>{
        return this.http.post<ClienteModel[]>('/tipoadjuntos/findAll', null);
    }

    getMotivoRechazoAll():Observable<any[]>{
        return this.http.post<ClienteModel[]>('/motivorechazo/findAll', null);
    }

    getCostoEspecialAll():Observable<any[]>{
        return this.http.post<ClienteModel[]>('/costosespeciales/findAll', null);
    }

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

    getTipoServicioAll(): Observable<TipoServicioModel[]> {
        return this.http.post<TipoServicioModel[]>('/TipoServicio/findAll', null);
    }
   /* getTipoInstalacionSatelitalModelAll(): Observable<TipoInstalacionSatelitalModel[]> {
        return this.http.post<TipoInstalacionSatelitalModel[]>('/tipoinstalacionsatelital/findAll', null);
    }*/
    getViaAccesoAll(): Observable<ViaAccesoModel[]> {
        return this.http.post<ViaAccesoModel[]>('/ViaAcceso/findAll', null);
    }
    /*getVelocidadesAll(): Observable<VelocidadesModel[]> {
        return this.http.post<VelocidadesModel[]>('/velocidades/findAll', null);
    }*/
    getEquipamientoMarcaAll(): Observable<EquipamientoMarcaModel[]> {
        return this.http.post<EquipamientoMarcaModel[]>('/equipamientomarca/findAll', null);
    }
    getEquipamientoCondicionAll(): Observable<EquipamientoCondicionModel[]> {
        return this.http.post<EquipamientoCondicionModel[]>('/equipamientocondicion/findAll', null);
    }
    getSisegoCondicionAll(): Observable<SisegoCondicionModel[]> {
        return this.http.post<SisegoCondicionModel[]>('/sisegocondicion/findAll', null);
    }
     getConceptoOpexAll(): Observable<ConceptosOpexModel[]> {
        return this.http.post<ConceptosOpexModel[]>('/conceptoopex/findAll', null);
    }
    getTipoEnlaceAll(): Observable<TipoEnlaceModel[]> {
        return this.http.post<TipoEnlaceModel[]>('/tipoenlace/findAll', null);
    }
    getCondicionEnlaceAll(): Observable<CondicionEnlaceModel[]> {
        return this.http.post<CondicionEnlaceModel[]>('/condicionenlace/findAll', null);
    } 
    getTipoCircuitoAll(): Observable<TipoCircuitoModel[]> {
        return this.http.post<TipoCircuitoModel[]>('/tipoCircuito/findAll', null);
    } 
    getTipoMonedaAll(): Observable<MonedaModel[]> {
        return this.http.post<MonedaModel[]>('/moneda/findAll', null);
    } 
    getAccionIsisAll(): Observable<AccionIsisModel[]> {
        return this.http.post<AccionIsisModel[]>('/accionIsis/findAll', null);
    } 

    getTipoEquipamiento():Observable<TipoEquipamientoModel[]>{
        return this.http.post<TipoEquipamientoModel[]>('/tipoequipamiento/findAll',null);
    }
     
    buscardistrito(search : string): Observable<any> {    
        return this.http.get<any>('/ofertasDetalle/buscardistrito?search=' + search);
    } 

    getAllAnalistasFinanciero():Observable<AnalistaFinancieroModel[]>{
        return this.http.post<AnalistaFinancieroModel[]>('/analistaFinaciero/findAll',null);
    }

}
