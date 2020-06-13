import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ReportepropuestaComponent} from './reportepropuesta.component';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


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
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        MatCardModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule
    ],
    providers   : [
        
    ]
})

export class ReportepropuestaModule{

}
