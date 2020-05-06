import { NgModule } from '@angular/core';
import { AlertSuccessComponent } from '../alertSuccess/alertSuccess.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [AlertSuccessComponent],    
    exports: [AlertSuccessComponent],
 })
 export class AlertSuccessModule { }