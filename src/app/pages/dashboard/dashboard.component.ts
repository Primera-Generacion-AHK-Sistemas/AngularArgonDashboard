import { Router } from '@angular/router';
import { JavaDataService } from './../../services/api/java/java-data.service';
import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { Component, OnInit } from '@angular/core';
import { Cedear } from 'src/app/classes/cedear/cedear';
import { JoyrideService } from 'ngx-joyride';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public userDashboard: Array<Cedear>;
    public collapseInactive: boolean;

    constructor(
        private userStorage: UserDetailsStorageService,
        private springService: JavaDataService,
        private router: Router,
        private readonly joyrideService: JoyrideService
    ) {}

    ngOnInit() {
        this.userDashboard = this.userStorage.getDetailsDashboard();
        this.userDashboardEmpty();
    }

    deleteAsset(id: number) {
        this.userDashboard.forEach((element) => {
            if (element.id === id) {
                const index: number = this.userDashboard.indexOf(element);
                this.userDashboard.splice(index, 1);
                this.userStorage.setDashboardStorage(this.userDashboard);
                this.deleteAssetFromBack(element.id);
            }
        });
    }

    deleteAssetFromBack(id: number) {
        this.springService.deleteDashboardAsset(id).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    userDashboardEmpty(): boolean {
        if (this.userDashboard.length === 0) {
            return true;
        }
        return false;
    }

    tour() {
        this.joyrideService.startTour({
            steps: [
                'barraLateral',
                'itemDashboard',
                'itemListasSeg',
                'itemAnalisisTecnico',
                'itemCedears',
                'itemPerfil',
                'itemFAQ',
                'stepUser',
            ],
            themeColor: '#5f71e5',
            // showCounter: false,
            customTexts: { prev: 'Atras', next: 'Siguiente', done: 'Listo!' },
        });
    }

    routeToCedears() {
        this.router.navigateByUrl('/tabla-cedears');
    }
}
