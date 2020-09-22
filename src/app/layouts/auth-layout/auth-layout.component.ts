import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
    public isCollapsed = true;

    constructor(public auth: AuthService,
                @Inject(DOCUMENT) private doc: Document) {}

    ngOnInit() {}
    
    loginWithRedirect() {
        this.auth.loginWithPopup();
    }
    
    logout() {
        this.auth.logout({ returnTo: this.doc.location.origin });
    }
}
