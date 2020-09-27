import { JavaDataService } from 'src/app/services/api/java/java-data.service';
import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
    responseJson: [];
    public isCollapsed = true;

    constructor(
        private router: Router,
        public auth: AuthService,
        @Inject(DOCUMENT) private doc: Document,
        private apiSpring: JavaDataService,
        private userStorage: UserDetailsStorageService
    ) {}
    ngOnDestroy(): void {
        const html = document.getElementsByTagName('html')[0];
        html.classList.remove('auth-layout');
    }

    ngOnInit() {
        // Aca mando el POST
        this.apiSpring.postDashboardAddAsset(51);
        const html = document.getElementsByTagName('html')[0];
        html.classList.add('auth-layout');
        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
        });
    }

    loginWithRedirect() {
        this.auth.loginWithPopup().subscribe(() => {
            this.pingApiDetails();
        });
    }

    logout() {
        this.auth.logout({ returnTo: this.doc.location.origin });
        this.userStorage.removeDetailsUser();
    }

    pingApiDetails() {
        this.apiSpring.getUserInfo().subscribe((data: any) => {
            this.responseJson = data;
            this.userStorage.setDetailsUser(this.responseJson);
        });
    }
}
