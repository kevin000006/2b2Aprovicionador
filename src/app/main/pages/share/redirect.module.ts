import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { RedirectBandejaComponent } from './redirect.component';


const routes = [
    {
        path: '**',
        component: RedirectBandejaComponent
    }
];

@NgModule({ 
    declarations: [
        RedirectBandejaComponent
    ],
    imports: [
        RouterModule.forChild(routes),
       
       FuseSharedModule
    ]
})
export class RedirectBandejaModule {
}