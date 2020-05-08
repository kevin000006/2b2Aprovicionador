import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { OfertaCabeceraModule } from './oferta-cabecera/oferta-cabecera.module';
import { OfertaEquipamientoModule } from './oferta-equipamiento/oferta-equipamiento.module';
import { OfertaGastosModule } from './oferta-gastos/oferta-gastos.module';
import { OfertaServicioModule } from './oferta-servicio/oferta-servicio..module';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { BitacoraDialogComponent } from './bitacora-dialog/bitacora-dialog.component';

@NgModule({

    declarations: [
    ShareDialogComponent,
    BitacoraDialogComponent],
    imports: [
        OfertaCabeceraModule,
        OfertaEquipamientoModule,
        OfertaGastosModule,
        OfertaServicioModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatMenuModule
    ],
    exports: [
        OfertaCabeceraModule,
        OfertaEquipamientoModule,
        OfertaGastosModule,
        OfertaServicioModule
    ]
})
export class OfertaComponentModule {

}
