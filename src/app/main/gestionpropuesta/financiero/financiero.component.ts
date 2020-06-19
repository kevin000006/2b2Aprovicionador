import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Cookies from 'js-cookie';
import { BandejaModel } from '../models/oferta';
@Component({
    selector: 'Financiero',
    templateUrl: './financiero.component.html',
    styleUrls: ['./financiero.component.css'],
})
export class FinancieroComponent implements OnInit {
    ofertaBase = { id: 0 };
    currentUser: any = { nombres: '', apellidos: '', nombrecorto: '' };
    constructor(
        private _router: Router,
    ) {
        if (Cookies.get('currentUser') === undefined) {
            this._router.navigate(['pages/auth/login-2'], { state: {} });
        }
    }
    ngOnInit(): void {        
        // if (Cookies.get('currentUser') === undefined) {
        //     this._router.navigate(['pages/auth/login-2'], { state: {} });
        // }
        // else {
        //     this.currentUser = JSON.parse(Cookies.get('currentUser'));

        //     if (window.sessionStorage.getItem('oferta') != null) {
        //         this.ofertaBase = JSON.parse(window.sessionStorage.getItem('oferta'));
        //     }
        //     else {
        //         if (window.history.state.id == 0 || window.history.state.id === undefined) {
        //             this.ofertaBase = new BandejaModel();
        //         } else {
        //             this.ofertaBase = window.history.state;
        //             window.sessionStorage.setItem('oferta', JSON.stringify(window.history.state));
        //         }
        //     }
        // }
    }
    regresar() {
       // window.sessionStorage.removeItem('oferta');
       // this._router.navigate(['gestion-propuesta/bandeja'], { state: {} });
        window.history.back();
    }
}

