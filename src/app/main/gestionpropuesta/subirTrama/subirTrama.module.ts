import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
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
        MatFormFieldModule,
        FuseSharedModule,
        MatTableModule,
        MatIconModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatExpansionModule,
        MatSelectModule,
        MaterialFileInputModule
    ],
    entryComponents: [
    ],
    providers: [
        SubirTramaService
    ]
})
export class SubirTramaModule {
}