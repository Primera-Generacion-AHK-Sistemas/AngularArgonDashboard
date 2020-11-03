import { element } from 'protractor';
import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { JavaDataService } from 'src/app/services/api/java/java-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';

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

    asset = {};

    constructor(
        private springService: JavaDataService,
        private userStorage: UserDetailsStorageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.rows = this.userStorage.getAllAssets();
        this.items = this.userStorage.getDetailsWatchlists();
        setTimeout(function () {
            AOS.init();
        }, 100);
    }

    agregarAssetLista(watchlistId: number, assetId: number) {
        const watchlistIdNumber = Number(watchlistId);
        const watchListNewAsset = Number(assetId);
        this.springService.postWatchlistAsset(watchlistIdNumber, watchListNewAsset).subscribe(
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
        }, 3000);
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
        }, 3000);
    }

    getAssetObject(id: number) {
        this.rows.forEach((element) => {
            if (element.id === id) {
                this.asset = element;
                const asd = element;
                const navigationExtras = { state: { asd } };
                this.router.navigate(['detalles-cedears'], navigationExtras);
            }
        });
    }
}
