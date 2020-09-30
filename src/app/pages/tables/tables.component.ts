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
        this.JavaDataService.buscarTodosLosCedears().subscribe((data: any) => {
            this.rows = data;
        });
        this.items = this.UserDetailsStorageService.getDetailsWatchlists();
    }
}
