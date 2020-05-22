import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaCabeceraComponent} from './oferta-cabecera.component';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



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
        MatAutocompleteModule,
        MatProgressSpinnerModule
    ],
    exports:[
        OfertaCabeceraComponent
    ]
})
export class OfertaCabeceraModule{

}
