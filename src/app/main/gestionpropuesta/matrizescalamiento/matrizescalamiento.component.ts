import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatrizEscalamientoService } from './matrizescalamiento.service';
import { DialogeficienciaTecnicaComponent } from '../dialogeficienciaTecnica/dialogeficienciaTecnica.component';
@Component({
  selector: 'MatrizEscalamiento',
  templateUrl: './matrizescalamiento.component.html',
  styleUrls: ['./matrizescalamiento.component.css'],
})
export class MatrizEscalamientoComponent implements OnInit {
  _filtro: any = { nroItmes: 5 };
  displayedColumns: string[] = ['fcv', 'aprobador', 'van', 'pb'];
  dataSource: any;  
  constructor(
    public dialog: MatDialog,
    private servicioParametroGlobal: MatrizEscalamientoService
  ) {
  }

  ngOnInit(): void {
    this.servicioParametroGlobal.obtenermatrizescalamiento().subscribe(data => {
      if (data != null) {
        this.dataSource = data;
        console.log(data);
      }
    });
  }

  // editarRow(row: any): void {
  //   const dialogRef = this.dialog.open(DialogeficienciaTecnicaComponent, {
  //     width: '650px',
  //     data: {
  //       titulo: row.nombre,
  //       valor : row.valor,
  //       buttonText: {
  //         ok: 'Guardar',
  //         cancel: 'Cancelar'
  //       }
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe((res: any) => {
  //     if (res.respuesta) {
  //       const a = document.createElement('a');
  //       a.click();
  //       a.remove();
  //       row.valor=res.valor,
  //       this.servicioParametroGlobal.guardarparametro(row.parametro_id ,res.valor).subscribe((res: any) => {
  //         console.log(res);
  //       });       
  //     }
  //   });    
  // }  
}

