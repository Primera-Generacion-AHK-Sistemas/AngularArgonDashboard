import { PythonDataService } from 'src/app/services/api/python/python-data.service';
import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { JavaDataService } from 'src/app/services/api/java/java-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-test-services',
    templateUrl: './test-services.component.html',
    styleUrls: ['./test-services.component.scss'],
})
export class TestServicesComponent implements OnInit {
    constructor(
        private springService: JavaDataService,
        private storageService: UserDetailsStorageService,
        private pythonService: PythonDataService
    ) {}
    datosDelUsuario: any;
    datosDelDashboard: any;
    datosDelWatchlist: any;
    preciosDolar: any;
    analisisTecnico: any;

    ngOnInit(): void {}

    //#region SPRING API

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
    //#endregion

    //#region LocalStorage

    // El JSON.stringify lo pongo en estos casos para que lo puedan ver en el textarea

    buscarDatosUsuario() {
        this.datosDelUsuario = JSON.stringify(this.storageService.getDetailsObject(), undefined, 4);
    }

    buscarDatosDashboard() {
        this.datosDelDashboard = JSON.stringify(this.storageService.getDetailsDashboard(), undefined, 4);
    }

    buscarDatosWatchlist() {
        this.datosDelWatchlist = JSON.stringify(this.storageService.getDetailsWatchlists(), undefined, 4);
    }

    actualizarDatosUsuario() {
        this.storageService.updateDetailsUser();
        this.buscarDatosUsuario();
    }

    //#endregion

    //#region PYTHON API

    buscarPreciosDolarDeCedear(ticker: string) {
        this.pythonService.getCedearDollarPrices(ticker).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response, undefined, 4));
                this.preciosDolar = JSON.stringify(response, undefined, 4);
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    buscarAnalisisTecnico(ticker: string, indicator: string) {
        this.pythonService.getCedearTechnicalAnalysis(ticker, indicator).subscribe(
            (response) => {
                console.log('response: ' + JSON.stringify(response, undefined, 4));
                this.analisisTecnico = JSON.stringify(response, undefined, 4);
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    //#endregion
}
