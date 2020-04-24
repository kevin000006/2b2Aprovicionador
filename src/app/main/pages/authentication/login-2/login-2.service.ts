import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../../../../model/Usuario';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) { }
    autenticacion(data: UsuarioModel): Observable<any> {
        return this.http.post<UsuarioModel>('/seguridad/autenticacion', data);
    }
}