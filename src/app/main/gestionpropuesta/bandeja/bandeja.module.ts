import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { BandejaComponent } from './bandeja.component';
import { AddDialogComponent } from '../dialogs/add/add.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BandejaService } from './bandeja.service';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




const routes: Routes = [
    {
        path: '**',
        component: BandejaComponent,
        resolve: {

        }
    }
];


@NgModule({
    declarations: [
        BandejaComponent,
        AddDialogComponent,
        DeleteDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatTableModule,
        MatIconModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatMenuModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule
    ],
    entryComponents: [
        AddDialogComponent,
        DeleteDialogComponent
    ],
    providers: [
        BandejaService
    ]
})
export class BandejaModule {
}