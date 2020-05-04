import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CambiarContraseniaComponent } from '../cambiocontrasenia/cambiocontrasenia.component';
@NgModule({
    declarations: [
        ToolbarComponent,
        CambiarContraseniaComponent
    ],
    imports     : [
        RouterModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        MatFormFieldModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
