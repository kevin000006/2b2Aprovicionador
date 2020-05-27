import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
@Component({
    selector: 'ParametroGlobar',
    templateUrl: './parametrogobal.component.html',
    styleUrls: ['./parametrogobal.component.css'],
})
export class ParametroGlobalComponent {    
    _filtro: any = { nroItmes:5};
    displayedColumns: string[] = ['grupo', 'concepto', 'parametro'];
    dataSource = new MatTableDataSource<EquipacmientoElement>(dataSourceList);
    constructor() {        
    }    
    public changeSizeItems(items):void{
      //this.filtrarData(items);
    }
}

const dataSourceList: EquipacmientoElement[] = [
    { id: 1, grupo: 'COSTOS DIRECTOS', concepto: 'Opex de Infraestructura de Red', parametro: 'Eficiencia Tecnica IPVN'},
    { id: 2, grupo: 'COSTOS DIRECTOS', concepto: '3.5Ghz', parametro: 'Costro Espectro 3.5 Ghz'},
    { id: 3, grupo: 'COSTOS DIRECTOS', concepto: 'Mantenimiento Servicio Satelital', parametro: 'Depreciacion Residual Satelital' },
    { id: 4, grupo: 'COSTOS DIRECTOS', concepto: 'Mantenimiento Servicio Satelital', parametro: 'Depreciacion Residual Satelital' },
    { id: 5, grupo: 'COSTOS DIRECTOS', concepto: 'Mantenimiento Servicio Satelital', parametro: 'Depreciacion Residual Satelital' },
    { id: 6, grupo: 'COSTOS DIRECTOS', concepto: 'Mantenimiento Servicio Satelital', parametro: 'Depreciacion Residual Satelital' }
  ];
  export interface EquipacmientoElement {
    id: number;
    grupo: string;
    concepto: string;
    parametro: string;    
  }