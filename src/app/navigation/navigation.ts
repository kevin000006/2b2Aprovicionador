import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Modulos',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'gestionpropuesta',
                title    : 'Gestión de la Oferta',
                translate: 'NAV.GESTIONPROPUESTA',
                type     : 'collapsable',
                icon     : 'monetization_on',
                children : [
                    {
                        id   : 'bandeja',
                        title: 'Bandeja',
                        type : 'item',
                        url  : '/gestion-propuesta/bandeja'
                    },
                    {
                        id   : 'subirTrama',
                        title: 'Subir Trama',
                        type : 'item',
                        url  : '/gestion-propuesta/subirTrama'
                    },
                    {
                        id       : 'gestionpropuestareporte',
                        title    : 'Reportes',
                        type     : 'collapsable',
                        children : [
                            {
                                id   : 'reportepropuestas',
                                title: 'Propuestas',
                                type : 'item',
                                url  : '/gestion-propuesta/reporte-propuestas'
                            }
                        ]
                    }
                ]
            },
            {
                id       : 'proyectos',
                title    : 'Proyectos',
                translate: 'NAV.PROYECTOS',
                type     : 'collapsable',
                icon     : 'calendar_today',
                children:[
                    {
                        id   : 'bandeja',
                        title: 'Bandeja',
                        type : 'item',
                        url  : '/gestion-propuesta/reporte-propuestas'
                    }
                ]
            },
            {
                id       : 'compras',
                title    : 'Compras',
                translate: 'NAV.COMPRAS',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children:[
                    {
                        id   : 'bandeja',
                        title: 'Bandeja',
                        type : 'item',
                        url  : '/gestion-propuesta/reporte-propuestas'
                    }
                ]
            }
            /*,
            {
                id       : 'integration',
                title    : 'Integración',
                translate: 'INTEGRACIÓN',
                type     : 'group',
                icon     : 'language',
                children : [
                    {
                        id       : 'migration',
                        title    : 'Migración',
                        translate: 'Migración',
                        type     : 'collapsable',
                        icon     : 'backup',
                        children : [
                            {
                                id   : 'MClientes',
                                title: 'Cliente',
                                type : 'item',
                                url  : '/gestion-propuesta/cliente'
                            }
                        ]
                    }
                ]
            }*/
        ]
    }
];
