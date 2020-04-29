import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {OfertaCabeceraModule} from './oferta-cabecera/oferta-cabecera.module';
import { OfertaEquipamientoModule } from './oferta-equipamiento/oferta-equipamiento.module';
import { OfertaGastosModule } from './oferta-gastos/oferta-gastos.module';



@NgModule({

    declarations: [
        ],
    imports     : [
        OfertaCabeceraModule,
        OfertaEquipamientoModule,
        OfertaGastosModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatMenuModule
    ],
    exports:[
        OfertaCabeceraModule,
        OfertaEquipamientoModule,
        OfertaGastosModule
    ]
})
export class OfertaComponentModule{

}
