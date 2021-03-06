import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { ErrorDialogService } from 'app/main/error/error.service';
import { LoginService } from 'app/main/pages/authentication/login-2/login-2.service';
import { HttpConfigInterceptor } from 'app/interceptor/HttpConfig';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule,ToastrService } from 'ngx-toastr';
const appRoutes: Routes = [
   
   
    
    {
        path: 'bandeja-redirect/:id',
        loadChildren: () => import('./main/pages/share/redirect.module').then(m => m.RedirectBandejaModule)
    },
    {
        path: 'gestion-propuesta',
        loadChildren: () => import('./main/gestionpropuesta/gestionpropuesta.module').then(m => m.GestionPropuestaModule)
    },
    {
        path: 'apps',
        loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'ui',
        loadChildren: () => import('./main/ui/ui.module').then(m => m.UIModule)
    },
    {
        path: 'documentation',
        loadChildren: () => import('./main/documentation/documentation.module').then(m => m.DocumentationModule)
    },
    {
        path: 'shared/:id',
        redirectTo: 'pages/shared/:id',
        pathMatch : 'full'
    },
    {
        path: '**',
        redirectTo: 'pages/auth/login-2'
    }
    
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule, 
        BrowserAnimationsModule,
        HttpClientModule,
        ToastrModule.forRoot(), // ToastrModule added
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        // Material moment date module
        MatMomentDateModule,
        // Material
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatMenuModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatTabsModule,
        MatCardModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        
        //
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        // App modules
        LayoutModule,
        AppStoreModule
    ],
    providers: [
        {provide: ToastrService, useClass: ToastrService},
        LoginService,
        ErrorDialogService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
