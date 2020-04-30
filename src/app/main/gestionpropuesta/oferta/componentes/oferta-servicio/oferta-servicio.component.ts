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
  displayedColumns: string[] = ['accion', 'sede', 'direccion', 'ubigeo', 'geo', 'contacto', 'telefono'];  
  dataSource = new MatTableDataSource<EquipacmientoElement>(dataSourceList);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor() { }
  ngOnInit(): void {
    debugger;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
const dataSourceList: EquipacmientoElement[] = [
  { sede: 'Av. Argentina', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador', contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754' },
  { sede: 'Av. Argentina 2', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador', contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754' },
  { sede: 'Av. Argentina 3', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador', contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754' },
  { sede: 'Av. Argentina 4', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador', contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754' },
  { sede: 'Av. Argentina 5', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador', contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754' },
  { sede: 'Av. Argentina 6', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador', contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754' },
  { sede: 'Av. Argentina 7', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador', contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754' },
  { sede: 'Av. Argentina 8', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador', contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754' },
  { sede: 'Av. Argentina 9', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador', contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754' },
  { sede: 'Av. Argentina 10', direccion: 'Av. Argentina 121', ubigeo: 'Callao. Callao, Callao', geo: 'Balanceador', contacto: 'Jorge Omar Berrocal Sambrano', telefono: '983150754' }
];
export interface EquipacmientoElement {
  sede: string;
  direccion: string;
  ubigeo: string;
  geo: string;
  contacto: string;
  telefono: string;
}