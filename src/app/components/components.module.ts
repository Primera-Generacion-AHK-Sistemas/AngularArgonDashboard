import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CandlestickChartComponent } from './candlestick-chart/candlestick-chart.component';
import { InfoAssetComponent } from './info-asset/info-asset.component';

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule, NgApexchartsModule],
    declarations: [FooterComponent, NavbarComponent, SidebarComponent, CandlestickChartComponent, InfoAssetComponent],
    exports: [FooterComponent, NavbarComponent, SidebarComponent, CandlestickChartComponent, InfoAssetComponent],
})
export class ComponentsModule {}
