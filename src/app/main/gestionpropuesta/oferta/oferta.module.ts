import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfertaComponent } from './oferta.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { OfertaComponentModule } from './componentes/oferta-component.module';
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
        OfertaComponentModule,
        MatMenuModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule
    ],
    providers: [

    ]
})

export class OfertaModule {

}




