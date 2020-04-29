import { NgModule } from '@angular/core';
import { OfertaEquipamientoComponent } from './oferta-equipamiento.component'
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
    declarations: [
        OfertaEquipamientoComponent
    ],
    imports     : [
        MatIconModule,
        MatTableModule,
        MatMenuModule
    ],
    exports:[
        OfertaEquipamientoComponent
    ]
})
export class OfertaEquipamientoModule{}