import { NgModule } from '@angular/core';
import { AlertConfirmComponent } from '../alertConfirm/alertConfirm.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    declarations: [AlertConfirmComponent],
    //providers: [MySharedService],
    exports: [AlertConfirmComponent],
 })
 export class AlertConfirmModule { }