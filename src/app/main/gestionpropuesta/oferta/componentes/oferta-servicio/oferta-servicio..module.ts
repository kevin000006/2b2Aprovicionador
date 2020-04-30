import { NgModule } from '@angular/core';
import { OfertaServicioComponent } from './oferta-servicio.component'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    declarations: [
        OfertaServicioComponent
    ],
    imports: [
        MatIconModule,
        MatTableModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule
    ],
    exports: [
        OfertaServicioComponent
    ]
})
export class OfertaServicioModule { }