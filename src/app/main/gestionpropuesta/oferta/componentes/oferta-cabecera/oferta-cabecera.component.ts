import { Component, OnInit, Input,ViewChild,ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {OfertaModel, PreventaModel,ClienteModel, ComboModel,SegmentoNegocioModel} from '../../../models/oferta';
import { OfertaCabezeraService } from './oferta-cabezera.service';
import {CommonService} from 'app/common.service'
import { QuestionDialogsComponent } from 'app/main/gestionpropuesta/bandeja/dialogs/question-dialogs/question-dialogs.component';
import {Observable,fromEvent} from 'rxjs';
import { MonedaModel } from 'app/model/Common';
import { OfertaService } from '../../oferta.service';

@Component({
  selector: 'oferta-cabecera',
  templateUrl: './oferta-cabecera.component.html',
  styleUrls: ['./oferta-cabecera.component.scss']
})
export class OfertaCabeceraComponent implements OnInit {

  dataSourceCliente:any[]=[];
  lstComplejidad=[];
  lstTipoContrato=[];
  lstMoneda=[];
  lstTipoProyecto=[];
  oferta:any=new OfertaModel();
  constructor(private service: OfertaCabezeraService,
  private commonService : CommonService,
  public dialog: MatDialog) { }
  @ViewChild('myControl', { static: true }) autocompleteCliente: ElementRef;
  @Input() ofertaBase:any={}; 

  ganarOferta(){

    const dialogRef = this.dialog.open(QuestionDialogsComponent, {
      width: '500px',    
      data:  {
        message: '¿Ganar Oferta?',
        accion: '/oferta/ganaroferta',
        data:{
          ofertaId: this.oferta.oferta_id,
          usuario: 'maria.ramos',
          usuarioId: 1
        }
      }
    });


    dialogRef.afterClosed().subscribe(result => {
    
      if(result != 0)
      {        
        this.getOfertaData();
      }
     
    });


  }

  guardarOferta(){

  let _oferta ={
    oferta_id :0,
    descripcion :this.oferta.descripcion,
    moneda:{
      id:1,
      monedaDescrip:"descripcion"
    }
  }

    const dialogRef = this.dialog.open(QuestionDialogsComponent, {
      width: '500px',    
      data:  {
        message: 'Guardar cambios?',
        accion: '/oferta/save',
        data:_oferta
      }
    });
  }

  private getOfertaData(){
    if(this.ofertaBase.id > 0){
      this.service.getOfertaById(this.ofertaBase.id).subscribe(data => {
        
        if(!data.aprobadores)
          data['aprobadoresArr'] =[];
        else
          data['aprobadoresArr'] = data.aprobadores.split(",");

        data['tiposervicio'] = data.pago_recurrente > 0 ? 'Recurrente' : 'Oneshot';
        this.oferta = data;
        
        this.oferta.segmentonegocio = this.oferta.segmentonegocio || new SegmentoNegocioModel();
        this.oferta.complejidad = this.oferta.complejidad || new ComboModel();
        this.oferta.tipocontrato = this.oferta.tipocontrato || new ComboModel();
        this.oferta.tipoproyecto = this.oferta.tipoproyecto || new ComboModel();
        this.oferta.preventa = this.oferta.preventa || new PreventaModel();
        this.oferta.moneda = this.oferta.moneda || new MonedaModel();
        this.oferta.analistafinanciero = this.oferta.analistafinanciero || new PreventaModel();
        this.oferta.cliente = this.oferta.cliente || new ClienteModel(); 
        console.log(data);
      });
    }
    else{
      this.oferta = new OfertaModel();
      console.log(this.oferta);
    }
  }
    debugger;
  displayFn(cliente) {
    if (cliente) { return cliente.codigoisis; }
  }

  ngOnInit(): void {

    this.commonService.getComplejidadAll().subscribe(data => {
      this.lstComplejidad = data;
    });

    this.commonService.getTipoContratoAll().subscribe(data => {
      this.lstTipoContrato = data;
    });

    this.commonService.getTipoProyectoAll().subscribe(data => {
      this.lstTipoProyecto = data;
    });

    /*this.commonService.getClienteAll().subscribe(data => {
      this.dataSourceCliente = data;
    });*/

    this.commonService.getTipoMonedaAll().subscribe(data => {
      this.lstMoneda = data;
    });


    fromEvent(this.autocompleteCliente.nativeElement, 'keyup')
    .subscribe(() => {

      this.service.getClientesSearch(this.autocompleteCliente.nativeElement.value).subscribe(data =>{
        this.dataSourceCliente = data;
      })
      
       
      
    });


   this.getOfertaData();
     
  }

}
