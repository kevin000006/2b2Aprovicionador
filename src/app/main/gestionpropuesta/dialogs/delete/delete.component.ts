import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {BandejaModel} from '../../models/oferta';
import {BandejaService} from '../../bandeja/bandeja.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BandejaModel,
    private bandejaService : BandejaService) { }

    cancelar(){
      this.dialogRef.close();
    }

    confirmar(){

      this.bandejaService.deleteOferta(this.data).subscribe(res => {
        
      });

    }

}
