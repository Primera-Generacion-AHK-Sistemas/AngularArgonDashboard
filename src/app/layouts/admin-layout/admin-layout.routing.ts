import { FAQComponent } from './../../pages/faq/faq.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TechnicalAnalysysComponent } from '../../pages/technicalAnalysys/technicalAnalysys.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TableListsComponent } from './../../pages/table-lists/table-lists.component';
import { DetailsAssetsComponent } from './../../pages/details-assets/details-assets.component';
import { DetailsListAssetsComponent } from './../../pages/details-list-assets/details-list-assets.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'analisis-tecnico', component: TechnicalAnalysysComponent },
    { path: 'perfil', component: UserProfileComponent },
    { path: 'tabla-cedears', component: TablesComponent },
    { path: 'listas-seguimiento', component: TableListsComponent },
    { path: 'detalles-cedears', component: DetailsAssetsComponent },
    { path: 'detalles-listas-cedears', component: DetailsListAssetsComponent },
    { path: 'FAQ', component: FAQComponent },
];
