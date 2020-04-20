import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';



const routes = [
  {
    path        : 'bandeja',
    loadChildren: () => import('./bandeja/bandeja.module').then(m => m.BandejaModule)
  },
  {
    path        : 'cliente',
    loadChildren: () => import('./mcliente/mcliente.module').then(m => m.MClienteModule)
  }

];


@NgModule({
  imports     : [
    RouterModule.forChild(routes),
    FuseSharedModule
  ],
  declarations: [
  ]
})
export class GestionPropuestaModule { }