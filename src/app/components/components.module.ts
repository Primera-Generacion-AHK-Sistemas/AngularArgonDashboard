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
import { SelectableDropdownComponent } from './selectable-dropdown/selectable-dropdown.component';// src\app\components\selectable-dropdown\selectable-dropdown.component.ts

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule, NgApexchartsModule],
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
    ],
})
export class ComponentsModule {}
