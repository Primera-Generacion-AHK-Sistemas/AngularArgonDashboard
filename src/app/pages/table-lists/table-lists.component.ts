import { UserDetailsStorageService } from './../../services/storage/user-details-storage.service';
import { Component, OnInit } from '@angular/core';
import { JavaDataService } from 'src/app/services/api/java/java-data.service';

@Component({
    selector: 'app-table-lists',
    templateUrl: './table-lists.component.html',
    styleUrls: ['./table-lists.component.scss'],
})
export class TableListsComponent implements OnInit {
    p = 1;
    headers = ['name', ''];

    rows = [];

    // tslint:disable-next-line: no-shadowed-variable
    constructor(
        private JavaDataService: JavaDataService,
        private UserDetailsStorageService: UserDetailsStorageService
    ) {}

    ngOnInit() {
        this.rows = this.UserDetailsStorageService.getDetailsWatchlists();
        console.log(this.UserDetailsStorageService.getDetailsWatchlists());
    }
}
