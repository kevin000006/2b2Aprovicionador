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
        titulo: row.nombre,
        valor : row.valor,
        buttonText: {
          ok: 'Guardar',
          cancel: 'Cancelar'
        }
      }
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.respuesta) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        row.valor=res.valor,
        this.servicioParametroGlobal.guardarparametro(row.parametro_id ,res.valor).subscribe((res: any) => {
          console.log(res);
        });       
      }
    });    
  }  
}

