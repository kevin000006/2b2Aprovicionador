import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {DatePipe} from '@angular/common';
import { EstadoModel } from 'app/model/Common';
import { CommonService } from 'app/common.service';

@Component({
  selector: 'app-reportepropuesta',
  templateUrl: './reportepropuesta.component.html',
  styleUrls: ['./reportepropuesta.component.scss'],
  providers:[DatePipe]
})
export class ReportepropuestaComponent implements OnInit {
  @ViewChild('inperlink', { static: true }) inperlink: ElementRef;
  lstEstado = new Array<EstadoModel>();
  urlBase:string="https://b2bback.azurewebsites.net/api/reportes/ofertas?";
  url:string="";
  filtro={
    estado:null,
    desde:null,
    hasta:null
  };

  constructor(private commonService: CommonService,
    private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.commonService.getEstadoAll()
      .subscribe(data => this.lstEstado = data);
  }

  descargarExcel():void{
    
    let _url = this.urlBase;

    if(this.filtro.estado)
      _url += "estado=" + this.filtro.estado

    if(this.filtro.desde)
      _url +=  "&desde=" + this.datepipe.transform(this.filtro.desde,'yyyy/MM/dd') 

    if(this.filtro.hasta)
      _url += "&hasta=" + this.datepipe.transform(this.filtro.hasta,'yyyy/MM/dd') 

    window.location.href=_url;

  }


}
