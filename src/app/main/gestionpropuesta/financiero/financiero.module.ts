import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FinancieroComponent } from './financiero.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FinancieroService } from '../financiero/financiero.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import { CMIModule } from './componentes/cmi/cmi.module';
import { FlujoCajaModule } from './componentes/flujocaja/flujocaja.module';
const routes: Routes = [
    {
        path: '**',
        component: FinancieroComponent,
        resolve: {}
    }
];

@NgModule({
    declarations: [
        FinancieroComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        FormsModule,        
        NgxMaskModule.forRoot(),
        CMIModule,
        FlujoCajaModule
    ],    
    providers: [
        FinancieroService
    ],
    exports: [
        CMIModule,
        FlujoCajaModule        
    ]
})
export class FinancieroModule {

}




