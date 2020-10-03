import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public userDashboard: object;
    public collapseInactive: boolean;

    constructor(private userStorage: UserDetailsStorageService) {}

    ngOnInit() {
        this.userDashboard = this.userStorage.getDetailsDashboard().assets;
    }
}
