import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {SharedComponent} from './shared.component';

const routes: Routes = [
    {
        path     : '**',
        component: SharedComponent,
        resolve  : {
            
        }
    }
];


@NgModule({
    declarations: [
        SharedComponent
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
export class SharedModule
{
}