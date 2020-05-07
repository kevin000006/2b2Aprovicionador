import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {BandejaModel} from '../models/oferta';
import { ShareDialogComponent } from './componentes/share-dialog/share-dialog.component';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OfertaComponent implements OnInit {

  ofertaBase = {};
  constructor(
    private _router: Router,
    public dialog: MatDialog){ }
  
  ngOnInit(): void {
    
    if(window.sessionStorage.getItem('oferta') != null){
      this.ofertaBase = JSON.parse(window.sessionStorage.getItem('oferta'));
    }
    else{
      if(window.history.state.id == 0 || window.history.state.id === undefined)
      {
        this.ofertaBase = new BandejaModel();
      }else{
        this.ofertaBase = window.history.state;
        window.sessionStorage.setItem('oferta',JSON.stringify(window.history.state));
      }        
    }
  }

  openShared():void{
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: '500px',    
      data:  {
        id: this.ofertaBase['id'],
        codigo: this.ofertaBase['codigo'],
        version : this.ofertaBase['version']
      }
    });
  }

  regresar()
  {
    window.sessionStorage.removeItem('oferta');
    this._router.navigate(['gestion-propuesta/bandeja'], { state: {} });
  }

  

}
