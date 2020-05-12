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
    numero_identificador_fiscal:string;
    descripcion:string;
    codigo_isis:string;
    segmentoNegocio:string;
  }

  export class ComboModel{
    id:number
  }

export class OfertaModel
{
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
  tipoproyecto:ComboModel;
  complejidad:ComboModel;
  tipocontrato:ComboModel;
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
