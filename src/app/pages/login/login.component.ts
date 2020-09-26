import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    responseJson: string;
    constructor(private apiSpring: UserDetailsStorageService) {}

    ngOnInit() {}
    ngOnDestroy() {}
}
