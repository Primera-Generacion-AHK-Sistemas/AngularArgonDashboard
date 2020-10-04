import { LandingComponent } from './../../pages/landing/landing.component';
import { TestServicesComponent } from './../../pages/test-services/test-services.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthLayoutRoutes),
        FormsModule,
        CarouselModule,
        // NgbModule
    ],
    declarations: [TestServicesComponent, LandingComponent],
})
export class AuthLayoutModule {}
