import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        icon: 'fas fa-columns text-green',
        class: '',
    },
    {
        path: '/listas-seguimiento',
        title: 'Listas de seguimiento',
        icon: 'fas fa-th-list text-green',
        class: '',
    },
    {
        path: '/analisis-tecnico',
        title: 'Analisis tecnico',
        icon: 'fas fa-chart-line text-green',
        class: '',
    },
    {
        path: '/tabla-cedears',
        title: 'Tabla de cedears',
        icon: 'fas fa-landmark text-green',
        class: '',
    },
    {
        path: '/perfil',
        title: 'Perfil',
        icon: 'fas fa-user text-green',
        class: '',
    },
    {
        path: '/FAQ',
        title: 'FAQ',
        icon: 'fas fa-question text-green',
        class: '',
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
