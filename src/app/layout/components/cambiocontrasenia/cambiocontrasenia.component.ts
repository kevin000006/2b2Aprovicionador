import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { compararContrasenia } from './comparar.contrasenia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CambioContraseñaService } from './cambiocontrasenia.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioModel } from 'app/model/Usuario';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertConfirmCambioContraseniaComponent } from '../alertConfirmCambioContrasenia/alertConfirmCambioContrasenia.component';
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'cambiocontrasenia.component.html',
  styleUrls: ['cambiocontrasenia.component.css'],
})
export class CambiarContraseniaComponent implements OnInit {

  public authError: boolean;

  registerForm: FormGroup;
  submitted = false;
  hidePasswordActual = true;
  hidePassword = true;
  hideConfirmPassword = true;
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private _cambiarclaveservice: CambioContraseñaService,
    private _snack: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CambiarContraseniaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.authError = false;

  }
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
    // this.submitted = true;
    // if (!this.registerForm.valid)
    //     return;
    const dialogRef = this.dialog.open(AlertConfirmCambioContraseniaComponent, {
      width: '760px',
      height: '280px',
      position: {
        'top': '150px'
      },
      panelClass: 'custom-modalbox',
      data: {
        message: '¿Maria Ramos, estás segúro(a) de cambiar tu contraseña?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.submitted = true;
        let item = JSON.parse(localStorage.getItem('u'));
        const u = new UsuarioModel();
        u.id = item.id;
        u.passwordActual = this.registerForm.value.passwordActual;
        u.confirmPassword = this.registerForm.value.confirmPassword;
        this._cambiarclaveservice.cambiarclave(u).subscribe(res => {
          if (res.id != null) {
            this.authError = true;
            this.dialogRef.close(res);
            let snack = this._snack.open(res.mensaje, 'Ok');
            snack.afterDismissed().subscribe(() => {
              debugger;
              localStorage.clear();
              this._router.navigate(['login-2']);
            });
          } else {
            this.authError = true;
            this._snack.open(res.mensaje, 'Ok', {
              duration: 3000,
            });
          }
        });
        return;
      }
    });
  }
}

