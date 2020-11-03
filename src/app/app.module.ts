import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngb-modal';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { TableListsComponent } from './pages/table-lists/table-lists.component';
import { DashboardDetailsComponent } from './pages/dashboard-details/dashboard-details.component';

import { ToastrModule } from 'ngx-toastr';
import { FAQComponent } from './pages/faq/faq.component';

//import { MatFormFieldModule, MatSelectModule } from '@angular/material';
//import { MatFormFieldModule } from "@angular/material/form-field";
//import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HammerModule } from "@angular/platform-browser";


import { BrowserModule } from '@angular/platform-browser';
import { DropdownlistComponent } from './dropdownlist/dropdownlist.component';



//import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';



//import { SingleSelectionExampleComponent } from './examples/01-single-selection-example/single-selection-example.component';


@NgModule({
    imports: [
      //SingleSelectionExampleComponent,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatSelectModule,
      MatFormFieldModule,
      NgxMatSelectSearchModule,

      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HammerModule,
      BrowserAnimationsModule,
      MatSelectModule,
      MatFormFieldModule,
      //NgxMatSelectSearchModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ComponentsModule,
      NgbModule,
      RouterModule,
      AppRoutingModule,
      ToastrModule.forRoot(),
      ModalModule,
      AuthModule.forRoot({
          ...env.auth,
          httpInterceptor: {
              ...env.httpInterceptor,
          },
      }),
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        TableListsComponent,
        DashboardDetailsComponent,
        FAQComponent,
        DropdownlistComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
