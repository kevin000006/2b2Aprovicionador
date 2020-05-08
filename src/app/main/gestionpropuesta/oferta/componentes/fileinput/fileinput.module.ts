import { NgModule } from '@angular/core';
import { FileInputComponent } from '../fileinput/fileinput.component';
import { FileInputService } from '../fileinput/fileinput.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { AlertConfirmModule } from '../alertConfirm/alertConfirm.module';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatDividerModule,
        AlertConfirmModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ],
    declarations: [FileInputComponent],
    providers: [DatePipe, FileInputService],
    exports: [FileInputComponent],
})
export class FileInputModule { }