import { JavaDataService } from 'src/app/services/api/java/java-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-test-services',
    templateUrl: './test-services.component.html',
    styleUrls: ['./test-services.component.scss'],
})
export class TestServicesComponent implements OnInit {
    constructor(private springService: JavaDataService) {}

    ngOnInit(): void {}

    agregarAssetDashboard(id: number) {
        const assetId = Number(id);
        this.springService.postDashboardAsset(assetId).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    eliminarAssetDashboard(id: number) {
        const assetId = Number(id);
        this.springService.deleteDashboardAsset(assetId).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    crearWatchlist(watchlistName: string) {
        this.springService.postUserWatchlist(watchlistName).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    eliminarWatchList(watchlistId: number) {
        const watchlistIdNumber = Number(watchlistId);
        this.springService.deleteUserWatchlist(watchlistIdNumber).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    agregarAssetWatchlist(watchlistId: number, assetId: number) {
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
    }

    eliminarAssetWatchlist(watchlistId: number, assetId: number) {
        const watchlistIdNumber = Number(watchlistId);
        const watchListNewAsset = Number(assetId);
        this.springService.deleteWatchlistAsset(watchlistIdNumber, watchListNewAsset).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    actualizarNombreWatchList(watchlistId: number, watchlistNewName: string) {
        const watchlistIdNumber = Number(watchlistId);
        this.springService.putWatchlistName(watchlistIdNumber, watchlistNewName).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }
}
