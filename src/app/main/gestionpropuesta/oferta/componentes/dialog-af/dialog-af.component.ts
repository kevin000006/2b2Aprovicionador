import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject,ViewChild,ElementRef  } from '@angular/core';
import { CommonService} from 'app/common.service';

@Component({
  selector: 'app-dialog-af',
  templateUrl: './dialog-af.component.html',
  styleUrls: ['./dialog-af.component.scss']
})
export class DialogAfComponent implements OnInit {

  lstAnalistasFinancieros=[];
  constructor(
    public dialogRef: MatDialogRef<DialogAfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service : CommonService
  ) { }

  ngOnInit(): void {

    this.service.getAllAnalistasFinanciero().subscribe(result =>{
      this.lstAnalistasFinancieros = result;
    });

  }

  onCancelcick():void{
    this.dialogRef.close();
  }

  onAceptclick():void{
    this.dialogRef.close(this.data.analistaFinanciero);
  }

}
