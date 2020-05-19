import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { OfertaCabeceraModule } from './oferta-cabecera/oferta-cabecera.module';
import { OfertaEquipamientoModule } from './oferta-equipamiento/oferta-equipamiento.module';
import { OfertaGastosModule } from './oferta-gastos/oferta-gastos.module';
import { OfertaServicioModule } from './oferta-servicio/oferta-servicio..module';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { BitacoraDialogComponent } from './bitacora-dialog/bitacora-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({

    declarations: [
        ShareDialogComponent,
        BitacoraDialogComponent],
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        CommonModule,
        MatSortModule,
        OfertaCabeceraModule,
        OfertaEquipamientoModule,
        OfertaGastosModule,
        OfertaServicioModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatMenuModule,
        MatButtonModule,
        MatDividerModule,
        FormsModule,
        MatDialogModule
    ],
    entryComponents:[
        BitacoraDialogComponent
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
