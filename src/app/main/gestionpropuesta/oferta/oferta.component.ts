import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OfertaService } from './oferta.service';
import {BandejaModel} from '../models/oferta';
import { ShareDialogComponent } from './componentes/share-dialog/share-dialog.component';
import { map } from 'rxjs/operators';
import { Guid } from "guid-typescript";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OfertaComponent implements OnInit {

  urlBase:string = "http://localhost:4200";
  urlShared:string = "";
  hideSharedBtn = false;
  showShared = false;
  ofertaBase = {};
  constructor(
    private ofertaService:OfertaService,
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
      data: {}    
    });
  }

  obtenerUrl():void{
    let codigo = Guid.create().toString();

    this.urlShared = "procesando....";
    codigo = codigo.split('-').join('');
    let _urlShare = this.urlBase +'/shared/'+ codigo;
    this.ofertaService.generarUrl({redirect:'gestion-propuesta/oferta',url:codigo,model:"{}"}).subscribe(data=>{
      this.urlShared = _urlShare;
      this.hideSharedBtn = true;
    });
   
  }

  closeShared():void{
    this.showShared = false;
  }

}
