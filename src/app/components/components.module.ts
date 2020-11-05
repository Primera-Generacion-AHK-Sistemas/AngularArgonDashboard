import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CandlestickChartComponent } from './candlestick-chart/candlestick-chart.component';
import { ShareChartComponent } from './share-chart/share-chart.component';
import { SelectableDropdownComponent } from './selectable-dropdown/selectable-dropdown.component';
import { ModalModule } from 'ngb-modal';
import { JoyrideModule } from 'ngx-joyride';

import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
    imports: [NgSelectModule,CommonModule, RouterModule, NgbModule, NgApexchartsModule, ModalModule, JoyrideModule.forChild()],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CandlestickChartComponent,
        ShareChartComponent,
        SelectableDropdownComponent,
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CandlestickChartComponent,
        ShareChartComponent,
        SelectableDropdownComponent,
        NgSelectModule
    ],
})
export class ComponentsModule {}
