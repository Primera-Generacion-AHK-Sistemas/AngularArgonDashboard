"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SercheableComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/** @title Form field with prefix & suffix */
var SercheableComponent = /** @class */ (function () {
    function SercheableComponent(builder) {
        this.builder = builder;
        this.areas = [
            "Tokyo",
            "NewYork",
            "Portland",
            "Robert",
            "Juan",
            "El Pepe"
        ];
        this.selectedAreas = this.areas;
        this.area = new forms_1.FormControl("", [forms_1.Validators.required]);
        this.myForm = this.builder.group({
            area: this.area
        });
    }
    SercheableComponent.prototype.search = function (query) {
        console.log("query", query);
        var result = this.select(query);
        this.selectedAreas = result;
    };
    SercheableComponent.prototype.select = function (query) {
        var result = [];
        for (var _i = 0, _a = this.areas; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.toLowerCase().indexOf(query) > -1) {
                result.push(a);
            }
        }
        return result;
    };
    SercheableComponent = __decorate([
        core_1.Component({
            selector: 'app-sercheable-component',
            templateUrl: './sercheable-dropdown.component.html',
            styleUrls: ['./sercheable-dropdown.component.scss']
        })
    ], SercheableComponent);
    return SercheableComponent;
}());
exports.SercheableComponent = SercheableComponent;
