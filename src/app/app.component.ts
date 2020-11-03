import { Component, OnInit } from '@angular/core';

import { VERSION } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'MetricArs';
    ngOnInit(): void {
        window.addEventListener('keyup', disableF5);

        window.addEventListener('keydown', disableF5);

        function disableF5(e) {
            if ((e.which || e.keyCode) === 116) {
                e.preventDefault();
            }
        }
    }
}
