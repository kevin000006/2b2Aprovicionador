import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfertaEquipamientoModel } from 'app/main/gestionpropuesta/models/oferta';

@Injectable({
  providedIn: 'root'
})
export class EquipamientoService {

  constructor(private http: HttpClient) {
  }


  getEquipamientoForOfeta(oferta:number):Observable<OfertaEquipamientoModel[]>{
    const obj={ofertas:{id:9}};
    return this.http.post<OfertaEquipamientoModel[]>('/ofertacapex/findQuery',obj);
  }

  findAllEquipamientoMarca(): Observable<any> {
    return this.http.post<any>('/EquipamientoMarca/findAll/', {});
  }
  findAllEquipamientoCondicion(): Observable<any> {
    return this.http.post<any>('/EquipamientoCondicion/findAll/', {});
  }  
  listFilesContainers(request:any): Observable<any> {
    return this.http.post<any>('/Containers/listFilesContainers'+'?modulo_id=' + request.modulo_id + '&usuario_id=' + request.usuario_id, {});
  }
  uploadToContainers(data: FormData): Observable<any> {
    return this.http.post<FormData>('/Containers/uploadToContainers', data, {
      reportProgress: true,
      observe: 'events'
    });
  }
}


/*
public upload(formData) {

	return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
}
*/