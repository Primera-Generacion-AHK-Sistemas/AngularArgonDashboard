import { JavaDataService } from 'src/app/services/api/java/java-data.service';
import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
    responseJson: any;
    public isCollapsed = true;

    constructor(
        private router: Router,
        public auth: AuthService,
        @Inject(DOCUMENT) private doc: Document,
        private apiSpring: JavaDataService,
        private userStorage: UserDetailsStorageService,
        private toastr: ToastrService
    ) {}
    ngOnDestroy(): void {
        const html = document.getElementsByTagName('html')[0];
        html.classList.remove('auth-layout');
    }

    ngOnInit() {
        const html = document.getElementsByTagName('html')[0];
        html.classList.add('auth-layout');
        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
        });
    }

    login() {
        this.auth.loginWithPopup().subscribe(() => {
            this.apiSpring.getUserInfo().subscribe(
                (data: any) => {
                    this.userStorage.signUpUser(data);
                },
                (error) => {
                    this.showToaster('No se encuentra el usuario', '');
                }
            );
        });
    }

    signup() {
        this.auth.loginWithPopup().subscribe(() => {
            this.apiSpring.postUserSignup().subscribe(
                (data: any) => {
                    this.userStorage.signUpUser(data);
                },
                (error) => {
                    this.showToaster('Ya esta registrado', '');
                }
            );
        });
    }

    logout() {
        this.auth.logout({ returnTo: this.doc.location.origin });
        this.userStorage.removeDetailsUser();
    }

    showToaster(errorName: string, message: string) {
        this.toastr.error(message, errorName, {
            positionClass: 'toast-top-right',
            progressBar: true,
            disableTimeOut: true,
        });
        setTimeout(() => this.auth.logout(), 1500);
    }
}
