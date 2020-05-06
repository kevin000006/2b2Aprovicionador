export class UsuarioModel{
  nombres:String;
  apellidos: String;
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
    url:string;
  }