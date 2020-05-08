import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import {BandejaService} from '../../bandeja.service';

@Component({
  selector: 'app-question-dialogs',
  templateUrl: './question-dialogs.component.html',
  styleUrls: ['./question-dialogs.component.scss']
})
export class QuestionDialogsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QuestionDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bandejaService: BandejaService) {
    
  }

  ngOnInit(): void {
  }


  confirmar(){
    this.bandejaService.accionOferta(this.data.accion,this.data.data).subscribe(response => {

      this.dialogRef.close();
    
    });
  }

  

}
