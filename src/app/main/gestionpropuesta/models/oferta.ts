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
  }

  export class ComboModel{
    id:number
  }

export class OfertaModel
{
  codigo:string;
  oportunidad:string;
  oportunidad_pre:string;
  oportunidad_codigo:string;
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
