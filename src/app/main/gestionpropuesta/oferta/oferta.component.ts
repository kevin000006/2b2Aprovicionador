import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OfertaService } from './oferta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Guid } from "guid-typescript";


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

  constructor(private ofertaService:OfertaService) { }
  

  ngOnInit(): void {
    
    console.log(window.history.state);
    
  }

  openShared():void{
    this.showShared = true;
    this.hideSharedBtn = false;
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
