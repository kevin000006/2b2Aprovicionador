import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { ShareComponent } from './share.component';

const routes = [
    {
        path: 'shared/:id',
        component: ShareComponent
    }
];

@NgModule({ 
    declarations: [
        ShareComponent
    ],
    imports: [
        RouterModule.forChild(routes),
       FuseSharedModule,
       
    ]
})
export class ShareModule {
}