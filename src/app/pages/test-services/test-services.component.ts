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
                console.log('error: ' + error.status);
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
                console.log('error: ' + error.status);
            }
        );
    }

    crearWatchlist(watchlistName: string) {
        this.springService.postUserWatchlist(watchlistName).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error.status);
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
                console.log('error: ' + error.status);
            }
        );
    }

    // Este por ahora no anda: da estos errores
    /*
     XHR OPTIONS https://spring-boot-auth0-api.herokuapp.com/api/watchlist/2 [HTTP/1.1 403  1251ms]
     The HTTP 403 Forbidden client error status response code indicates that the server understood the
     request but refuses to authorize it.

     This status is similar to 401, but in this case, re-authenticating will make no difference.
     The access is permanently forbidden and tied to the application logic, such as insufficient rights to a resource.

     Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at
     https://spring-boot-auth0-api.herokuapp.com/api/watchlist/2. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).

     error: 0

     Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at
     https://spring-boot-auth0-api.herokuapp.com/api/watchlist/2. (Reason: CORS request did not succeed).

     */
    agregarAssetWatchlist(watchlistId: number, assetId: number) {
        const watchlistIdNumber = Number(watchlistId);
        const watchListNewAsset = Number(assetId);
        this.springService.postWatchlistAsset(watchlistIdNumber, watchListNewAsset).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error.status);
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
                console.log('error: ' + error.status);
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
                console.log('error: ' + error.status);
            }
        );
    }
}
