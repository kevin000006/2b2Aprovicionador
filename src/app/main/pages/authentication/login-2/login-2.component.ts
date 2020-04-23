import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginService } from './login-2.service'
import { UsuarioModel } from 'app/model/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'login-2',
    templateUrl: './login-2.component.html',
    styleUrls: ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Login2Component implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */

    public authError: boolean;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _loginService: LoginService,
        private _snack: MatSnackBar
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        this.authError = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    login(): void {
        const u = new UsuarioModel();
        u.id = 0;
        u.usuario = this.loginForm.value.usuario;
        u.clave = this.loginForm.value.password;
        this._loginService.autenticacion(u).subscribe(res => {
            
            if (res != null) {
                this._router.navigate(['gestion-propuesta/bandeja'], { state: { usuario: res } });
            } else {
                this.authError = true;
                //console.log('SIN ACCESO');
                // this._snack.open('Message', '', {
                //     duration: 3000,
                //     panelClass: ['simple-snack-bar']
                // });
                this._snack.open('SIN ACCESO', 'Ok', {
                    duration: 2000,
                });
            }
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            usuario: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }
}
