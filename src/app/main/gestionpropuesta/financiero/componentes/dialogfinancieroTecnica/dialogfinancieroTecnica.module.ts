import { NgModule } from '@angular/core';
import { DialogfinancierTecnicaComponent} from './dialogfinancieroTecnica.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,        
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,        
        MatInputModule
    ],
    declarations: [DialogfinancierTecnicaComponent],
    //providers: [MySharedService],
    exports: [DialogfinancierTecnicaComponent],
 })
 export class DialogfinancierTecnicaModule { }