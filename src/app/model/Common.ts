export class ClienteModel{
    id : number;
    descripcion : string;
    numero_identificador_fiscal:string;
    codigo_isis:string;
    gerente_cuenta:string;
    segmentoNegocio:string;
}

export class ComplejidadModel{
    id : string;
    descripcion : string;
}

export class EstadoModel{
    id : number;
    codigo_agrupado : string;
    codigo_estado : string;
    descripcion : string;
    idSet : boolean
}
  
export class TipoContratoModel
{
    id:number;
    descripcion:string;
}

export class TipoProyectoModel
{
    id:number;
    descripcion:string;
}