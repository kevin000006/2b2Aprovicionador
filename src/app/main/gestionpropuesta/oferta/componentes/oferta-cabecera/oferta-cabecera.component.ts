import { Component, OnInit, Input,ViewChild,ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {OfertaModel, PreventaModel,ClienteModel, ComboModel,SegmentoNegocioModel} from '../../../models/oferta';
import { OfertaCabezeraService } from './oferta-cabezera.service';
import {CommonService} from 'app/common.service'
import { QuestionDialogsComponent } from 'app/main/gestionpropuesta/bandeja/dialogs/question-dialogs/question-dialogs.component';
import {Observable,fromEvent} from 'rxjs';

@Component({
  selector: 'oferta-cabecera',
  templateUrl: './oferta-cabecera.component.html',
  styleUrls: ['./oferta-cabecera.component.scss']
})
export class OfertaCabeceraComponent implements OnInit {

  dataSourceCliente:any[]=[];
  lstComplejidad;
  lstTipoContrato;
  lstTipoProyecto=[
    {id:1, nombre: 'Alta Nueva'},
      {id:2, nombre: 'Renovación'}, 
         {id:3, nombre: 'Winback'} 
         ];
  oferta:any={
    preventa:{nombre:''},
    cliente:{codigo_isis:'',numero_identificador_fiscal:'',descripcion:''},
    segmentonegocio:{descripcion:''},
    analistafinanciero:{createdBy:''},
    tipoproyecto:{id:0},
    complejidad:{id:0},
    tipocontrato:{id:0}
  };  
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

    let _oferta = {
      oferta_id : this.oferta.oferta_id,
      descripcion: this.oferta.descripcion
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
        
        data['aprobadoresArr'] = (data.aprobadores || '').split(',');
        data['tiposervicio'] = data.pago_recurrente > 0 ? 'Recurrente' : 'Oneshot';
        this.oferta = data;
        
        this.oferta.segmentonegocio = this.oferta.segmentonegocio || new SegmentoNegocioModel();
        this.oferta.complejidad = this.oferta.complejidad || new ComboModel();
        this.oferta.tipocontrato = this.oferta.tipocontrato || new ComboModel();
        this.oferta.tipoproyecto = this.oferta.tipoproyecto || new ComboModel();
        this.oferta.preventa = this.oferta.preventa || new PreventaModel();
        this.oferta.analistafinanciero = this.oferta.analistafinanciero || new PreventaModel();
        this.oferta.cliente = this.oferta.cliente || new ClienteModel(); 
        console.log(data);
      });
    }
  }

  displayFn(cliente) {
    if (cliente) { return cliente.codigo_isis; }
  }

  ngOnInit(): void {

    this.commonService.getComplejidadAll().subscribe(data => {
      this.lstComplejidad = data;
    });

    this.commonService.getTipoContratoAll().subscribe(data => {
      this.lstTipoContrato = data;
    });

    this.commonService.getClienteAll().subscribe(data => {
      this.dataSourceCliente = data;
    });



    fromEvent(this.autocompleteCliente.nativeElement, 'keyup')
    .subscribe(() => {
      
      
      
    });


   this.getOfertaData();
     
  }

}
