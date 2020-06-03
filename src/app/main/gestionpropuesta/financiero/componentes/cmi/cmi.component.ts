import { Component, Inject, OnInit } from '@angular/core';
import { CMIService } from './cmi.service';
import { Router } from '@angular/router';
import * as Cookies from 'js-cookie';
@Component({
  selector: 'CMI',
  templateUrl: './cmi.component.html',
  styleUrls: ['./cmi.component.css'],
})
export class CMIComponent implements OnInit {
  displayedColumns: string[] = ['linea', 'sublinea', 'serviciocmi', 'productoaf', 'porcentaje'];  
  dataSource: any;
  _filtro: any = { nroItmes: 5 };  
  ofertaBase = { id: 0 };
  constructor(
    private _router: Router,
    private servicioCMI: CMIService
  ) {
  }
  ngOnInit(): void {
    if (Cookies.get('currentUser') === undefined) {
      this._router.navigate(['pages/auth/login-2'], { state: {} });
    }
    else {
      if (window.sessionStorage.getItem('oferta') != null) {
        this.ofertaBase = JSON.parse(window.sessionStorage.getItem('oferta'));
      }
    }
    this.servicioCMI.obtenercmi(2).subscribe(data => {
      if (data != null) {
        this.dataSource = data
      }
    });
  }
}