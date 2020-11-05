"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComponentsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng_apexcharts_1 = require("ng-apexcharts");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var navbar_component_1 = require("./navbar/navbar.component");
var footer_component_1 = require("./footer/footer.component");
var candlestick_chart_component_1 = require("./candlestick-chart/candlestick-chart.component");
var share_chart_component_1 = require("./share-chart/share-chart.component");
var selectable_dropdown_component_1 = require("./selectable-dropdown/selectable-dropdown.component");
var ngb_modal_1 = require("ngb-modal");
var ngx_joyride_1 = require("ngx-joyride");
var ng_select_1 = require("@ng-select/ng-select");
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        core_1.NgModule({
            imports: [ng_select_1.NgSelectModule, common_1.CommonModule, router_1.RouterModule, ng_bootstrap_1.NgbModule, ng_apexcharts_1.NgApexchartsModule, ngb_modal_1.ModalModule, ngx_joyride_1.JoyrideModule.forChild()],
            declarations: [
                footer_component_1.FooterComponent,
                navbar_component_1.NavbarComponent,
                sidebar_component_1.SidebarComponent,
                candlestick_chart_component_1.CandlestickChartComponent,
                share_chart_component_1.ShareChartComponent,
                selectable_dropdown_component_1.SelectableDropdownComponent,
            ],
            exports: [
                footer_component_1.FooterComponent,
                navbar_component_1.NavbarComponent,
                sidebar_component_1.SidebarComponent,
                candlestick_chart_component_1.CandlestickChartComponent,
                share_chart_component_1.ShareChartComponent,
                selectable_dropdown_component_1.SelectableDropdownComponent,
                ng_select_1.NgSelectModule
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
exports.ComponentsModule = ComponentsModule;
