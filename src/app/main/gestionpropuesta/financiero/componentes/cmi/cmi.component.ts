import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'CMI',
    templateUrl: './cmi.component.html',
    styleUrls: ['./cmi.component.css'],
})
export class CMIComponent {   
    displayedColumns: string[] = ['linea', 'sublinea', 'serviciocmi', 'productoaf', 'porcentaje'];
    dataSource = new MatTableDataSource<EquipacmientoElement>(dataSourceList); 
    constructor() {        
    }    
}

const dataSourceList: EquipacmientoElement[] = [
    { id: 1, linea: 'DATOS E INTERNET', sublinea: 'SERVICIO SATELITALES NACIONALES', servicio: 'CLEAR CHANNEL N.S', productoaf: 'CLEAR CHANNEL VIA SATELITE', porcentaje: '81.6%'},
    { id: 2, linea: 'DATOS E INTERNET', sublinea: 'ACCESO A INTERNET', servicio: 'INFOINTERNET', productoaf: 'INFOINTERNET', porcentaje: '0.1%'},
    { id: 3, linea: 'DATOS E INTERNET', sublinea: 'RPVS', servicio: 'IP METRO', productoaf: 'IP VPN ACCESO INTERNET', porcentaje: '18.3%' }
  ];
  export interface EquipacmientoElement {
    id: number;
    linea: string;
    sublinea: string;
    servicio: string;
    productoaf: string;
    porcentaje: string;    
  }