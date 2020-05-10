import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaCabeceraComponent} from './oferta-cabecera.component';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({

    declarations: [
        OfertaCabeceraComponent
    ],
    imports     : [
        CommonModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        MatAutocompleteModule
    ],
    exports:[
        OfertaCabeceraComponent
    ]
})
export class OfertaCabeceraModule{

}
