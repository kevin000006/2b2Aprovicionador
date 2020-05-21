import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlockBlobClient } from '@azure/storage-blob';
import { async } from '@angular/core/testing';
@Injectable({
  providedIn: 'root'
})
export class SubirTramaService {

  constructor(private http: HttpClient) { }

  GuardarArchivo(data: any): Observable<any> {
    return this.http.post<any>('/IsisEntity/uploadCVS', data);
    /* if (data.tipo == "1") {     
     }
     else if (data.tipo == "2") {
      return this.http.post<any>('/IsisEquipo/uploadCVS', data);
    } else if (data.tipo == "3") {
      return this.http.post<any>('/IsisTarifa/uploadCVS', data);
    } else if (data.tipo == "4") {
      return this.http.post<any>('/IsisCliente/uploadCVS', data);
    }*/
  }

  getConnectionURL(resourceName: any): string {
    const base = this.getResourceUrl(resourceName);
    const tokensas = '?sv=2019-10-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-12-31T07:22:46Z&st=2020-05-18T23:22:46Z&spr=https&sig=tQVrulnzM5beKSRYnAxIhJxBWDar9Qh9U6vAsmpzqJM%3D';
    return `${base}?${tokensas}`
  }
  getResourceUrl(resourceName: any): string {
    const accountName = 'b2barchivos';
    const containerName = 'b2b-provisioner';
    console.log(resourceName);
    return `https://${accountName}.blob.core.windows.net/${containerName}/${resourceName}`
  }

  downloadBlobl(nombre: any): any {    
    async function blobToString(blob: Blob): Promise<string> {
      const fileReader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        fileReader.onloadend = (ev: any) => {
          resolve(ev.target!.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsText(blob);
      });
    }
    async function descargar(nombre) {
      const tokensas = '?sv=2019-10-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-12-31T07:22:46Z&st=2020-05-18T23:22:46Z&spr=https&sig=tQVrulnzM5beKSRYnAxIhJxBWDar9Qh9U6vAsmpzqJM%3D';
      const accountName = 'b2barchivos';
      const containerName = 'b2bassets';
      const uri = `https://${accountName}.blob.core.windows.net/${containerName}/${nombre}` + `${tokensas}`;
      window.open(uri);
    }
    descargar(nombre);
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
