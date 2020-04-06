import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {MclienteComponent} from './mcliente.component';
import {MatIconModule} from '@angular/material/icon';

import {MclienteService} from './mcliente.service';


const routes: Routes = [
    {
        path     : '**',
        component: MclienteComponent,
        resolve  : {}
    }
];

@NgModule({
    declarations: [
        MclienteComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatIconModule
    ],
    entryComponents: [
    ],
    providers   : [
        MclienteService
    ]
})

export class MClienteModule{}
