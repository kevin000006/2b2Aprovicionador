import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlockBlobClient } from '@azure/storage-blob';
@Injectable({
  providedIn: 'root'
})
export class SubirTramaService {

  constructor(private http: HttpClient) { }

  GuardarArchivo(data: any): Observable<any> {
    debugger;

    if(data.tipo =="1"){
      return this.http.post<any>('/IsisAcceso/uploadCVS', data);
    }else if(data.tipo =="2"){
      return this.http.post<any>('/IsisEquipo/uploadCVS', data);
    }
    else if(data.tipo =="3"){
      return this.http.post<any>('/IsisTarifa/uploadCVS', data);
    }    
    else{
      return this.http.post<any>('/IsisCliente/uploadCVS', data);
    }    
  }

  getConnectionURL(resourceName: any): string {
    const base = this.getResourceUrl(resourceName);
    const tokensas = '?sv=2019-02-02&ss=b&srt=sco&sp=rwdlac&se=2020-06-01T23:14:22Z&st=2020-04-22T15:14:22Z&spr=https&sig=tPTbEa4Dtrho%2Bw6irjR5DSoG873d%2BQ9WSmDB8lawsSc%3D';
    return `${base}?${tokensas}`
  }
  getResourceUrl(resourceName: any): string {
    const accountName = 'b2bassets';
    const containerName = 'assets';
    console.log(resourceName);
    return `https://${accountName}.blob.core.windows.net/${containerName}/${resourceName}`
  }

  uploadFile(file: any, filename: any): any {
    const blobBlockClient = new BlockBlobClient(this.getConnectionURL(filename));
    return blobBlockClient.uploadBrowserData(file);
  }
  generateUUID(): any {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
