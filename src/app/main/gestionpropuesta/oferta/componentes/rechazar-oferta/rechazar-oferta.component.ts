import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject,ViewChild,ElementRef  } from '@angular/core';

@Component({
  selector: 'app-rechazar-oferta',
  templateUrl: './rechazar-oferta.component.html',
  styleUrls: ['./rechazar-oferta.component.scss']
})
export class RechazarOfertaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RechazarOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onCancelcick():void{
    this.dialogRef.close();
  }

  onAceptclick():void{
    this.dialogRef.close(this.data.motivo);
  }

}
