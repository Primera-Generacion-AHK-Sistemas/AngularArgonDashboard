import { JavaDataService } from 'src/app/services/api/java/java-data.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const USER_DETAILS_KEY = 'user-details';
const USER_DASHBOARD_ASSETS_KEY = 'user-dashboard-assets';
const USER_WATCHLISTS_KEY = 'user-watchlists';
const ALL_ASSETS_KEY = 'all-assets';

@Injectable({
    providedIn: 'root',
})
export class UserDetailsStorageService {
    constructor(private springService: JavaDataService, private router: Router) {}

    // Busca por el key USER_DETAILS_KEY del local storage
    searchDetailsLocalStorage() {
        return localStorage.getItem(USER_DETAILS_KEY);
    }

    // -------------------------------------------------------------------------------------------

    // Trae todos los datos del usuario
    getDetailsObject() {
        return JSON.parse(this.searchDetailsLocalStorage());
    }

    // -------------------------------------------------------------------------------------------

    // Trae solo el objeto dashboard del usuario
    getDashboardFromDetails() {
        return JSON.parse(this.searchDetailsLocalStorage()).dashboard.assets;
    }

    // Setea key local storage con item de dashboard assets
    setDashboardStorage(dashboardItem: object) {
        localStorage.setItem(USER_DASHBOARD_ASSETS_KEY, JSON.stringify(dashboardItem));
    }

    // Trae array de assets del dashboard
    getDetailsDashboard() {
        return JSON.parse(localStorage.getItem(USER_DASHBOARD_ASSETS_KEY));
    }

    // -------------------------------------------------------------------------------------------

    // Trae solo el objeto watchlist del usuario
    getWatchlistsFromDetails() {
        return JSON.parse(this.searchDetailsLocalStorage()).watchlists;
    }

    // Setea key local storage con item de watchlists
    setWatchlistsStorage(watchlistsItem: object) {
        localStorage.setItem(USER_WATCHLISTS_KEY, JSON.stringify(watchlistsItem));
    }

    // Trae objeto watchlist
    getDetailsWatchlists() {
        return JSON.parse(localStorage.getItem(USER_WATCHLISTS_KEY));
    }

    // -------------------------------------------------------------------------------------------

    // Setea en local storage todos los assets
    getAllAssetsSpringAPI() {
        this.springService.getAllCedears().subscribe(
            (response) => {
                localStorage.setItem(ALL_ASSETS_KEY, JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    // Arma objeto assets con el item del local storage
    getAllAssets() {
        return JSON.parse(localStorage.getItem(ALL_ASSETS_KEY));
    }

    // -------------------------------------------------------------------------------------------

    // Setea keys de dashboard y watchlists usando la key de details.
    setDashboardAndWatchlistsToStorage() {
        this.setDashboardStorage(this.getDashboardFromDetails());
        this.setWatchlistsStorage(this.getWatchlistsFromDetails());
    }

    // -------------------------------------------------------------------------------------------

    // Solo usado para el registro de Auth0
    signUpUser(response: any) {
        localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(response));
        this.setDashboardAndWatchlistsToStorage();
        this.getAllAssetsSpringAPI();
        this.router.navigateByUrl('/dashboard');
    }

    // Setea en el local storage la response del detalle del usuario
    setDetailsUser() {
        this.springService.getUserInfo().subscribe(
            (response) => {
                localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(response));
                this.getAllAssetsSpringAPI();
                this.setDashboardAndWatchlistsToStorage();
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    // Elimina del local storage el detalle del usuario
    removeDetailsUser() {
        localStorage.removeItem(USER_DETAILS_KEY);
        localStorage.removeItem(USER_DASHBOARD_ASSETS_KEY);
        localStorage.removeItem(USER_WATCHLISTS_KEY);
    }

    // Actualiza el detalle del usuario
    updateDetailsUser() {
        this.removeDetailsUser();
        this.setDetailsUser();
    }
}
