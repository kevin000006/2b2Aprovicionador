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
  listFilesContainers(): Observable<any> {
    return this.http.post<any>('/Containers/listFilesContainers', {});
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