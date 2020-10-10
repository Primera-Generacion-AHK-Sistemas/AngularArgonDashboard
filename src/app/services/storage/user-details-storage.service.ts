import { JavaDataService } from 'src/app/services/api/java/java-data.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UserDetailsStorageService {
    constructor(private springService: JavaDataService, private router: Router) {}

    // Busca por el key 'user-details' del local storage
    searchDetailsLocalStorage() {
        return localStorage.getItem('user-details');
    }

    // Trae todos los datos del usuario
    getDetailsObject() {
        return JSON.parse(this.searchDetailsLocalStorage());
    }

    // Trae solo el objeto dashboard del usuario
    getDetailsDashboard() {
        return JSON.parse(this.searchDetailsLocalStorage()).dashboard;
    }

    // Trae solo el objeto watchlist del usuario
    getDetailsWatchlists() {
        return JSON.parse(this.searchDetailsLocalStorage()).watchlists;
    }

    // Solo usado para el registro de Auth0
    signUpUser(response: any) {
        localStorage.setItem('user-details', JSON.stringify(response));
        this.router.navigateByUrl('/dashboard');
    }

    // Setea en el local storage la response del detalle del usuario
    setDetailsUser() {
        this.springService.getUserInfo().subscribe(
            (response) => {
                localStorage.setItem('user-details', JSON.stringify(response));
            },
            (error) => {
                console.log('error: ' + error);
                console.log('error status: ' + error.status);
            }
        );
    }

    // Elimina del local storage el detalle del usuario
    removeDetailsUser() {
        localStorage.removeItem('user-details');
    }

    // Actualiza el detalle del usuario
    updateDetailsUser() {
        this.removeDetailsUser();
        this.setDetailsUser();
    }
}
