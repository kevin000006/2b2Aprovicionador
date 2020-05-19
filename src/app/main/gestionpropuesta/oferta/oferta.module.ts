import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OfertaComponent } from './oferta.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { OfertaComponentModule } from './componentes/oferta-component.module';
import { FormsModule } from '@angular/forms';
import { FileInputModule } from '../oferta/componentes/fileinput/fileinput.module';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import { BitacoraDialogComponent } from './componentes/bitacora-dialog/bitacora-dialog.component';

const routes: Routes = [
    {
        path: '**',
        component: OfertaComponent,
        resolve: {

        }
    }
];

@NgModule({
    declarations: [
        OfertaComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        OfertaComponentModule,
        MatMenuModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        FormsModule,
        FileInputModule,
        NgxMaskModule.forRoot() 
    ],
    entryComponents: [
        BitacoraDialogComponent
    ],
    providers: [

    ]
})

export class OfertaModule {

}




