import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OfertaComponent } from './oferta.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ShareDialogComponent } from './componentes/share-dialog/share-dialog.component';
import { OfertaComponentModule } from './componentes/oferta-component.module';
import {FormsModule} from '@angular/forms';

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
        OfertaComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        OfertaComponentModule,
        MatMenuModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        FormsModule
    ],
    entryComponents:[
        
    ],
    providers: [

    ]
})

export class OfertaModule {

}




