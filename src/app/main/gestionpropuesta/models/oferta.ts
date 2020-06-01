import { MonedaModel, ComplejidadModel, TipoContratoModel, TipoProyectoModel, EquipamientoCondicionModel, EquipamientoMarcaModel, TipoEquipamientoModel } from 'app/model/Common';

export class UsuarioModel {
  constructor(){
    this.token = '';
  }
  nombres: string;
  apellidos: string;
  usuario:string;
  token:string;
  nombrecorto:string;
  id:number;
}

export class SegmentoNegocioModel {
  id: number;
  descripcion: string
}

export class BandejaModel {
  id: number = 0;
  codigo: string = "---";
  version: number = 1;
  estado: string;
  cliente: string;
  tipoproyecto: string;
  oportunidad: string;
  descripcion: string;
  url: string;
}

export class PreventaModel {
  nombre: string;
  createdBy: string;
}

export class ClienteModel {
  id: number;
  numeroidentificadorfiscal: string;
  gerente_cuenta: string;
  descripcion: string;
  codigoisis: string;
  segmentoNegocio: string;
}

export class EstadoModel {
  id: number;
  descripcion: string;
  color: string;
}

export class ComboModel {
  id: number
}

export class OportunidadModel {
  id: number;
  descripcion: string;
  oportunidadcodigo: string;
}

export class TipoPagoModel {
  id: number;
  descripcion: string;
}

export class OfertaModel {
  constructor() {
    this.oferta_id = 0;
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
  vanval: number;
  oferta_id: number;
  codigo: string;
  oportunidadSalesforce: string;
  oportunidad_pre: string;
  oportunidad_codigo: string;
  numeroCasoSalesforce: string;
  segmentonegocio: SegmentoNegocioModel;
  preventa: PreventaModel;
  gerente_cuenta: string;
  analistafinanciero: PreventaModel;
  cliente: ClienteModel;
  contacto: string;
  observaciones: string;
  correo_contacto: string;
  telefono_contacto: string;
  descripcion: string;
  resultado: string;
  resultado_color: string = this.resultado == 'GO' ? '#73DE07' : '#FF2C2C';
  aprobadores: string;
  aprobadoresArr: Array<string> = [];
  tiposervicio: string;
  pago_recurrente: number;
  tipoproyecto: TipoProyectoModel;
  complejidad: ComplejidadModel;
  tipocontrato: ComboModel;
  moneda: MonedaModel;
  estado: EstadoModel;
  oportunidad: OportunidadModel;
  tipopago: TipoPagoModel;
}

export class EquipamientoRequest {
  constructor() {
    this.estado = 0;
    this.id = 0;
    this.modelo = "";
  }
  activo: boolean;
  antiguedad: number;
  cantidad: number;
  condicion: number;
  id: number;
  idoferta: number;
  marca: number;
  modelo: string;
  moneda: number;
  tipo: number;
  total: number;
  unitario: number;
  estado: number;
  proveedor:string;
  instalacion:number;
}

export class OfertaEquipamientoModel {
  constructor() {
    this.activo = true;
    this.id = 0;
    this.modelo = "";
    this.total = 0.00;
    this.unitario = null;
    this.cantidad = null;
    this.antiguedad = null;
    this.instalacion = 0.00;
    this.equipamientoCondicion = new EquipamientoCondicionModel();
    this.equipamientomarca = new EquipamientoMarcaModel();
    this.moneda = new MonedaModel();
    this.tipoequipamiento = new TipoEquipamientoModel();
  }
  id: number;
  modelo: string;
  activo: boolean;
  antiguedad: number;
  cantidad: number;
  equipamientoCondicion: EquipamientoCondicionModel;
  equipamientomarca: EquipamientoMarcaModel;
  moneda: MonedaModel;
  tipoequipamiento: TipoEquipamientoModel;
  total: number;
  unitario: number;
  instalacion:number;
  proveedor:string; 
}

export class BitacoraModel {
  usuario: UsuarioModel;
  estado: EstadoModel;
  fecha: any;
}


export class OfertaDetalleModel {
  //Informacion del cliente

  clienteId: number;
  ofertasDetalleId: number;
  ofertaId: number;
  nombreSede: string;
  direccion: string;
  departamentoId: number;
  provinciaId: number;
  distritoId: number;
  latitud: string;
  longitud: string;
  contacto: string;
  telefono: string;  
  tipoCircuitoActual: string;  
  nrotipoCircuitoActual: string;   
  tipoServicioIdActual: number;
  servicioActual_medio: number;
  bwActualActual: string;
  nrobwActualActual: string;
  
  caudalLdnActual: string;
  nrocaudalLdnActual: string;

  caudalVozActual: string;
  nrocaudalVozActual: string;

  caudalVideoActual: string;
  nrocaudalVideoActual: string;

  caudalPlatinumActual: string;
  nrocaudalPlatinumActual: string;

  caudalOroActual: string;
  nrocaudalOroActual: string;

  caudal_plata_actual: string;
  nrocaudal_plata_actual: string;

  caudalBronceActual: string;
  nrocaudalBronceActual: string;

  equipoTerminalActual: string;
  routerSwitchActual: string;
  facturacion_actual: number;
  servicioActual_otro : string;
  equipo_adicional_actual: string;

  //Servicio Propuesto y Caudal presupuesto
  accionIsisIdPropuesto: number;
  servicioPropuesto_tiposede: number;
  servicioPropuesto_modo : number;
  tipoCircuitoIdPropuesto: number;
  servicioPropuesto_nrocircuito: string;
  tipoServicioIdPropuesto: number;
  servicioPropuesto_medio : number;
  svaPropuesto: string;
  descripcionSvaPropuesto: string;

  bwPropuesto: string;
  nrobwPropuesto: string;

  caudalLdnPropuesto: string;
  nrocaudalLdnPropuesto: string;

  caudalVozPropuesto: string;
  nrocaudalVozPropuesto: string;

  caudalVideoPropuesto: string;
  nrocaudalVideoPropuesto: string;
  
  caudalPlatinumPropuesto: string;  
  nrocaudalPlatinumPropuesto: string;  

  caudalOroPropuesto: string;
  nrocaudalOroPropuesto: string;

  caudalPlataPropuesto: string;
  nrocaudalPlataPropuesto: string;
  
  caudalBroncePropuesto: string;
  nrocaudalBroncePropuesto: string;
  condicion_servicio: number; // se agrego este nuevo campo
  equipoTerminalPropuesto: string;
  routerPropuesto: string;
  otrosEquiposPropuesto: string;
  precioPropuesto: number;  
  observacionesPropuesto: string;
  
  ofertaIsisPropuesto: string;
  codigoSisego: string;
  zonaSisego: string;
  IdZonaSigego: number;
  costoUltimaMilla: number;
  diasEjecucion: number;

  componentesPropuesto: string;  
  fechaLlegadaPropuesto: string;
  equipoStockPropuesto: string; 
  viaAccesoIdPropuesto: number;
  vrfPropuesto: string; 
  detalleAccionEnlacePropuesto: string;  
  dteActual: number;
  numeroCdActual: string;
  pozoTierraActual: string;
  recursoTransporteActual: string;
  segmentoSatelitalActual: number;
  tipoAntenaActual: string;
  secuencia: number;
  ultimaMillaActual: number;
  upsActual: string;
  vrf_actual: string;  
  lstZonaSisego: [];
  zoom: string;
  ubigeo: string;
  estado: number;
  activo: boolean;
  isLoading: boolean;
}

