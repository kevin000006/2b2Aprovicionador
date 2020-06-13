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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAfComponent } from './dialog-af/dialog-af.component';
import { RechazarOfertaComponent } from './rechazar-oferta/rechazar-oferta.component';
@NgModule({

    declarations: [
        ShareDialogComponent,
        BitacoraDialogComponent,
        DialogAfComponent,
        RechazarOfertaComponent],
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
        MatCheckboxModule,
        MatMenuModule,
        MatButtonModule,
        MatDividerModule,
        FormsModule,
        MatDialogModule
    ],
    entryComponents:[
        BitacoraDialogComponent,
        DialogAfComponent
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
