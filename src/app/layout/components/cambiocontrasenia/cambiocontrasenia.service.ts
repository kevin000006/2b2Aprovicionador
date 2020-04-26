import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../../../model/Usuario';
@Injectable({
    providedIn: 'root'
})
export class CambioContraseñaService {
    constructor(private http: HttpClient) { }
    cambiarclave(data: UsuarioModel): Observable<any> {
        return this.http.post<UsuarioModel>('/seguridad/cambioclave', data);
    }
}