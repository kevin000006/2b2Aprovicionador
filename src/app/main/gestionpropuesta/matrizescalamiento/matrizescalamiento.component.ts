import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatrizEscalamientoService } from './matrizescalamiento.service';
import { DialogMatrizEscalamientoComponent } from '../dialogMatrizEscalamiento/dialogMatrizEscalamiento.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'MatrizEscalamiento',
  templateUrl: './matrizescalamiento.component.html',
  styleUrls: ['./matrizescalamiento.component.css'],
})
export class MatrizEscalamientoComponent implements OnInit {
  _filtro: any = { nroItmes: 5 };
  displayedColumns: string[] = ['fcv', 'aprobador', 'van', 'pb','accion'];
  dataSource: any;  
  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private servicioMatrizEscalamiento: MatrizEscalamientoService
  ) {
  }

  ngOnInit(): void {
    this.servicioMatrizEscalamiento.obtenermatrizescalamiento().subscribe(data => {
      if (data != null) {
        this.dataSource = data;
        console.log(data);
      }
    });
  }
  editarRow(row: any): void {
    const dialogRef = this.dialog.open(DialogMatrizEscalamientoComponent, {
      width: '650px',
      data: {
        titulo: "Matriz de Escalamiento",
        row : row,
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
        row= res.row;
        this.servicioMatrizEscalamiento.guardarmatrizescalamiento(res.row).subscribe((res: any) => {
          debugger;
          this.toastr.success('Se proceso correctamente la información!', '', {
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: true
          });
        });       
        return;
      }
    });    
  } 
  
}

