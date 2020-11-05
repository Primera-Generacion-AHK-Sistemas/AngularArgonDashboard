"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var admin_layout_component_1 = require("./layouts/admin-layout/admin-layout.component");
var auth_layout_component_1 = require("./layouts/auth-layout/auth-layout.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngb_modal_1 = require("ngb-modal");
var app_routing_1 = require("./app.routing");
var components_module_1 = require("./components/components.module");
var auth0_angular_1 = require("@auth0/auth0-angular");
var environment_1 = require("../environments/environment");
var table_lists_component_1 = require("./pages/table-lists/table-lists.component");
var details_assets_component_1 = require("./pages/details-assets/details-assets.component");
var ngx_toastr_1 = require("ngx-toastr");
var details_list_assets_component_1 = require("./pages/details-list-assets/details-list-assets.component");
var faq_component_1 = require("./pages/faq/faq.component");
var ngx_joyride_1 = require("ngx-joyride");
var platform_browser_1 = require("@angular/platform-browser");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                components_module_1.ComponentsModule,
                ng_bootstrap_1.NgbModule,
                router_1.RouterModule,
                app_routing_1.AppRoutingModule,
                ngx_toastr_1.ToastrModule.forRoot(),
                ngb_modal_1.ModalModule,
                auth0_angular_1.AuthModule.forRoot(__assign(__assign({}, environment_1.environment.auth), { httpInterceptor: __assign({}, environment_1.environment.httpInterceptor) })),
                ngx_joyride_1.JoyrideModule.forRoot(),
            ],
            declarations: [
                app_component_1.AppComponent,
                admin_layout_component_1.AdminLayoutComponent,
                auth_layout_component_1.AuthLayoutComponent,
                table_lists_component_1.TableListsComponent,
                details_assets_component_1.DetailsAssetsComponent,
                details_list_assets_component_1.DetailsListAssetsComponent,
                faq_component_1.FAQComponent,
            ],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: auth0_angular_1.AuthHttpInterceptor,
                    multi: true
                },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
