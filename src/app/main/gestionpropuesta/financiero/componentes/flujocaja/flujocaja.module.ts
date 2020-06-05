import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlujoCajaComponent } from './flujocaja.component'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { FlujoCajaService } from './flujocaja.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMaskModule } from 'ngx-mask';
import { DecimalPipe } from '@angular/common';
//import { DialogfinancierTecnicaComponent} from '../dialogfinancieroTecnica/dialogfinancieroTecnica.component';
import { DialogfinancierTecnicaModule } from '../dialogfinancieroTecnica/dialogfinancieroTecnica.module';
@NgModule({
    declarations: [
        FlujoCajaComponent,
        //DialogfinancierTecnicaComponent
    ],
    imports: [
        MatDividerModule,
        FormsModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatProgressBarModule,
        NgxMaskModule,
        DialogfinancierTecnicaModule
        //BrowserAnimationsModule,
        
    ],
    exports: [
        FlujoCajaComponent
    ],
    providers: [
        DecimalPipe,
       // {provide: ToastrService, useClass: ToastrService},
       FlujoCajaService,
        //{ provide: LOCALE_ID, useValue: 'es' }
    ]
})
export class FlujoCajaModule { }