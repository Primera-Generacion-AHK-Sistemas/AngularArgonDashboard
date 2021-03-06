import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UserDetailsStorageService } from 'src/app/services/storage/user-details-storage.service';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    public focus;
    public listTitles: any[];
    public location: Location;
    profileJson: string = null;
    constructor(
        location: Location,
        public auth: AuthService,
        private userStorage: UserDetailsStorageService,
        @Inject(DOCUMENT) private doc: Document
    ) {
        this.location = location;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter((listTitle) => listTitle);
        this.auth.user$.subscribe((profile) => (this.profileJson = JSON.stringify(profile, null, 2)));
    }
    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Detalle';
    }

    logout() {
        this.auth.logout({ returnTo: this.doc.location.origin });
        this.userStorage.removeDetailsUser();
    }
}
