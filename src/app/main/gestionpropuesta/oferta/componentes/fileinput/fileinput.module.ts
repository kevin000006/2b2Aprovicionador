import { NgModule } from '@angular/core';
import { FileInputComponent } from '../fileinput/fileinput.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { AlertConfirmModule } from '../alertConfirm/alertConfirm.module';
@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatDividerModule,
        AlertConfirmModule
    ],
    declarations: [FileInputComponent],
    //providers: [MySharedService],
    exports: [FileInputComponent],
})
export class FileInputModule { }