import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'oferta-equipamiento',
  templateUrl: './oferta-equipamiento.component.html',
  styleUrls: ['./oferta-equipamiento.component.scss']
})
export class OfertaEquipamientoComponent implements OnInit {


  constructor() { }

  dataSource:EquipacmientoElement[]=[
    {tipo:'Equipos de seguridad',condicion:'No stock', antigueadad:'-', marca:'Balanceador',modelo:'1',cantidad:'1',moneda:'$',costo:'13,189.86',costototal:'13,189.86'},
    {tipo:'Equipos de seguridad',condicion:'No stock', antigueadad:'-', marca:'Balanceador',modelo:'1',cantidad:'1',moneda:'$',costo:'13,189.86',costototal:'13,189.86'},
    {tipo:'Equipos de seguridad',condicion:'No stock', antigueadad:'-', marca:'Balanceador',modelo:'1',cantidad:'1',moneda:'$',costo:'13,189.86',costototal:'13,189.86'}
  ];
  displayedColumns: string[] = ['accion', 'tipo', 'condicion', 'antigueadad','marca','modelo','cantidad','moneda','costo','costototal'];

  ngOnInit(): void {
  }

}

export interface EquipacmientoElement {
  tipo: string;
  condicion: string;
  antigueadad: string;
  marca: string;
  modelo: string;
  cantidad: string;
  moneda: string;
  costo: string;
  costototal:string;
}