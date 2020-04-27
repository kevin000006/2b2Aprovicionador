import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { SubirTramaComponent } from './subirTrama.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { SubirTramaService } from './subirTrama.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

const routes: Routes = [
    {
        path: '**',
        component: SubirTramaComponent,
        resolve: {

        }
    }
];

@NgModule({
    declarations: [
        SubirTramaComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatExpansionModule,
        MatTableModule,
        MatIconModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MaterialFileInputModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatButtonModule
    ],
    entryComponents: [
    ],
    providers: [
        SubirTramaService
    ]
})
export class SubirTramaModule {
}