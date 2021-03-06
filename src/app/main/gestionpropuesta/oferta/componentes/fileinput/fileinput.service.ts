import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileInputService {

  constructor(private http: HttpClient) {
  }
  deleteFileContainers(id: string): Observable<any> {
    return this.http.post<FormData>('/Containers/deleteFileContainers/' + id + '', {});
  }
  downLoadFileContainers(data: any): Observable<any> {
    return this.http.get<FormData>('/Containers/downLoadFileContainers/' + data);
  }
  listFilesContainers(request:any): Observable<any> {
    return this.http.post<any>('/Containers/listFilesContainers'+'?modulo_id=' + request.modulo_id + '&usuario_id=' + request.usuario_id, {});
  }
  uploadToContainers(data: FormData): Observable<any> {
    return this.http.post<FormData>('/Containers/subirarchivosportipo', data, {
      reportProgress: true,
      observe: 'events'
    });
  }
}