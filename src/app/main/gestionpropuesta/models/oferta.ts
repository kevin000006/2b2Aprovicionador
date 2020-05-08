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
    nombre:string
  }

  export class ClienteModel{
    id:number;
    numero_identificador_fiscal:string;
    descripcion:string;
  }

export class OfertaModel
{
  codigo:string;
  oportunidad:string;
  segmentonegocio:SegmentoNegocioModel;
  preventa:PreventaModel;
  gerente_cuenta:PreventaModel;
  analistafinanciero:PreventaModel;
  cliente:ClienteModel;
  contacto:string;
  correo_contacto:string;
  telefono_contacto:string;
  descripcion:string;
}
