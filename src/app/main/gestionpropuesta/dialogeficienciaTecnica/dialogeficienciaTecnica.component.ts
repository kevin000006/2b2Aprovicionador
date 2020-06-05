import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'DialogeficienciaTecnica',
    templateUrl: './dialogeficienciaTecnica.component.html',
    styleUrls: ['./dialogeficienciaTecnica.component.css'],
})
export class DialogeficienciaTecnicaComponent {
    titulo: string = ""
    valor: number = 0
    confirmButtonText = "Yes"
    cancelButtonText = "Cancel"
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<DialogeficienciaTecnicaComponent>) {
        if (data) {
            this.titulo = data.titulo || this.titulo;
            this.valor = data.valor || this.valor;
            
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    onConfirmClick(): void {
        let datos={
            respuesta: true,
            valor:this.valor
        };
        this.dialogRef.close(datos);
    }
    onCancelcick(): void {
        this.dialogRef.close();
    }    
}

