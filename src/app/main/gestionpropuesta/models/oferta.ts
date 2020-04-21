
export class EstadoModel {
  id: number;
  codigo_agrupado: string;
  codigo_estado: string;
  descripcion: string;
  idSet: boolean
}

export class ClienteModel {
  id: number;
  descripcion: string;
}

export class BandejaModel {
  id: number;
  codigo: string = "---";
  version: number = 1;
  salesforce: string;
  mtrestado: EstadoModel;
  gerente: string;
  preventa: string;
  cliente: ClienteModel;
  contactocliente: string;
  telefonocliente: string;
  correocontacto: string;
  descripcion: string;
  complejidad: number;
  tipocontrato: number;
  tipoproyecto: number;
  tiposervicio: number;
  periodocontrato: number;
  tiempoimplantacion: number;
  pagounico: number;
  pagorecurrente: number;
  pagorecurrenteactual: number;
  diferenciaingresos: number;
  vanvai: number;
  payback: number;
  oportunidad: string;


}