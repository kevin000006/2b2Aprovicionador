import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfertaEquipamientoComponent } from './oferta-equipamiento.component'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    declarations: [
        OfertaEquipamientoComponent
    ],
    imports     : [
        FormsModule,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatTableModule,
        MatInputModule,
        MatSelectModule,
        MatMenuModule
    ],
    exports:[
        OfertaEquipamientoComponent
    ]
})
export class OfertaEquipamientoModule{}