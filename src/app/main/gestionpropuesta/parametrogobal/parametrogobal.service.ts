import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametroGlobalService {

  constructor(private http: HttpClient) {
  }
  obtenerparametros():Observable<any[]>{
    return this.http.get<any[]>('/finanzas/obtenerparametros');    
  }
  guardarparametro(parametro_id:number, valor:number): Observable<any> {
    return this.http.post<any>('/finanzas/guardarparametro?parametro_id=' + parametro_id + '&valor=' +valor, {});
  }
//   downLoadFileContainers(data: any): Observable<any> {
//     return this.http.get<FormData>('/Containers/downLoadFileContainers/' + data);
//   }
//   listFilesContainers(request:any): Observable<any> {
//     return this.http.post<any>('/Containers/listFilesContainers'+'?modulo_id=' + request.modulo_id + '&usuario_id=' + request.usuario_id, {});
//   }
//   uploadToContainers(data: FormData): Observable<any> {
//     return this.http.post<FormData>('/Containers/uploadToContainers', data, {
//       reportProgress: true,
//       observe: 'events'
//     });
//   }
}