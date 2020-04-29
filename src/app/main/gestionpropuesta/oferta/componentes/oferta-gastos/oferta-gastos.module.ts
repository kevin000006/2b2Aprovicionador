import { NgModule } from '@angular/core';
import { OfertaGastosComponent } from './oferta-gastos.component'
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    declarations: [
        OfertaGastosComponent
    ],
    imports     : [
        MatIconModule,
        MatTableModule,
        MatMenuModule
    ],
    exports:[
        OfertaGastosComponent
    ]
})
export class OfertaGastosModule{}