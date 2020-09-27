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
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('bg-default');
    }

    ngOnInit() {
        const html = document.getElementsByTagName('html')[0];
        html.classList.add('auth-layout');
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('bg-default');
        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
        });
    }

    loginWithRedirect() {
        this.auth.loginWithPopup().subscribe(() => {
            this.loginSignupUser();
        });
    }

    logout() {
        this.auth.logout({ returnTo: this.doc.location.origin });
        this.userStorage.removeDetailsUser();
    }

    getUserDetails() {
        this.apiSpring.getUserInfo().subscribe((data: any) => {
            this.responseJson = data;
            console.log("data: " + data);
            this.userStorage.setDetailsUser(this.responseJson);
        });
    }

    loginSignupUser() {
        this.apiSpring.postUserSignup().subscribe((data: any) => {
            this.responseJson = data;
            this.userStorage.setDetailsUser(this.responseJson);
        });
    }

}
