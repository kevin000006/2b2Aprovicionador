import { NgModule,LOCALE_ID } from '@angular/core';
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
import { MatDialogModule } from '@angular/material/dialog';
import { AlertConfirmModule } from '../alertConfirm/alertConfirm.module';
import { AlertSuccessModule } from '../alertSuccess/alertSuccess.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);
@NgModule({
    declarations: [
        OfertaEquipamientoComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatTableModule,
        MatInputModule,
        MatSelectModule,
        MatMenuModule,
        MatDialogModule,
        AlertConfirmModule,
        MatTooltipModule,
        AlertSuccessModule
    ],
    providers: [
        
        { provide: LOCALE_ID, useValue: 'es' }
    ],
    exports: [
        OfertaEquipamientoComponent
    ]
})
export class OfertaEquipamientoModule { }