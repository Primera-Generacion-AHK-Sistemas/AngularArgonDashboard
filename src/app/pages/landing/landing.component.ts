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
        AOS.init();
    }
}
