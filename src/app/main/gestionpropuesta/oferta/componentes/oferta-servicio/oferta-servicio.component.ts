import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'oferta-servicio',
  templateUrl: './oferta-servicio.component.html',
  styleUrls: ['./oferta-servicio.component.css']
})
export class OfertaServicioComponent implements OnInit {

  listaCircuito: ModelCombo[] = [];
  listaServicio: ModelCombo[] = [];
  listaMedio: ModelCombo[] = [];
  listBw: ModelCombo[] = [];
  listLDN: ModelCombo[] = [];
  listVoz: ModelCombo[] = [];
  listVideo: ModelCombo[] = [];
  listPlatinium: ModelCombo[] = [];
  listOro: ModelCombo[] = [];
  listPlata: ModelCombo[] = [];
  listBronce: ModelCombo[] = [];

  listAccionISIS: ModelCombo[] = [];
  listTipoSede: ModelCombo[] = [];


  displayedColumns: string[] = [
    'accion', 'sede', 'direccion', 'ubigeo', 'geo',
    'contacto', 'telefono', 'circuito', 'nrocircuito',
    'servicio', 'medio', 'bw', 'ldn', 'voz', 'video',
    'platinium', 'oro', 'plata', 'bronce',
    'equipoterminal', 'router', 'otro', 'facturacion', 'acccionisis', 'tiposede'];
  dataSource = new MatTableDataSource<EquipacmientoElement>(dataSourceList);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor() { }
  //
  ngOnInit(): void {

    //Lenar combo Circuito
    this.listaCircuito.push(new ModelCombo("1", "Circuito 1"));
    this.listaCircuito.push(new ModelCombo("2", "Circuito 2"));
    this.listaCircuito.push(new ModelCombo("3", "Circuito 3"));
    this.listaCircuito.push(new ModelCombo("4", "Circuito 4"));
    //Lenar combo Servicio
    this.listaServicio.push(new ModelCombo("1", "Servicio 1"));
    this.listaServicio.push(new ModelCombo("2", "Servicio 2"));
    this.listaServicio.push(new ModelCombo("3", "Servicio 3"));
    this.listaServicio.push(new ModelCombo("4", "Servicio 4"));
    //Lenar combo Medio
    this.listaMedio.push(new ModelCombo("1", "Medio 1"));
    this.listaMedio.push(new ModelCombo("2", "Medio 2"));
    this.listaMedio.push(new ModelCombo("3", "Medio 3"));
    this.listaMedio.push(new ModelCombo("4", "Medio 4"));
    //Lenar combo Bw
    this.listBw.push(new ModelCombo("1", "Bw 1"));
    this.listBw.push(new ModelCombo("2", "Bw 2"));
    this.listBw.push(new ModelCombo("3", "Bw 3"));
    this.listBw.push(new ModelCombo("4", "Bw 4"));
    //Lenar combo LDN
    this.listLDN.push(new ModelCombo("1", "Si"));
    this.listLDN.push(new ModelCombo("2", "No"));
    //Lenar combo Voz
    this.listVoz.push(new ModelCombo("1", "Kbps"));
    this.listVoz.push(new ModelCombo("2", "Mbps"));
    //Lenar combo Video
    this.listVideo.push(new ModelCombo("1", "Kbps"));
    this.listVideo.push(new ModelCombo("2", "Mbps"));
    //Lenar combo Platinium
    this.listPlatinium.push(new ModelCombo("1", "Kbps"));
    this.listPlatinium.push(new ModelCombo("2", "Mbps"));
    //Lenar combo Oro
    this.listOro.push(new ModelCombo("1", "Kbps"));
    this.listOro.push(new ModelCombo("2", "Mbps"));
    //Lenar combo plata
    this.listPlata.push(new ModelCombo("1", "Kbps"));
    this.listPlata.push(new ModelCombo("2", "Mbps"));
    //Lenar combo bronce
    this.listBronce.push(new ModelCombo("1", "Kbps"));
    this.listBronce.push(new ModelCombo("2", "Mbps"));
    //Lenar combo plata
    this.listAccionISIS.push(new ModelCombo("1", "(B/A) Traslado con nombre"));
    this.listAccionISIS.push(new ModelCombo("2", "(B/A) Traslado con Apellido"));
    //Lenar combo bronce
    this.listTipoSede.push(new ModelCombo("1", "Principal"));
    this.listTipoSede.push(new ModelCombo("2", "Secundario"));

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
const dataSourceList: EquipacmientoElement[] = [
  {
    sede: 'Av. Argentina', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "1", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },
  {
    sede: 'Av. Argentina 2', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },
  {
    sede: 'Av. Argentina 3', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },  
  {
    sede: 'Av. Argentina 3', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },  
  {
    sede: 'Av. Argentina 3', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },  
  {
    sede: 'Av. Argentina 3', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },  
  {
    sede: 'Av. Argentina 3', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },  
  {
    sede: 'Av. Argentina 3', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },  
  {
    sede: 'Av. Argentina 3', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },  
  {
    sede: 'Av. Argentina 3', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },  
  {
    sede: 'Av. Argentina 3', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },  
  {
    sede: 'Av. Argentina 3', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador',
    contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754', circuito: "", nrocircuito: "1", servicio: "1",
    medio: "1", bw: "1", nrobw: "2", ldn: "1", voz: "1", nrovoz: "12", video: "1", nrovideo: "10",
    platinium: "1", nroplatinium: "10", oro: "1", nrooro: "10", plata: "1", nroplata: "10", bronce: "1", nrobronce: "10",
    equipoterminal:"",router:"",facturacion:"",acccionisis:"",tiposede:""
  },  
];
export interface EquipacmientoElement {
  sede: string;
  direccion: string;
  ubigeo: string;
  geo: string;
  contacto: string;
  telefono: string;
  circuito: string;
  nrocircuito: string;
  servicio: string;
  medio: string;
  bw: string;
  nrobw: string;
  ldn: string;
  voz: string;
  nrovoz: string;
  video: string;
  nrovideo: string;
  platinium: string;
  nroplatinium: string;
  oro: string;
  nrooro: string;
  plata: string;
  nroplata: string;
  bronce: string;
  nrobronce: string;

  equipoterminal: string;
  router: string;
  //otro: string;
  facturacion: string;
  acccionisis: string;
  tiposede: string;

}

//   'equipoterminal', 'router', 'otro', 'facturacion', 'acccionisis', 'tiposede'
export class ModelCombo {
  constructor(public id?: string, public nombre?: string) {
  }
}