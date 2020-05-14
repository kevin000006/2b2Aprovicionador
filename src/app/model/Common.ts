export class ClienteModel {
    id: number;
    descripcion: string;
    numeroidentificadorfiscal: string;
    codigoisis: string;
    gerente_cuenta: string;
    segmentoNegocio: string;
}

export class ComplejidadModel {
    id: string;
    descripcion: string;
}

export class EstadoModel {
    id: number;
    codigo_agrupado: string;
    codigo_estado: string;
    descripcion: string;
    idSet: boolean
}

export class TipoContratoModel {
    id: number;
    descripcion: string;
}

export class TipoProyectoModel {
    id: number;
    descripcion: string;
}


export class MonedaModel {
    constructor() {
        this.id = 0;
    }

    id: number;
    sigla: string;
    descBrv: string;
    monedaDescrip: string;
}
export class ConceptosOpexModel {
    id: number;
    descripcion: string;
}
export class TipoEnlaceModel {
    id: number;
    descripcion: string;
}
export class CondicionEnlaceModel {
    id: number;
    descripcion: string;
}
export class TipoCircuitoModel {
    id: number;
    descripcion: string;
}

export class TipoServicioModel {
    id: number;
    descripcion: string;
    satelital: Boolean;
}
export class TipoInstalacionSatelitalModel {
    id: number;
    descripcion: string;
}

export class ViaAccesoModel {
    id: number;
    descripcion: string;
    TipoServicioId: number;
}

export class SisegoCondicionModel {
    id: number;
    descripcion: string;
}

export class EquipamientoCondicionModel {
    id: number;
    descripcion: string;
}

export class EquipamientoMarcaModel {
    id: number;
    descripcion: string;
}
export class VelocidadesModel {
    id: number;
    descripcion: string;
    ViaAccesoId: number;
}
export class AccionIsisModel {
    id: number;
    descripcion: string;
}


export class OfertaOpex {    
    ofertaOpexId: number;
    ofertaId: number;
    conceptoId: number;
    nombre: string;
    cantidad: number;
    meses: number;
    factor: number;
    moneda_id: number;
    unitarioMensual: number;    
    mostrarConcepto: boolean;
    totalMensual: number;
    activo: null;    
    estado: number; //-1 ya existe en la base de datos, 0: nuevo, 1: Actualizado, 2: Inactivo
    // esAgregado : boolean; //true, cuando el registro es nuevo
    // esModificado:boolean; //true, cuando el registro es modificaco
    // esEliminado: boolean; //true, cuando el registro es eliminado
}


export class TipoEquipamientoModel
{
    id:number;
    descripcion:string;
}
