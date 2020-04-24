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

    ngOnInit() {
        this.registerForm = this.formBuilder.group({            
            passwordActual: ['', Validators.required],            
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.{1,}$)(?=.*\W).*$/)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: compararContrasenia('password', 'confirmPassword')
        });
    }    
    get f() { return this.registerForm.controls; }
    onNoClick(): void {
        this.dialogRef.close();
    }
    onSubmit() {
        debugger;
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }
}

