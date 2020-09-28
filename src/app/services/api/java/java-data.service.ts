import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JavaDataService {
    private baseUrl = 'https://spring-boot-auth0-api.herokuapp.com/api';
    constructor(private http: HttpClient) {}

    buscarTodosLosCedears() {
        const uri = this.baseUrl + '/asset/all';
        return this.http.get(uri);
    }

    getUserInfo() {
        const uri = this.baseUrl + '/user/details';
        return this.http.get(uri);
    }

    postUserSignup() {
        const uri = this.baseUrl + '/user/signup';
        return this.http.post(uri, {}, { responseType: 'json' });
    }

    postUserAddWatchlist(watchlistName: string) {
        const uri = this.baseUrl + '/watchlist';
        return this.http.post(uri, watchlistName, { responseType: 'json' });
    }

    postWatchlistAddAsset(watchlistId: number, assetId: number) {
        const uri = this.baseUrl + '/watchlist/' + watchlistId.toString();
        return this.http.post(uri, assetId, { responseType: 'json' });
    }

    // /** POST: add a new hero to the database */
    // addHero(hero: Hero): Observable<Hero> {
    //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    //     .pipe(
    //       catchError(this.handleError('addHero', hero))
    //     );
    // }

    postDashboardAddAsset(id: number): Observable<any> {
        const uri = this.baseUrl + '/dashboard/assets';
        return this.http.post(uri, id, { responseType: 'json' })
    }

    // postDashboardAddAsset(id: number) {
    //     const uri = this.baseUrl + '/dashboard/assets';
    //     const result = this.http
    //         .post(uri, id, { responseType: 'json' })
    //         .toPromise()
    //         .then((response: any) => {
    //             const realResponse = {
    //                 id: null,
    //                 assetType: null,
    //                 ticker: null,
    //                 description: null,
    //             };
    //             realResponse.id = response.id;
    //             realResponse.assetType = response.assetType;
    //             realResponse.ticker = response.ticker;
    //             realResponse.description = response.description;
    //             return realResponse;
    //         })
    //         .catch((error: HttpErrorResponse) => {
    //             console.error('El cedear no existe. - ', error.error);
    //         });
    //     return result;
    // }
}
