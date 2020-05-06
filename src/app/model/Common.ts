export class ClienteModel{
    id : number;
    descripcion : string;
}

export class ComplejidadModel{
    complejidadCodigo : string;
    complejidadTipologiaDescrip : string;
}

export class EstadoModel{
    id : number;
    codigo_agrupado : string;
    codigo_estado : string;
    descripcion : string;
    idSet : boolean
}
  