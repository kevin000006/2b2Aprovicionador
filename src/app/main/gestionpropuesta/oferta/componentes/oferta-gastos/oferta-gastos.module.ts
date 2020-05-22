import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfertaGastosComponent } from './oferta-gastos.component'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OfertaGastosService } from './oferta-gastos.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMaskModule } from 'ngx-mask';



// import es from '@angular/common/locales/es';
// import { registerLocaleData } from '@angular/common';
// registerLocaleData(es);

//import localeEs from '@angular/common/locales/es';
@NgModule({
    declarations: [
        OfertaGastosComponent
    ],
    imports: [
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
        NgxMaskModule
        //BrowserAnimationsModule,
        
    ],
    exports: [
        OfertaGastosComponent
    ],
    providers: [
       // {provide: ToastrService, useClass: ToastrService},
        OfertaGastosService,
        //{ provide: LOCALE_ID, useValue: 'es' }
    ]
})
export class OfertaGastosModule { }