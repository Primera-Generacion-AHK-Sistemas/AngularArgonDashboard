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

    idCedear = 1;

    constructor(private springService: JavaDataService, private userStorage: UserDetailsStorageService) {}

    ngOnInit() {
        this.rows = this.userStorage.getAllAssets();
        this.items = this.userStorage.getDetailsWatchlists();
    }

    agregarAssetLista(watchlistId: number, assetId: number) {
        const watchlistIdNumber = Number(watchlistId);
        const watchListNewAsset = Number(assetId);
        this.springService.postWatchlistAsset(watchlistIdNumber, watchListNewAsset).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
        setTimeout(function () {
            location.reload();
        }, 4500);
    }

    agregarAssetDashboard(id: number) {
        const assetId = Number(id);
        this.springService.postDashboardAsset(assetId).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
                this.userStorage.updateDetailsUser();
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
        setTimeout(function () {
            location.reload();
        }, 4500);
    }
}
