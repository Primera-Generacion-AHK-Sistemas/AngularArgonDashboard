import { LandingComponent } from '../../pages/landing/landing.component';
import { Routes } from '@angular/router';
import { TestServicesComponent } from './../../pages/test-services/test-services.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'inicio', component: LandingComponent },
    { path: 'testServices', component: TestServicesComponent },
];
