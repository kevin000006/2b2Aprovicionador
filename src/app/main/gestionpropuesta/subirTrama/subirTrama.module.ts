import { NgModule } from '@angular/core';
import { MatDialogModule  } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { SubirTramaComponent} from './subirTrama.component';
import {AddDialogComponent} from '../dialogs/add/add.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {SubirTramaService} from './subirTrama.service';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path     : '**',
        component: SubirTramaComponent,
        resolve  : {
            
        }
    }
];


@NgModule({
    declarations: [
        SubirTramaComponent,
        AddDialogComponent,
        DeleteDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatTableModule,
        MatIconModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule
    ],
    entryComponents: [
        AddDialogComponent,
        DeleteDialogComponent
    ],
    providers   : [
        SubirTramaService
    ]
})
export class SubirTramaModule
{
}