import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { JavaDataService } from 'src/app/services/api/java/java-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
    p = 1;
    headers = ['ticker', 'description', '', ''];

    rows = [];

    items = [];

    constructor(
        // tslint:disable-next-line: no-shadowed-variable
        private JavaDataService: JavaDataService,
        // tslint:disable-next-line: no-shadowed-variable
        private UserDetailsStorageService: UserDetailsStorageService
    ) {}

    ngOnInit() {
        this.rows = this.UserDetailsStorageService.getAllAssets();
        this.items = this.UserDetailsStorageService.getDetailsWatchlists();
    }

    agregarAssetLista(watchlistId: number, assetId: number) {
        console.log(watchlistId, assetId);
        const watchlistIdNumber = Number(watchlistId);
        const watchListNewAsset = Number(assetId);
        this.JavaDataService.postWatchlistAsset(watchlistIdNumber, watchListNewAsset).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    agregarAssetDashboard(id: number) {
        console.log(id);
        const assetId = Number(id);
        this.JavaDataService.postDashboardAsset(assetId).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
                this.UserDetailsStorageService.updateDetailsUser();
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }
}
