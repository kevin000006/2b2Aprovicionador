import { Component, OnInit, Input } from '@angular/core';
import {OfertaModel, PreventaModel,ClienteModel} from '../../../models/oferta';
import { OfertaCabezeraService } from './oferta-cabezera.service';

@Component({
  selector: 'oferta-cabecera',
  templateUrl: './oferta-cabecera.component.html',
  styleUrls: ['./oferta-cabecera.component.scss']
})
export class OfertaCabeceraComponent implements OnInit {

  oferta:any={
    preventa:{nombre:''},
    cliente:{codigo_isis:'',numero_identificador_fiscal:'',descripcion:''},
    segmentonegocio:{descripcion:''},
    gerente_cuenta:{nombre:''},
    analistafinanciero:{nombre:''}
  };
  constructor(private service: OfertaCabezeraService) { }
  @Input() ofertaBase:any={};

  ngOnInit(): void {
      this.service.getOfertaById(this.ofertaBase.id).subscribe(data => {
        debugger;
        this.oferta = data;
        
        this.oferta.preventa = this.oferta.preventa || new PreventaModel();
        this.oferta.analistafinanciero = this.oferta.analistafinanciero || new PreventaModel();
        this.oferta.gerente_cuenta = this.oferta.gerente_cuenta || new PreventaModel();
        this.oferta.cliente = this.oferta.cliente || new ClienteModel(); 
        console.log(data);
      });
  }

}
