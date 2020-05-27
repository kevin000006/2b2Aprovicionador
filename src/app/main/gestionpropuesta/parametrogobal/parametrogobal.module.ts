import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ParametroGlobalComponent } from './parametrogobal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ParametroGlobalService } from './parametrogobal.service';
import { FileInputModule } from '../oferta/componentes/fileinput/fileinput.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { DialogeficienciaTecnicaModule } from '../dialogeficienciaTecnica/dialogeficienciaTecnica.module';
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
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
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
        DialogeficienciaTecnicaModule,
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




