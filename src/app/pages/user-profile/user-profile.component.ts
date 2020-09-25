import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    profileJson: string = null;
    attribute: any;
    constructor(
        public auth: AuthService,
        private storage: LocalStorageService
    ) {}

    ngOnInit() {
        this.auth.user$.subscribe(
            (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
        );
        this.retrieveValue();
    }

    // Pasaje a JSON desde el String de local storage
    retrieveValue() {
        this.attribute = JSON.stringify(
            this.storage.retrieve('responseJson'),
            null,
            // ['createdAt'],
            2
        );
        console.log('ATRIBUTO ' + this.attribute);
    }
}
