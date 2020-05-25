import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'Financiero',
    templateUrl: './financiero.component.html',
    styleUrls: ['./financiero.component.css'],
})
export class FinancieroComponent {    
    constructor(
        private _router: Router,
    ) {        
    }    
    regresar() {
        // window.sessionStorage.removeItem('oferta');
        // this._router.navigate(['gestion-propuesta/bandeja'], { state: {} });
      }
}

