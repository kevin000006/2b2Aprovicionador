import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { compararContrasenia } from './comparar.contrasenia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'cambiocontrasenia.component.html',
    styleUrls: ['cambiocontrasenia.component.css'],
})
export class CambiarContraseniaComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    hidePasswordActual = true;
    hidePassword = true;
    hideConfirmPassword = true;
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CambiarContraseniaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    get f() { return this.registerForm.controls; }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            passwordActual: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.{1,}$)(?=.*\W).*$/)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: compararContrasenia('password', 'confirmPassword')
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    onSubmit() {        
        this.submitted = true;
        // deténgase aquí si el formulario no es válido
        if (this.registerForm.invalid) {
            return;
        }
        let data = {
            respuesta :"ok"
        }
        this.dialogRef.close(data);
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }
}

