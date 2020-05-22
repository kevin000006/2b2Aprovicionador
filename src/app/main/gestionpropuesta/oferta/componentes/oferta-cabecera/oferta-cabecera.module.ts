import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaCabeceraComponent} from './oferta-cabecera.component';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';



@NgModule({

    declarations: [
        OfertaCabeceraComponent
    ],
    imports     : [
        CommonModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        FormsModule,
        NgxMaskModule.forRoot(),
        MatAutocompleteModule
    ],
    exports:[
        OfertaCabeceraComponent
    ]
})
export class OfertaCabeceraModule{

}
