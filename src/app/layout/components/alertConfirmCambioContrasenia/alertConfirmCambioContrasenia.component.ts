import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioModel } from 'app/model/Usuario';
import { Router } from '@angular/router';

@Component({
    selector: 'AlertConfirm',
    templateUrl: 'alertConfirmCambioContrasenia.component.html',
    styleUrls: ['alertConfirmCambioContrasenia.component.css'],
})
export class AlertConfirmCambioContraseniaComponent {
    message: string = "Are you sure?"
    confirmButtonText = "Yes"
    cancelButtonText = "Cancel"
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<AlertConfirmCambioContraseniaComponent>) {
        if (data) {
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }
}

