import { Component, OnInit, OnDestroy } from '@angular/core';
import { JavaDataService } from 'src/app/services/api/java/java-data.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    responseJson: string;
    constructor(private api: JavaDataService) {}

    ngOnInit() {}
    ngOnDestroy() {}

    pingApi() {
        this.api.obtenerInfoDeUsuario().subscribe((data: any) => {
            this.responseJson = data;
            console.log(data);
        });
    }
}
