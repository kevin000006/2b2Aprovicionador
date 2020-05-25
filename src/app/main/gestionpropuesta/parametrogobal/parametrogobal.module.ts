import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ParametroGlobalComponent } from './parametrogobal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ParametroGlobalService } from './parametrogobal.service';
import { FormsModule } from '@angular/forms';
import { FileInputModule } from '../oferta/componentes/fileinput/fileinput.module';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
// import { CMIModule } from './componentes/cmi/cmi.module';
// import { FlujoCajaModule } from './componentes/flujocaja/flujocaja.module';
const routes: Routes = [
    {
        path: '**',
        component: ParametroGlobalComponent,
        resolve: {}
    }
];

@NgModule({
    declarations: [
        ParametroGlobalComponent,
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
        FileInputModule,
        NgxMaskModule.forRoot(),
        // CMIModule,
        // FlujoCajaModule
    ],    
    providers: [
        ParametroGlobalService
    ],
    exports: [
        // CMIModule,
        // FlujoCajaModule        
    ]
})
export class ParametroGlobalModule {

}




