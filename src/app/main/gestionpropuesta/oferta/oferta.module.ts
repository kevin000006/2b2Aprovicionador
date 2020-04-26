import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OfertaComponent} from './oferta.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
    {
        path     : '**',
        component: OfertaComponent,
        resolve  : {
            
        }
    }
];

@NgModule({
    declarations: [
        OfertaComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatTabsModule,
        MatInputModule,
        MatIconModule
    ],
    providers   : [
        
    ]
})

export class OfertaModule{

}




