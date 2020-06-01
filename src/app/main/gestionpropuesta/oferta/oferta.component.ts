import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BandejaModel } from '../models/oferta';
import { ShareDialogComponent } from './componentes/share-dialog/share-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FileInputComponent } from '../oferta/componentes/fileinput/fileinput.component';
import { BitacoraDialogComponent } from './componentes/bitacora-dialog/bitacora-dialog.component';
import * as Cookies from 'js-cookie';
import { OfertaService } from './oferta.service';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OfertaComponent implements OnInit {

  ofertaBase = {id:0};
  currentUser: any = { nombres: '', apellidos: '', nombrecorto: '' };
  constructor(
    private _router: Router,
    public dialog: MatDialog,
    private ofertaService : OfertaService
  ){

    if (Cookies.get('currentUser') === undefined) {
      this._router.navigate(['pages/auth/login-2'], { state: {} });
    }

   }

  ngOnInit(): void {

    if (Cookies.get('currentUser') === undefined) {
      this._router.navigate(['pages/auth/login-2'], { state: {} });
    }
    else {
      this.currentUser = JSON.parse(Cookies.get('currentUser'));
     
      if (window.sessionStorage.getItem('oferta') != null) {
        this.ofertaBase = JSON.parse(window.sessionStorage.getItem('oferta'));
      }
      else {
        if (window.history.state.id == 0 || window.history.state.id === undefined) {
          this.ofertaBase = new BandejaModel();
        } else {
          this.ofertaBase = window.history.state;
          window.sessionStorage.setItem('oferta', JSON.stringify(window.history.state));
        }
      }
      
    }

  }
  btnAdjuntar(): void {
    const dialogRef = this.dialog.open(FileInputComponent, {
      height: '98%',
      width: '100vw',
      panelClass: 'full-screen-modal',
      data: {
        id:this.ofertaBase['id'],
        message: '¿Esta seguro que desea eliminar esta fila?',
        buttonText: {
          ok: 'Guardar',
          cancel: 'Cancelar'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        // this.dataSource.data.splice(this.dataSource.data.indexOf(item.id), 1);
        // this.dataSource = new MatTableDataSource<ServicioElement>(dataSourceList);
      }
    });
  }
  openShared(): void {
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: '650px',
      data: {
        id: this.ofertaBase['id'],
        codigo: this.ofertaBase['codigo'],
        version: this.ofertaBase['version']
      }
    });
  }

  openFinanciero(): void {   
    //this._router.navigate(['gestion-propuesta/financiero'], { state: {} });   
    this._router.navigate([]).then(result => {  window.open('gestion-propuesta/financiero', '_blank'); });
  }

  openBitacora(): void {
      const dialogRef = this.dialog.open(BitacoraDialogComponent, {
        width: '760px',
        data: {
          id:this.ofertaBase.id
        }
      });
    
  }

  regresar() {
    window.sessionStorage.removeItem('oferta');
    this._router.navigate(['gestion-propuesta/bandeja'], { state: {} });
  }



}
