export class UsuarioModel{
  nombres:String;
  apellidos: String;
}

export class EstadoModel{
  id : number;
  codigo_agrupado : string;
  codigo_estado : string;
  descripcion : string;
  idSet : boolean
}


export class ClienteModel{
  id : number;
  descripcion : string;
}

export class BandejaModel {
    id: number;
    codigo: string = "";
    version: number = 1;
    estado: string;   
    cliente: string;
    tipoproyecto:string;
    oportunidad:string;
    descripcion:string;
  }