import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'DialogeficienciaTecnica',
    templateUrl: './dialogeficienciaTecnica.component.html',
    styleUrls: ['./dialogeficienciaTecnica.component.css'],
})
export class DialogeficienciaTecnicaComponent {
    titulo: string = ""
    confirmButtonText = "Yes"
    cancelButtonText = "Cancel"
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<DialogeficienciaTecnicaComponent>) {
        if (data) {
            this.titulo = data.titulo || this.titulo;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }
    onCancelcick(): void {
        this.dialogRef.close();
    }    
}

