import { MenuItem } from "src/app/models/menu";

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Administración',
        isTitle: true
    },
    {
        id: 2,
        label: 'Gestión de Usuarios y Perfiles',
        icon: 'bx-wrench',
        subItems: [
            {
                id: 3,
                label: 'Organizaciones',
                link: '/app/admin/gestion-usuarios/lista-organizaciones',
                parentId: 2
            },
            {
                id: 4,
                label: 'Marco de Lista',
                link: '/app/admin/gestion-usuarios/lista-marco-lista',
                parentId: 2
            },
            {
                id: 5,
                label: 'Usuarios',
                link: '/app/admin/gestion-usuarios/lista-usuarios',
                parentId: 2
            },
        ]
    },
    {
        id: 6,
        label: 'Gestión de Configuración',
        icon: 'bx-briefcase',
        subItems: [
            {
                id: 7,
                label: 'Plantillas',
                link: '/app/admin/gestion-configuracion/lista-plantillas',
                parentId: 6
            },
            {
                id: 8,
                label: 'Programación',
                link: '/app/admin/gestion-configuracion/lista-panel-registro',
                parentId: 6
            },
            {
                id: 9,
                label: 'Alertas y Notificaciones',
                link: '/app/admin/gestion-configuracion/lista-notificaciones',
                parentId: 6
            }
        ]
    },
    {
        id: 10,
        label: 'Gestión de Tablas Generales',
        icon: 'bx-chart',
        subItems: [
            {
                id: 11,
                label: 'Condición Jurídica',
                link: '/app/admin/gestion-tablas/lista-condicion-juridica',
                parentId: 10
            },
            {
                id: 12,
                label: 'Tipo de Explotación',
                link: '/app/admin/gestion-tablas/lista-tipo-explotacion',
                parentId: 10
            },
            {
                id: 13,
                label: 'Lineas de Producción',
                link: '/app/admin/gestion-tablas/lista-linea-produccion',
                parentId: 10
            },            
        ]
    },
    {
        id: 14,
        label: 'Operativo',
        icon: 'bx-shield',
        subItems: [
            {
                id: 15,
                label: 'Gestión de Registro',
                link: '/app/operativo/lista-gestion-registro',
                parentId: 14
            },
            
        ]
    },
    {
        id: 16,
        label: 'Reportes y Consultas',
        icon: 'bx-shield',
        subItems: [
            {
                id: 17,
                label: 'Gestión de Registro',
                link: '/app/reportes/reporte-mapa',
                parentId: 16
            },
            {
                id: 18,
                label: 'Reporte de Estados de Registros',
                link: '/app/reportes/reporte-estados',
                parentId: 16
            },
        ]
    },
];

