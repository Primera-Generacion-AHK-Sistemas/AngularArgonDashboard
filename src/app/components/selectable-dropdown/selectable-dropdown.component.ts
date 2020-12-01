import { Component, ViewChild, OnInit } from '@angular/core';
import { PythonTechnicalAnalysysDataService } from 'src/app/services/api/apianalysys/python-technical-analysys.service';

@Component({
    selector: 'app-selectable-dropdown',
    templateUrl: './selectable-dropdown.component.html',
    styleUrls: ['./selectable-dropdown.component.scss'],
})
export class SelectableDropdownComponent implements OnInit {
    public packofTickers: [{ name: any; ticker: any }?];
    public packofIndicators: string[];
    namex: string;
    titlex: string;
    simple: string;
    isDataAvailable = false;
    chartIsCollapsed = true;
    collapseInactive = true;
    Tickers: any = [];
    Indicators: string[];

    constructor(private pythonApi: PythonTechnicalAnalysysDataService) {
        this.packofTickers = [];
        this.packofIndicators = [];
    }

    ngOnInit() {
        this.getDropdowntData();
        this.getIndicatorData();
    }
    // Choose city using select dropdown
    changeCity(e) {}

    getIndicatorData() {
        this.pythonApi.getCEDEARS().subscribe((data: any) => {
            this.packofIndicators = Object.keys(data.indicators);
            this.namex = 'da';
            this.Tickers = this.packofIndicators;
            this.isDataAvailable = true;
        });
    }
    getDropdowntData() {
        this.pythonApi.getCEDEARS().subscribe((data: any) => {
            for (let index = 0; index < data.cedears.length; index++) {
                var newentry: { name: string; ticker: string } = {
                    name: data.cedears[index].nombre,
                    ticker: data.cedears[index].ticker,
                };
                this.packofTickers.push(newentry);
            }

            this.namex = 'da';
            this.Tickers = this.packofTickers;
            this.isDataAvailable = true;
        });
    }
    // Choose city using select dropdown
}
