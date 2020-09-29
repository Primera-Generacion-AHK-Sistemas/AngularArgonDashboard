import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JavaDataService {
    private baseUrl = 'https://spring-boot-auth0-api.herokuapp.com/api';
    constructor(private http: HttpClient) {}

    // Buscar todos los cedears
    getAllCedears() {
        const uri = this.baseUrl + '/asset/all';
        return this.http.get(uri);
    }

    // Registrar Usuario
    postUserSignup() {
        const uri = this.baseUrl + '/user/signup';
        return this.http.post(uri, {}, { responseType: 'json' });
    }

    // Buscar detalles del usuario
    getUserInfo() {
        const uri = this.baseUrl + '/user/details';
        return this.http.get(uri);
    }

    // Agregar asset a Dashboard
    postDashboardAsset(assetId: number): Observable<any> {
        const uri = this.baseUrl + '/dashboard/assets/';
        return this.http.post(uri, assetId, { responseType: 'json' });
    }

    // Eliminar asset de Dashboard
    deleteDashboardAsset(assetId: number): Observable<any> {
        const uri = this.baseUrl + '/dashboard/assets/' + assetId;
        return this.http.delete(uri, { responseType: 'json' });
    }

    // Agregar lista de seguimiento
    postUserWatchlist(watchlistName: string) {
        const uri = this.baseUrl + '/watchlist';
        return this.http.post(uri, watchlistName, { responseType: 'json' });
    }

    // Eliminar lista de seguimiento
    deleteUserWatchlist(watchlistId: number) {
        const uri = this.baseUrl + '/watchlist/' + watchlistId;
        return this.http.delete(uri, { responseType: 'json' });
    }

    // Agregar asset a lista de seguimiento
    postWatchlistAsset(watchlistId: number, assetId: number) {
        const uri = this.baseUrl + '/watchlist/' + watchlistId + '/assets';
        return this.http.post(uri, assetId, { responseType: 'json' });
    }

    // Eliminar asset de lista de seguimiento
    deleteWatchlistAsset(watchlistId: number, assetId: number) {
        const uri = this.baseUrl + '/watchlist/' + watchlistId + '/assets/' + assetId;
        return this.http.delete(uri, { responseType: 'json' });
    }

    // Cambiar nombre de lista de seguimiento
    putWatchlistName(watchlistId: number, watchlistNewName: string) {
        const uri = this.baseUrl + '/watchlist/' + watchlistId;
        return this.http.put(uri, watchlistNewName, { responseType: 'json' });
    }
}
