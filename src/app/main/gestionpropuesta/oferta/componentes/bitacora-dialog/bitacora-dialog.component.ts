import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-bitacora-dialog',
  templateUrl: './bitacora-dialog.component.html',
  styleUrls: ['./bitacora-dialog.component.scss']
})
export class BitacoraDialogComponent implements OnInit {

  dataSource=[
    {estado:'Registrado', usuario:'Maria Rosa Ramos', fecha:'08/05/2020 10:55:00 p.m'}
  ];

  constructor(public dialogRef: MatDialogRef<BitacoraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


    displayedColumns: string[] = ['estado','usuario','fecha'];

    closeDialog(){
      this.dialogRef.close()
    }


  ngOnInit(): void {
  }

}
