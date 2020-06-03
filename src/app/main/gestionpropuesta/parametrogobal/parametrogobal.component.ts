import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ParametroGlobalService } from './parametrogobal.service';
import { DialogeficienciaTecnicaComponent } from '../dialogeficienciaTecnica/dialogeficienciaTecnica.component';
@Component({
  selector: 'ParametroGlobar',
  templateUrl: './parametrogobal.component.html',
  styleUrls: ['./parametrogobal.component.css'],
})
export class ParametroGlobalComponent implements OnInit {
  _filtro: any = { nroItmes: 5 };
  displayedColumns: string[] = ['grupo', 'concepto', 'parametro'];
  dataSource: any;
  //dataSource = new MatTableDataSource<EquipacmientoElement>(dataSourceList);
  constructor(
    public dialog: MatDialog,
    private servicioParametroGlobal: ParametroGlobalService
  ) {
  }

  ngOnInit(): void {
    this.servicioParametroGlobal.obtenerparametros().subscribe(data => {
      if (data != null) {
        this.dataSource = data
      }
    });
  }

  editarRow(row: any): void {
    const dialogRef = this.dialog.open(DialogeficienciaTecnicaComponent, {
      width: '650px',
      data: {
        titulo: 'Eficiencia Tecnica IPVN',
        buttonText: {
          ok: 'Guardar',
          cancel: 'Cancelar'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();

        // var objetoOfertaOpex = this.dataSourceList.find(function (element) { return element.ofertasDetalleId == item.ofertasDetalleId; });
        // if (objetoOfertaOpex.estado == 0) {// si el registro es agregado, entonce se elimina
        //   var ObjectIndex = this.dataSourceList.findIndex(function (obj) { return obj.ofertasDetalleId === item.ofertasDetalleId; });//Obtenemos el Index del List de Objetos        
        //   this.dataSourceList.splice(ObjectIndex, 1);
        // } else // si el registro ya existe en la base de datos se actualizara el estado 2: Inactivo
        //   objetoOfertaOpex.estado = 2;
        // //Listamos los registro que estan agregado o modificados                        
        // this.dataSource = new MatTableDataSource<any>(this.dataSourceList.filter(function (obj) {
        //   return obj.estado == 0 || obj.estado == 1 || obj.estado == -1
        // }));
      }
    });    
  }

  public changeSizeItems(items): void {
    //this.filtrarData(items);
  }
}

const dataSourceList: EquipacmientoElement[] = [
  { id: 1, grupo: 'COSTOS DIRECTOS', concepto: 'Opex de Infraestructura de Red', parametro: 'Eficiencia Tecnica IPVN' },
  { id: 2, grupo: 'COSTOS DIRECTOS', concepto: '3.5Ghz', parametro: 'Costro Espectro 3.5 Ghz' },
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