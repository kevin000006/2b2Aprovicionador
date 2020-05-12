import { MonedaModel, ComplejidadModel, TipoContratoModel, TipoProyectoModel } from 'app/model/Common';

export class UsuarioModel{
  nombres:String;
  apellidos: String;
}

export class SegmentoNegocioModel{
  id:number;
  descripcion:string
}

export class BandejaModel {
    id: number = 0;
    codigo: string = "---";
    version: number = 1;
    estado: string;   
    cliente: string;
    tipoproyecto:string;
    oportunidad:string;
    descripcion:string;
    url:string;
  }
  
  export class PreventaModel{
    nombre:string;
    createdBy:string;
  }

  export class ClienteModel{
    id:number;
    numeroidentificadorfiscal:string;
    gerente_cuenta:string;
    descripcion:string;
    codigoisis:string;
    segmentoNegocio:string;
  }

  export class EstadoModel
  {
    id:number;
  }

  export class ComboModel{
    id:number
  }

  export class OportunidadModel{
    id : number;
    descripcion: string;
    oportunidadcodigo:string;
  }

  export class TipoPagoModel{
    id:number;
    descripcion:string;
  }

export class OfertaModel
{
  constructor(){
    this.analistafinanciero = new PreventaModel();
    this.cliente = new ClienteModel();
    this.complejidad = new ComplejidadModel();
    this.estado = new EstadoModel();
    this.moneda = new MonedaModel();
    this.oportunidad = new OportunidadModel();
    this.preventa = new PreventaModel();
    this.tipocontrato = new TipoContratoModel();
    this.tipoproyecto = new TipoProyectoModel();
    this.tipopago = new TipoPagoModel();
  }

  codigo:string;
  oportunidadSalesforce:string;
  oportunidad_pre:string;
  oportunidad_codigo:string;
  numeroCasoSalesforce:string;
  segmentonegocio:SegmentoNegocioModel;
  preventa:PreventaModel;
  gerente_cuenta:string;
  analistafinanciero:PreventaModel;
  cliente:ClienteModel;
  contacto:string;
  correo_contacto:string;
  telefono_contacto:string;
  descripcion:string;
  resultado:string;
  resultado_color:string = this.resultado == 'GO' ? '#73DE07' : '#FF2C2C';
  aprobadores:string;
  aprobadoresArr:Array<string>=[];
  tiposervicio:string;
  pago_recurrente:number;
  tipoproyecto:TipoProyectoModel;
  complejidad:ComplejidadModel;
  tipocontrato:ComboModel;
  moneda:MonedaModel;
  estado :EstadoModel;
  oportunidad:OportunidadModel;
  tipopago:TipoPagoModel;
}
