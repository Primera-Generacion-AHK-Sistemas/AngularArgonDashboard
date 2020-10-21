import { FAQComponent } from './../../pages/faq/faq.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TechnicalAnalysysComponent } from '../../pages/technicalAnalysys/technicalAnalysys.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TableListsComponent } from './../../pages/table-lists/table-lists.component';
import { DashboardDetailsComponent } from '../../pages/dashboard-details/dashboard-details.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'analisis-tecnico', component: TechnicalAnalysysComponent },
    { path: 'perfil', component: UserProfileComponent },
    { path: 'tabla-cedears', component: TablesComponent },
    { path: 'listas-seguimiento', component: TableListsComponent },
    { path: 'detalle-cedear', component: DashboardDetailsComponent },
    { path: 'FAQ', component: FAQComponent },
];
