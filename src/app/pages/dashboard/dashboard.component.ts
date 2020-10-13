import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { Component, OnInit } from '@angular/core';
import { Cedear } from 'src/app/classes/cedear/cedear';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public userDashboard: Array<Cedear>;
    public collapseInactive: boolean;

    constructor(private userStorage: UserDetailsStorageService) {}

    ngOnInit() {
        this.userDashboard = this.userStorage.getDetailsDashboard().assets;
    }

    deleteAsset(id: number) {
        this.userDashboard.forEach((element) => {
            if (element.id === id) {
                const index: number = this.userDashboard.indexOf(element);
                this.userDashboard.splice(index, 1);
            }
        });
    }
}
