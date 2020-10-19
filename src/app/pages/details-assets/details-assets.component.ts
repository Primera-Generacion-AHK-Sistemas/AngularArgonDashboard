import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-details-assets',
    templateUrl: './details-assets.component.html',
    styleUrls: ['./details-assets.component.scss'],
})
export class DetailsAssetsComponent implements OnInit {
    asset: any;

    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation.extras.state as { asd: string };
        this.asset = state.asd;
        console.log(this.asset);
    }

    ngOnInit(): void {}
}
