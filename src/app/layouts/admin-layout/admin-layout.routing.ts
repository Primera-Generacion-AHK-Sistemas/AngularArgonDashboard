import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TechnicalAnalysysComponent } from '../../pages/technicalAnalysys/technicalAnalysys.component'; 
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TableListsComponent } from './../../pages/table-lists/table-lists.component';
import { DashboardDetailsComponent } from '../../pages/dashboard-details/dashboard-details.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'technicalanalysys', component: TechnicalAnalysysComponent },
    { path: 'perfil', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'lists', component: TableListsComponent },
    { path: 'detailsCedears', component: DashboardDetailsComponent },
];
