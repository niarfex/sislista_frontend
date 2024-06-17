import { MenuItem } from "src/app/models/menu";

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'Mantenimiento',
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
                label: 'Ubigeo',
                link: '/',
                parentId: 2
            },
            {
                id: 5,
                label: 'Cultivo',
                link: '/',
                parentId: 2
            },
        ]
    },
    {
        id: 6,
        label: 'Negocio',
        icon: 'bx-briefcase',
        subItems: [
            {
                id: 7,
                label: 'Encuesta',
                link: '/negocio/encuesta',
                parentId: 6
            },
        ]
    },
    {
        id: 8,
        label: 'Reportes',
        icon: 'bx-chart',
        subItems: [
            {
                id: 9,
                label: 'General',
                link: '/reporte/reporte01',
                parentId: 8
            },
        ]
    },
    {
        id: 10,
        label: 'Seguridad',
        icon: 'bx-shield',
        subItems: [
            {
                id: 11,
                label: 'Perfil',
                link: '/',
                parentId: 10
            },
            {
                id: 12,
                label: 'Usuario',
                link: '/',
                parentId: 10
            },
        ]
    },
];

