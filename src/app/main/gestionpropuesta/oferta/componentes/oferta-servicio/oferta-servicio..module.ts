import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfertaServicioComponent } from './oferta-servicio.component'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { getSpanishPaginatorIntl } from './spanish-paginator-intl';
import { MatPaginatorIntl } from '@angular/material/paginator/';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { GeodialogComponent } from '../geoDialog/geoDialog.component';
import { AgmCoreModule } from '@agm/core';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    declarations: [
        OfertaServicioComponent,
        AlertConfirmComponent,
        GeodialogComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatTableModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAXad7GnKMu4Dus2bKXRiKGFnsCmivbLj8'
        })
    ],
    providers: [
        { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
    ],
    exports: [
        OfertaServicioComponent
    ]
})
export class OfertaServicioModule { }