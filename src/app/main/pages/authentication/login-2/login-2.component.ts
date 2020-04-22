import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

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
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    login(): void {
<<<<<<< HEAD
        const u = new UsuarioModel();
        u.id = 0;
        u.usuario = this.loginForm.value.usuario;
        u.clave = this.loginForm.value.password;
        debugger;
        this._loginService.autenticacion(u).subscribe(res => {
            debugger;
            if (res != null) {
                this._router.navigate(['gestion-propuesta/bandeja'], { state: { usuario: res } });
            } else {
                this.authError = true;
                console.log('SIN ACCESO');
                // this._snack.open('Message', '', {
                //     duration: 3000,
                //     panelClass: ['simple-snack-bar']
                // });
                this._snack.open('SIN ACCESO', 'Ok', {
                    duration: 2000,
                });
            }
        });
=======
        console.log('ss');
        this._router.navigate(['gestion-propuesta/bandeja']);
>>>>>>> 35ad2440df29c8bbf7902e37d68856689122c153
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
