import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';



const routes = [

  {
    path: 'oferta',
    loadChildren: () => import('./oferta/oferta.module').then(m => m.OfertaModule)
  },
  {
    path: 'bandeja',
    loadChildren: () => import('./bandeja/bandeja.module').then(m => m.BandejaModule)
  },
  {
    path: 'reporte-propuestas',
    loadChildren: () => import('./reportepropuesta/reportepropuesta.module').then(m => m.ReportepropuestaModule)
  },
  {
    path: 'bandeja-proyectos',
    loadChildren: () => import('./reportepropuesta/reportepropuesta.module').then(m => m.ReportepropuestaModule)
  },
  {
    path: 'bandeja-compras',
    loadChildren: () => import('./reportepropuesta/reportepropuesta.module').then(m => m.ReportepropuestaModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./mcliente/mcliente.module').then(m => m.MClienteModule)
  },
  {
    path: 'parametroglobal',
    loadChildren: () => import('./parametrogobal/parametrogobal.module').then(m => m.ParametroGlobalModule)
  },
  {
    path: 'subirTrama',
    loadChildren: () => import('./subirTrama/subirTrama.module').then(m => m.SubirTramaModule)
  },
  {
    path: 'financiero',
    loadChildren: () => import('./financiero/financiero.module').then(m => m.FinancieroModule)
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule
  ],
  declarations: []
})
export class GestionPropuestaModule { }
