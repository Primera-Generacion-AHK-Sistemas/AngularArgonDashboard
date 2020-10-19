import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-details-assets',
    templateUrl: './details-assets.component.html',
    styleUrls: ['./details-assets.component.scss'],
})
export class DetailsAssetsComponent implements OnInit {
    @Input() id: number;

    constructor() {}

    ngOnInit(): void {
        console.log(this.id);
    }
}
