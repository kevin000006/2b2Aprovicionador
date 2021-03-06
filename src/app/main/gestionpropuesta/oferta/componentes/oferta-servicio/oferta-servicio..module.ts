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
import { AlertConfirmModule } from '../alertConfirm/alertConfirm.module';
import { GeodialogComponent } from '../geoDialog/geoDialog.component';
import { AgmCoreModule } from '@agm/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GeocodeService } from '../geoDialog/geocode.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TextMaskModule } from 'angular2-text-mask';
import { PlantaExternaComponent } from '../planta-externa/planta-externa.component';
import { PlantaExternaService } from '../planta-externa/planta-externa.service';
@NgModule({
    declarations: [
        OfertaServicioComponent,
        GeodialogComponent,
        PlantaExternaComponent
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
        AlertConfirmModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        TextMaskModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCkQSOz3XXowm3bOQlnCEUChPTgCmT0AXc'
        })
    ],
    providers: [
        { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
        GeocodeService,PlantaExternaService
    ],
    exports: [
        OfertaServicioComponent
    ]
})
export class OfertaServicioModule { }