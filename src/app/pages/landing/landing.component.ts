import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
    customOptions: OwlOptions = {
        loop: false,
        rewind: true,
        autoplay: true,
        autoplaySpeed: 900,
        center: false,
        margin: 10,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: false,
        dots: true,
        dotsSpeed: 900,
        startPosition: 1,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            740: {
                items: 1,
            },
        },
    };

    constructor(private readonly http: HttpClient) {}

    ngOnInit(): void {
        // https://github.com/michalsnik/aos/issues/547
        setTimeout(function () {
            AOS.init();
        }, 100);
        // AOS.init();
    }
}
