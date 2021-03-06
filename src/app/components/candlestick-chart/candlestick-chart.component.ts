import { Cedear } from 'src/app/classes/cedear/cedear';
import { AssetTechnicalAnalysis } from './../../classes/technicalAnalysis/asset-technical-analysis';
import { AssetDollarInfo } from './../../classes/dollarAnalysis/asset-dollar-info';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexYAxis,
    ApexXAxis,
    ApexLocale,
    ApexPlotOptions,
    ApexTooltip,
} from 'ng-apexcharts';
import { DatePipe } from '@angular/common';
import { Component, ViewChild, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { PythonDataService } from 'src/app/services/api/python/python-data.service';
import * as AOS from 'aos';
import es from 'src/assets/json/apexEs.json';
import { ModalManager } from 'ngb-modal';

export interface ChartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    locales: ApexLocale;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
}

@Component({
    selector: 'app-candlestick-chart',
    templateUrl: './candlestick-chart.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./candlestick-chart.component.scss'],
    providers: [DatePipe],
})
export class CandlestickChartComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    isDataAvailable = false;
    isAnalysisDataAvailable = false;
    chartIsCollapsed = true;

    @Input()
    collapseInactive: boolean;

    @Input()
    assetIncoming: Cedear;

    assetComplete = false;

    assetDollarData: AssetDollarInfo;

    assetTechnicalAnalysis: AssetTechnicalAnalysis;

    @Output()
    delete: EventEmitter<number> = new EventEmitter();

    @ViewChild('deleteModal') deleteModal;
    private modalRef;

    constructor(private pythonApi: PythonDataService, private datePipe: DatePipe, private modalService: ModalManager) {
        this.chartOptions = {
            series: [
                {
                    data: [],
                },
            ],
            chart: {
                locales: [es],
                defaultLocale: 'es',
                type: 'candlestick',
                height: 520,
                animations: {
                    enabled: false,
                },
                zoom: {
                    autoScaleYaxis: true,
                },
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: '#379D12',
                        downward: '#A31621',
                    },
                    wick: {
                        useFillColor: true,
                    },
                },
            },
            tooltip: {
                custom: function ({ seriesIndex, dataPointIndex, w }) {
                    const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
                    const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
                    const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
                    const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
                    return (
                        '<div class="apexcharts-tooltip-candlestick">' +
                        '<div>Apertura: <span class="value">' +
                        o +
                        '</span></div>' +
                        '<div>Alta: <span class="value">' +
                        h +
                        '</span></div>' +
                        '<div>Baja: <span class="value">' +
                        l +
                        '</span></div>' +
                        '<div>Cierre: <span class="value">' +
                        c +
                        '</span></div>' +
                        '</div>'
                    );
                },
            },
        };
        this.assetDollarData = new AssetDollarInfo();
        this.assetTechnicalAnalysis = new AssetTechnicalAnalysis();
    }

    deleteMe() {
        this.delete.emit(this.assetIncoming.id);
    }

    openDeleteModal() {
        this.modalRef = this.modalService.open(this.deleteModal, {
            size: 'md',
            modalClass: '',
            hideCloseButton: false,
            centered: false,
            backdrop: true,
            animation: true,
            keyboard: false,
            closeOnOutsideClick: true,
            backdropClass: 'modal-backdrop-delete',
        });
    }

    closeDeleteModal() {
        this.modalService.close(this.modalRef);
    }

    ngOnInit() {
        setTimeout(function () {
            AOS.init();
        }, 100);
    }

    getCandleChartData(ticker: string, selectedDate: string) {
        this.pythonApi
            .getCedearBetweenDates(ticker, selectedDate, this.todayDateToDatePipe())
            .subscribe((data: any) => {
                this.updateSeries(data.data);
                this.getDollarsData(data.ticker);
                this.getTechnicalAnalysis(data.ticker);
                this.assetIncoming.description = data.name;
                this.assetIncoming.ticker = data.ticker;
                this.isDataAvailable = true;
            });
    }

    updateChartWith(date: Date) {
        this.chartIsCollapsed = false;
        this.isDataAvailable = false;
        this.getCandleChartData(this.assetIncoming.ticker, this.dateToDatePipe(date));
    }

    public updateSeries(dataGET: []) {
        this.chartOptions.series = [
            {
                data: dataGET,
            },
        ];
    }

    getFirstDataOfChart() {
        this.getCandleChartData(this.assetIncoming.ticker, this.dateToDatePipe(this.aMonthAgoDate(new Date())));
    }

    assetIsCharged(): boolean {
        Object.keys(this.assetIncoming).forEach((key) => {
            if (this.assetIncoming[key] == null) {
            }
        });
        return true;
    }

    //#region CardAnalysis

    //#region DollarAnalysis
    getDollarsData(ticker: string) {
        this.pythonApi.getCedearDollarPrices(ticker).subscribe((data: any) => {
            this.assetDollarData.cclDollar = data.ccl_dollar;
            this.assetDollarData.dateUpdated = data.date_updated;
            this.assetDollarData.cedearPriceBA = data.ba_cedear_price;
            this.assetDollarData.stockPriceUSA = data.us_stock_price;
            this.assetDollarData.ratio = data.ratio;
            this.assetDollarData.cedearDollar = data.cedear_dollar;
            this.assetDollarData.diffRealPrice = data.difference;
            this.isAnalysisDataAvailable = true;
        });
    }

    updateDollarsData() {
        this.isAnalysisDataAvailable = false;
        this.getDollarsData(this.assetIncoming.ticker);
    }
    //#endregion

    //#region TechnicalAnalysis

    getTechnicalAnalysis(ticker: string) {
        this.pythonApi.getCedearTechnicalAnalysis(ticker).subscribe((data: any) => {
            // Stoch
            this.assetTechnicalAnalysis.stoch.slowk = data.stoch.slowk;
            this.assetTechnicalAnalysis.stoch.slowd = data.stoch.slowd;
            this.assetTechnicalAnalysis.stoch.signal = data.stoch.signal;

            // Adx
            this.assetTechnicalAnalysis.adx.adx = data.adx.adx;
            this.assetTechnicalAnalysis.adx.di_minus = data.adx.di_minus;
            this.assetTechnicalAnalysis.adx.di_plus = data.adx.di_plus;
            this.assetTechnicalAnalysis.adx.signal = data.adx.signal;

            // Bbands
            this.assetTechnicalAnalysis.bbands.lower = data.bbands.lower;
            this.assetTechnicalAnalysis.bbands.mid = data.bbands.mid;
            this.assetTechnicalAnalysis.bbands.upper = data.bbands.upper;
            this.assetTechnicalAnalysis.bbands.close = data.bbands.close;
            this.assetTechnicalAnalysis.bbands.signal = data.bbands.signal;
        });
    }

    //#endregion

    //#endregion

    //#region Dates

    // Dates

    todayDate() {
        return new Date();
    }

    aYearAgoDate(date: Date) {
        return new Date(date.setFullYear(date.getFullYear() - 1));
    }
    aMonthAgoDate(date: Date) {
        return new Date(date.setMonth(date.getMonth() - 1));
    }
    aWeekAgoDate(date: Date) {
        return new Date(date.setDate(date.getDate() - 7));
    }

    // Date Pipes

    dateToDatePipe(date: Date) {
        return this.datePipe.transform(date, 'yyyy/MM/dd');
    }

    todayDateToDatePipe() {
        return this.datePipe.transform(Date.now(), 'yyyy/MM/dd');
    }

    //#endregion
}
