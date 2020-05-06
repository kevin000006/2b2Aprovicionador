import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {RedirectBandejaComponent} from './redirect-bandeja.component';

const routes: Routes = [
    {
        path     : '**',
        component: RedirectBandejaComponent,
        resolve  : {
            
        }
    }
];

@NgModule({
    declarations: [
        RedirectBandejaComponent
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(routes),
        FuseSharedModule        
    ],
    entryComponents: [
    ],
    providers   : [
        
    ]
})
export class RedirectBandejaModule
{
}


