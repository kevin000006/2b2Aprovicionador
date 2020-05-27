import { NgModule } from '@angular/core';
import { DialogeficienciaTecnicaComponent} from './dialogeficienciaTecnica.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [DialogeficienciaTecnicaComponent],
    //providers: [MySharedService],
    exports: [DialogeficienciaTecnicaComponent],
 })
 export class DialogeficienciaTecnicaModule { }