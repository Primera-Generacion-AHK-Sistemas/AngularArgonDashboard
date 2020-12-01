import { Cedear } from './../../classes/cedear/cedear';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-details-list-assets',
    templateUrl: './details-list-assets.component.html',
    styleUrls: ['./details-list-assets.component.scss'],
})
export class DetailsListAssetsComponent implements OnInit {
    assetList: any;

    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation.extras.state as { assetListState: string };
        this.assetList = state.assetListState;
    }

    ngOnInit(): void {}

    userListsEmpty(): boolean {
        if (this.assetList.length === 0) {
            return true;
        }
        return false;
    }

    routeToCedears() {
        this.router.navigateByUrl('/tabla-cedears');
    }
}
