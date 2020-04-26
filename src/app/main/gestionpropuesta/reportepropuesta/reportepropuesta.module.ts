import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportepropuestaComponent} from './reportepropuesta.component';


const routes: Routes = [
    {
        path     : '**',
        component: ReportepropuestaComponent,
        resolve  : {
            
        }
    }
];

@NgModule({
    declarations: [
        ReportepropuestaComponent
    ],
    imports     : [
        RouterModule.forChild(routes)
    ],
    providers   : [
        
    ]
})

export class ReportepropuestaModule{

}
