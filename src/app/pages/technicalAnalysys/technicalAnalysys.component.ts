import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

// core components
import { chartOptions, parseOptions, chartExample2 } from '../../variables/charts';

import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';

import { Bank, BANKS } from '../demo-data';

@Component({
    selector: 'app-dashboard',
    templateUrl: './technicalAnalysys.component.html',
    styleUrls: ['./technicalAnalysys.component.scss'],
})
export class TechnicalAnalysysComponent implements OnInit {
    //#endregion
    protected banks: Bank[] = BANKS;

    /** control for the selected bank */
    public bankCtrl: FormControl = new FormControl();

    /** control for the MatSelect filter keyword */
    public bankFilterCtrl: FormControl = new FormControl();

    /** list of banks filtered by search keyword */
    public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

    @ViewChild('singleSelect') singleSelect: MatSelect;

    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();
    constructor() {}
    ngOnInit() {
    }
    public updateOptions() {
    }
}




