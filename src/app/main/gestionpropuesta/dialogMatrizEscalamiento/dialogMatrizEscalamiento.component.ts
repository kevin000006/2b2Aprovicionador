import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'DialogMatrizEscalamiento',
    templateUrl: './dialogMatrizEscalamiento.component.html',
    styleUrls: ['./dialogMatrizEscalamiento.component.css'],
})
export class DialogMatrizEscalamientoComponent {
    titulo: string = ""
    valor: number = 0
    confirmButtonText = "Yes"
    cancelButtonText = "Cancel"
    row:any;
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<DialogMatrizEscalamientoComponent>) {
        if (data) {
            this.titulo = data.titulo || this.titulo;
            this.row =data.row;
            console.log(this.row);
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    onConfirmClick(): void {
        let datos={
            respuesta: true,
            row:this.row
        };
        this.dialogRef.close(datos);
    }
    onCancelcick(): void {
        this.dialogRef.close();
    }    
}

