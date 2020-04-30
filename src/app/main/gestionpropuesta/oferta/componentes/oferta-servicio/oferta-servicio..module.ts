import { NgModule } from '@angular/core';
import { OfertaServicioComponent } from './oferta-servicio.component'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        OfertaServicioComponent
    ],
    imports: [
        MatIconModule,
        MatTableModule,
        MatMenuModule
    ],
    exports: [
        OfertaServicioComponent
    ]
})
export class OfertaServicioModule { }