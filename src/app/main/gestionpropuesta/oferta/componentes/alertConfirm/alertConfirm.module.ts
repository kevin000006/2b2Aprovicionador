import { NgModule } from '@angular/core';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [AlertConfirmComponent],
    //providers: [MySharedService],
    exports: [AlertConfirmComponent],
 })
 export class AlertConfirmModule { }