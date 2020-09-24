import { Component, OnInit } from '@angular/core';
import { JavaDataService } from 'src/app/services/api/java/java-data.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    profileJson: string = null;
    constructor(public auth: AuthService) {}

    ngOnInit() {
        this.auth.user$.subscribe(
            (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
        );
    }
}
