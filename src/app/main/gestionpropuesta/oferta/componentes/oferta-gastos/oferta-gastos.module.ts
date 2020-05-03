import { NgModule } from '@angular/core';
import { OfertaGastosComponent } from './oferta-gastos.component'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
    declarations: [
        OfertaGastosComponent
    ],
    imports: [
        MatIconModule,
        MatTableModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    exports: [
        OfertaGastosComponent
    ]
})
export class OfertaGastosModule { }