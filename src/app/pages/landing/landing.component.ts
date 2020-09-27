import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        //https://github.com/michalsnik/aos/issues/547
        setTimeout(function () { AOS.init(); }, 100);
        //AOS.init();
    }
}
