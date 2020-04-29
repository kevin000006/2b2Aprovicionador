import { NgModule } from '@angular/core';
import { OfertaCabeceraComponent} from './oferta-cabecera.component';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';



@NgModule({

    declarations: [
        OfertaCabeceraComponent
    ],
    imports     : [
        MatInputModule,
        MatIconModule,
    ],
    exports:[
        OfertaCabeceraComponent
    ]
})
export class OfertaCabeceraModule{

}
