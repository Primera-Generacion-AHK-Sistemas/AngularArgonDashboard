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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var demo_data_1 = require("../demo-data");
var SercheableComponent = /** @class */ (function () {
    function SercheableComponent() {
        /** list of banks */
        this.banks = demo_data_1.BANKS;
        /** control for the selected bank */
        this.bankCtrl = new forms_1.FormControl();
        /** control for the MatSelect filter keyword */
        this.bankFilterCtrl = new forms_1.FormControl();
        /** list of banks filtered by search keyword */
        this.filteredBanks = new rxjs_1.ReplaySubject(1);
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
    }
    SercheableComponent.prototype.ngOnInit = function () {
        var _this = this;
        // set initial selection
        this.bankCtrl.setValue(this.banks[10]);
        // load the initial bank list
        this.filteredBanks.next(this.banks.slice());
        // listen for search field value changes
        this.bankFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterBanks();
        });
    };
    SercheableComponent.prototype.ngAfterViewInit = function () {
        this.setInitialValue();
    };
    SercheableComponent.prototype.ngOnDestroy = function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * Sets the initial value after the filteredBanks are loaded initially
     */
    SercheableComponent.prototype.setInitialValue = function () {
        var _this = this;
        this.filteredBanks
            .pipe(operators_1.take(1), operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            // setting the compareWith property to a comparison function
            // triggers initializing the selection according to the initial value of
            // the form control (i.e. _initializeSelection())
            // this needs to be done after the filteredBanks are loaded initially
            // and after the mat-option elements are available
            _this.singleSelect.compareWith = function (a, b) { return a && b && a.id === b.id; };
        });
    };
    SercheableComponent.prototype.filterBanks = function () {
        if (!this.banks) {
            return;
        }
        // get the search keyword
        var search = this.bankFilterCtrl.value;
        if (!search) {
            this.filteredBanks.next(this.banks.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredBanks.next(this.banks.filter(function (bank) { return bank.name.toLowerCase().indexOf(search) > -1; }));
    };
    __decorate([
        core_1.ViewChild('singleSelect', { static: true })
    ], SercheableComponent.prototype, "singleSelect");
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
