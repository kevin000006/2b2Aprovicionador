import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OfertaModel, PreventaModel, ClienteModel, ComboModel, SegmentoNegocioModel } from '../../../models/oferta';
import { OfertaCabezeraService } from './oferta-cabezera.service';
import { CommonService } from 'app/common.service'
import { QuestionDialogsComponent } from 'app/main/gestionpropuesta/bandeja/dialogs/question-dialogs/question-dialogs.component';
import { Observable, fromEvent } from 'rxjs';
import { MonedaModel } from 'app/model/Common';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'oferta-cabecera',
  templateUrl: './oferta-cabecera.component.html',
  styleUrls: ['./oferta-cabecera.component.scss']
})
export class OfertaCabeceraComponent implements OnInit {

  processIsis = false;
  dataSourceCliente: any[] = [];
  dataSourceOportunidad: any[] = [];
  lstComplejidad = [];
  lstTipoContrato = [];
  lstMoneda = [];
  lstTipoProyecto = [];
  oferta: any = new OfertaModel();
  constructor(
    private service: OfertaCabezeraService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private _snack: MatSnackBar,
    private toastr: ToastrService
  ) { }
  @ViewChild('myControl', { static: true }) autocompleteCliente: ElementRef;
  @ViewChild('codigoSalesforce', { static: true }) autocompleteOportunidad: ElementRef;
  @Input() ofertaBase: any = {id:0};

  ganarOferta() {

    const dialogRef = this.dialog.open(QuestionDialogsComponent, {
      width: '500px',
      data: {
        message: '¿Ganar Oferta?',
        accion: '/oferta/ganaroferta',
        data: {
          ofertaId: this.oferta.oferta_id,
          usuario: 'maria.ramos',
          usuarioId: 1
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != 0) {
        this.getOfertaData();
      }
    });
  }

  guardarOferta() {

    let _oferta = {
      pcliente_id: this.oferta.cliente.id,
      pcomplejidad_id: this.oferta.complejidad.id == 0 ? null : this.oferta.complejidad.id,
      pcontacto: this.oferta.contacto,
      pcorreo_contacto: this.oferta.correo_contacto,
      pdescripcion: this.oferta.descripcion,
      pmoneda_id: this.oferta.moneda.id,
      pnumero_caso_salesforce: this.oferta.numeroCasoSalesforce,
      pobservaciones: (this.oferta.observaciones || ''),
      poferta_id: this.oferta.oferta_id,
      poportunidad_id: this.oferta.oportunidad.id,
      ppago_recurrente: this.oferta.pago_recurrente,
      ppago_recurrente_actual: (this.oferta.pago_recurrente_actual || 0),
      ppago_unico: this.oferta.pago_unico,
      pperiodo_contrato: this.oferta.periodo_contrato,
      ppreventa_id: 1,
      ptelefono_contacto: this.oferta.telefono_contacto,
      ptiempo_implantacion: this.oferta.tiempo_implantacion,
      ptipo_contrato_id: this.oferta.tipocontrato.id == 0 ? null : this.oferta.tipocontrato.id,
      ptipo_proyecto_id: this.oferta.tipoproyecto.id == 0 ? null : this.oferta.tipoproyecto.id,
      pusuario: 'Maria Ramos'

    };




    this.service.guardarOferta(_oferta).subscribe(response => {
      let message ="";
      if (this.ofertaBase.id != 0) {
        message = "Oferta modificada con exito.";
      } else {
        message = "Se creo una nueva oferta.";
      }

      this.toastr.success(message, '', {
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true
      });

      if (response != 1) {
        this.ofertaBase.id = response;
        window.sessionStorage.setItem('oferta', JSON.stringify(this.ofertaBase));
      }

      this.getOfertaData();

    });

  }

  private getOfertaData() {
    if (this.ofertaBase.id > 0) {
      this.service.getOfertaById(this.ofertaBase.id).subscribe(data => {

        if (!data.aprobadores)
          data['aprobadoresArr'] = [];
        else
          data['aprobadoresArr'] = data.aprobadores.split(",");

        data['tiposervicio'] = data.pago_recurrente > 0 ? 'Recurrente' : 'Oneshot';
        this.oferta = data;

        this.oferta.vanval = this.oferta.vanval || 0;
        this.oferta.segmentonegocio = this.oferta.segmentonegocio || new SegmentoNegocioModel();
        this.oferta.complejidad = this.oferta.complejidad || new ComboModel();
        this.oferta.tipocontrato = this.oferta.tipocontrato || new ComboModel();
        this.oferta.tipoproyecto = this.oferta.tipoproyecto || new ComboModel();
        this.oferta.preventa = this.oferta.preventa || new PreventaModel();
        this.oferta.moneda = this.oferta.moneda || new MonedaModel();
        this.oferta.analistafinanciero = this.oferta.analistafinanciero || new PreventaModel();
        this.oferta.cliente = this.oferta.cliente || new ClienteModel();
        this.oferta.diferencia_ingresos = this.oferta.diferencia_ingresos || 0;
        this.oferta.diferencia_ingresos = (this.oferta.diferencia_ingresos * 100).toFixed(2);
        
      });
    }
    else {
      this.oferta = new OfertaModel();
      this.oferta.moneda.id = 1;
      this.oferta.complejidad.id = 0;
      this.oferta.tipocontrato.id = 0;
      this.oferta.tipoproyecto.id = 0;
      
    }
   
  }

  displayFn(cliente) {
    if (cliente) { return cliente.codigoisis; }
  }

  onSelectOportunidad(item) {
    this.oferta.oportunidad = item;
    this.oferta.cliente = item.cliente;
    this.oferta.descripcion = item.descripcion;
  }

  displayFnOportunidad(item) {



    if (item) {
      return item.oportunidadcodigo;
    }
  }

  enviarIsis():void{
    this.processIsis=true;
    
    this.service.enviarIsis(this.oferta.oferta_id).subscribe(data => {
      this.processIsis=false;
      let message = '';
      if(data == 1){
        message = 'integracion ISIS con éxito.';
      }else{
        message = 'ha ocurrido un error.';
      }
      this.toastr.success(message, '', {
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true
      });
    },
    error => {
      this.processIsis=false;
      
      this.toastr.error(error.error.message, '', {
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true
      });
    });

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

        this.service.getClientesSearch(this.autocompleteCliente.nativeElement.value).subscribe(data => {
          this.dataSourceCliente = data;
        });

      });

    fromEvent(this.autocompleteOportunidad.nativeElement, 'keyup')
      .subscribe(() => {

        this.service.getOportunidadSearch(this.autocompleteOportunidad.nativeElement.value).subscribe(data => {
          this.dataSourceOportunidad = data;
        });

      });


    this.getOfertaData();

  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'requerido' :
      this.formControl.hasError('email') ? 'email no valido' :
        '';
  }

  submit() {

  }


}
