import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
})
export class FAQComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        setTimeout(function () {
            AOS.init();
        }, 100);
    }
}
