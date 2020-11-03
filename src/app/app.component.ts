import { Component } from '@angular/core';

import { VERSION } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  version = VERSION;


  private rightToLeft = false;

  toggleRightToLeft() {
    this.rightToLeft = !this.rightToLeft;
    document.body.dir = this.rightToLeft ? 'rtl' : '';
  }
  /*
  */
    title = 'argon-dashboard-angular';
}
