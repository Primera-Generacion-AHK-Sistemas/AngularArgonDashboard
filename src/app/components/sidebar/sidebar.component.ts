import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

declare interface RouteInfo {
    path: string;
    titleSidebar: string;
    icon: string;
    class: string;
    joyrideStep: string;
    title: string;
    text: string;
}
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        titleSidebar: 'Dashboard',
        icon: 'fas fa-columns text-green',
        class: '',
        joyrideStep: 'itemDashboard',
        title: 'Dashboard',
        text:
            'Acá podés seguir los activos que más te interesen, serán los primeros que veas apenas ingreses a la aplicación.',
    },
    {
        path: '/listas-seguimiento',
        titleSidebar: 'Listas de Seguimiento',
        icon: 'fas fa-th-list text-green',
        class: '',
        joyrideStep: 'itemListasSeg',
        title: 'Listas de Seguimiento',
        text:
            'Tambien podés crear diferentes listas de seguimiento y agrupar dentro de ellas el stack de activos que más te guste!',
    },
    {
        path: '/analisis-tecnico',
        titleSidebar: 'Análisis Técnico',
        icon: 'fas fa-chart-line text-green',
        class: '',
        joyrideStep: 'itemAnalisisTecnico',
        title: 'Análisis Técnico',
        text:
            'Podés seguir de cerca el activo que mas te guste y analizar su historial con diferentes indicadores técnicos.',
    },
    {
        path: '/tabla-cedears',
        titleSidebar: 'Tabla de cedears',
        icon: 'fas fa-landmark text-green',
        class: '',
        joyrideStep: 'itemCedears',
        title: 'Tabla de Cedears',
        text:
            'Vas a poder visualizar más de 130 activos disponibles en el mercado, pudiendo ver sus detalles y agregándolos a tus listas de seguimiento o dashboard, vos elegís!',
    },
    {
        path: '/perfil',
        titleSidebar: 'Perfil',
        icon: 'fas fa-user text-green',
        class: '',
        joyrideStep: 'itemPerfil',
        title: 'Perfil',
        text: 'Acá podés ver todos tus datos, por si te olvidás de tu nombre...',
    },
    {
        path: '/FAQ',
        titleSidebar: 'FAQ',
        icon: 'fas fa-question text-green',
        class: '',
        joyrideStep: 'itemFAQ',
        title: 'Preguntas frecuentes',
        text:
            '¿Sos nuevo en el análisis técnico?, ¿Te gustaráa consolidar alguno de sus conceptos? Tenemos una sección de preguntas frecuentes para los nuevos y los no tan nuevos usuarios.',
    },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public isCollapsed = true;
    profileJson: string = null;

    constructor(
        private router: Router,
        public auth: AuthService,
        private userStorage: UserDetailsStorageService,
        @Inject(DOCUMENT) private doc: Document
    ) {}

    ngOnInit() {
        this.menuItems = ROUTES.filter((menuItem) => menuItem);
        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
        });
        this.auth.user$.subscribe((profile) => (this.profileJson = JSON.stringify(profile, null, 2)));
    }

    logout() {
        this.auth.logout({ returnTo: this.doc.location.origin });
        this.userStorage.removeDetailsUser();
    }
}
