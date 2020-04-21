import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../../../../model/Usuario';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    //private readonly urlBase: string = "http://localhost:8080/api";
    private readonly urlBase: string = "https://cors-anywhere.herokuapp.com/https://webapp-b2b.azurewebsites.net/api";

    constructor(private http: HttpClient) { }

    autenticacion(data: UsuarioModel): Observable<any> {
        return this.http.post<UsuarioModel>(this.urlBase + '/seguridad/autenticacion', data);
    }
}
