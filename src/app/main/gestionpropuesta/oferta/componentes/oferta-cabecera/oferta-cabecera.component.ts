import { Component, OnInit, Input } from '@angular/core';
import {OfertaModel, PreventaModel,ClienteModel, ComboModel} from '../../../models/oferta';
import { OfertaCabezeraService } from './oferta-cabezera.service';
import {CommonService} from 'app/common.service'

@Component({
  selector: 'oferta-cabecera',
  templateUrl: './oferta-cabecera.component.html',
  styleUrls: ['./oferta-cabecera.component.scss']
})
export class OfertaCabeceraComponent implements OnInit {

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
    private commonService : CommonService) { }
  @Input() ofertaBase:any={};

  ngOnInit(): void {

    this.commonService.getComplejidadAll().subscribe(data => {
      this.lstComplejidad = data;
    });

    this.commonService.getTipoContratoAll().subscribe(data => {
      this.lstTipoContrato = data;
    });

      this.service.getOfertaById(this.ofertaBase.id).subscribe(data => {
        
        data['aprobadoresArr'] = (data.aprobadores || '').split(',');
        data['oportunidad_pre'] = (data.oportunidad || '-').split('-')[0];
        data['oportunidad_codigo'] = (data.oportunidad || '-').split('-')[1];
        data['tiposervicio'] = data.pago_recurrente > 0 ? 'Recurrente' : 'Oneshot';
        this.oferta = data;
        
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
