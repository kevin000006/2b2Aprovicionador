import { MonedaModel, ComplejidadModel, TipoContratoModel, TipoProyectoModel, EquipamientoCondicionModel, EquipamientoMarcaModel, TipoEquipamientoModel } from 'app/model/Common';

export class UsuarioModel{
  nombres:string;
  apellidos: string;
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
    descripcion:string;
    color:string;
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
    this.oferta_id=0;
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
    this.vanval = 0;
  }
  vanval:number;
  oferta_id:number;
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
  observaciones:string;
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

export class EquipamientoRequest{
  constructor()
  {
    this.estado =0;
    this.id = 0;
    this.modelo = "";
  }
  activo:boolean;
  antiguedad:number;
  cantidad:number;
  condicion:number;
  id:number;
  idoferta:number;
  marca:number;
  modelo:string;
  moneda:number;
  tipo:number;
  total:number;
  unitario:number;
  estado:number;
}

export class OfertaEquipamientoModel
{
  constructor(){
    this.activo = true;
    this.id = 0;
    this.modelo = "";
    this.total = 0.00;
    this.unitario = 0.00;
    this.cantidad = 0;
    this.antiguedad = 0;
    this.equipamientoCondicion = new EquipamientoCondicionModel();
    this.equipamientomarca = new EquipamientoMarcaModel();
    this.moneda = new MonedaModel();
    this.tipoequipamiento = new TipoEquipamientoModel();
  }
  id:number;
  modelo:string;
  activo:boolean;
  antiguedad:number;
  cantidad:number;
  equipamientoCondicion:EquipamientoCondicionModel;
  equipamientomarca:EquipamientoMarcaModel;
  moneda:MonedaModel;
  tipoequipamiento:TipoEquipamientoModel;
  total:number;
  unitario:number;
}

export class BitacoraModel
{
  usuario: UsuarioModel;
  estado:EstadoModel;
  fecha:any;
}


export class OfertaDetalleModel
{
  ofertasDetalleId:number; 
  ofertaId :number;	   
  clienteId :number;  
  secuencia :number;
  nombreSede:string; 
  direccion :string; 
  //departamentoId;	
  //provinciaId;	
  distritoId :number;
  latitud :string; 	
  longitud :string; 
  zoom : string;	
  contacto :string; 
  telefono :string; 
 
  tipoCircuitoActual:string;
  numeroCdActual :string; 
  tipoServicioIdActual :number;
 
   bwActualActual:string;
   caudalBronceActual:string;
   caudal_plata_actual:string;
   caudalOroActual:string;
   caudalPlatinumActual:string;
   caudalVozActual:string;
   caudalVideoActual:string;
   caudalLdnActual:string;
   ultimaMillaActual;
   routerSwitchActual:string;
   dteActual:string;
   equipo_adicional_actual:string;
   equipoTerminalActual:string;
   recursoTransporteActual:string;
   tipoAntenaActual:string;
   segmentoSatelitalActual:string;
   pozoTierraActual:string;
   upsActual:string;
   facturacion_actual:number;
   vrf_actual:string;
   ofertaIsisPropuesto:string;
   
   accionIsisIdPropuesto:number;
   tipoCircuitoIdPropuesto:number;
   tipoServicioIdPropuesto:number;
   
   svaPropuesto:string;
   descripcionSvaPropuesto:string;
   bwPropuesto:string;
   caudalBroncePropuesto:string;
   caudalPlataPropuesto:string;
   caudalOroPropuesto:string;
   caudalPlatinumPropuesto:string;
   caudalVozPropuesto:string;
   caudalVideoPropuesto:string;
   CaudalLdnPropuesto:string;
 
   viaAccesoIdPropuesto:number;

   equipoTerminalPropuesto:string;
   routerPropuesto:string;
   equipoStockPropuesto:string;
   fechaLlegadaPropuesto:string;
   otrosEquiposPropuesto:string;
   componentesPropuesto:string;
   vrfPropuesto:string;
   
   detalleAccionEnlacePropuesto:string;
   observacionesPropuesto:string;
   precioPropuesto:number;
   codigoSisego:string;
   zonaSisego:string;

   //sisegoCondicionId;
   //antiguedad; 
   //antiguedadCosto; 
   //valorResidual; 
  diasEjecucion:number;
  costoUltimaMilla:number;
  //costoTransmision; 
  //costoPlantaExterna;
  //costoOpex;

  activo:boolean; 
}

