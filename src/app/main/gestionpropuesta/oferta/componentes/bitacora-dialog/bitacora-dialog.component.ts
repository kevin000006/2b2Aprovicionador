import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-bitacora-dialog',
  templateUrl: './bitacora-dialog.component.html',
  styleUrls: ['./bitacora-dialog.component.scss']
})
export class BitacoraDialogComponent implements OnInit {
  displayedColumns: string[] = ['estado', 'usuario', 'fecha'];
  selected: any = "1";
  dataSource = [
    { estado: 'Analizado por AF', usuario: 'Maria Rosa Ramos', fecha: '08/05/2020 10:55:00 p.m' },
    { estado: 'Evaluado', usuario: 'Maria Rosa Ramos', fecha: '08/05/2020 10:55:00 p.m' },
    { estado: 'En Analisis financiero', usuario: 'Maria Rosa Ramos', fecha: '08/05/2020 10:55:00 p.m' },
    { estado: 'Por reasignar', usuario: 'Maria Rosa Ramos', fecha: '08/05/2020 10:55:00 p.m' },
    { estado: 'En Analisis financiero', usuario: 'Maria Rosa Ramos', fecha: '08/05/2020 10:55:00 p.m' }
  ];
  constructor(
    public dialogRef: MatDialogRef<BitacoraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }  

  closeDialog() {
    this.dialogRef.close()
  }
  ngOnInit(): void {
  }

}
