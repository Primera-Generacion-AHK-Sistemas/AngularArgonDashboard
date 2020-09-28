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

    constructor(private JavaDataService: JavaDataService) {}

    ngOnInit() {
        this.JavaDataService.buscarTodosLosCedears().subscribe((data: any) => {
            this.rows = data;
            console.log(this.rows);
        });
    }
}