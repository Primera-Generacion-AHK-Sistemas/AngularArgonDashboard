import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { JavaDataService } from 'src/app/services/api/java/java-data.service';

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
        private localSt: LocalStorageService,
        private api: JavaDataService
    ) {}
    ngOnDestroy(): void {
        const html = document.getElementsByTagName('html')[0];
        html.classList.remove('auth-layout');
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('bg-default');
    }

    ngOnInit() {
        // this.localSt
        //     .observe('key')
        //     .subscribe((value) => console.log('new value', value));
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
            this.pingApi();
        });
    }

    logout() {
        this.auth.logout({ returnTo: this.doc.location.origin });
    }

    pingApi() {
        this.api.obtenerInfoDeUsuario().subscribe((data: any) => {
            this.responseJson = data;
            this.localSt.store('responseJson', this.responseJson);
        });
    }

    // saveValue() {
    //     this.localSt.store('boundValue', this.responseJson);
    // }
}
