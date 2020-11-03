import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexYAxis, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';
//import dayjs from 'dayjs'

import { DatePipe } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PythonTechnicalAnalysysDataService } from 'src/app/services/api/apianalysys/python-technical-analysys.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface ChartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
}

@Component({
    selector: 'app-share-chart',
    templateUrl: './share-chart.component.html',
    styleUrls: ['./share-chart.component.scss'],
    providers: [DatePipe],
})
export class ShareChartComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    //public options: Partial<ChartOptions>;
    candleChartTicker: '';
    candleChartName: '';
    shareChartIndicator: '';
    isDataAvailable = false;
    chartIsCollapsed = true;
    collapseInactive = true;

    public packofTickers: [{ name: any; ticker: any }?];
    public packofIndicators: string[];
    Tickers: any = [];
    Indicators: string[];

    //#region datesButtons
    oneYearBtn = false;
    oneMonthBtn = false;
    oneWeekBtn = false;
    ticker: string = 'TSLA';
    indicator: string = 'adx';
    public config = {
      displayKey:"description", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder:'Search', // label thats displayed in search input,
      searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
      }
    //#endregion

    constructor(private pythonApi: PythonTechnicalAnalysysDataService, private datePipe: DatePipe) {
        this.packofTickers = [];
        this.packofIndicators = [];
        this.chartOptions = {
          chart: {
            height: 380,
            width: "100%",
            type: "line",
          },
          series: [],
          xaxis: {
            type: "datetime",
            //min: new Date("01 Mar 2012").getTime(),
            tickAmount: 6,
            categories: [],

            labels: {
              //format: "dd/MM",
              formatter: function (timestamp) {
                var options = {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                var today = new Date(timestamp);
                //return new Date(timestamp); // The formatter function overrides format property
                return today.toLocaleDateString("es-AR");
              },
              datetimeFormatter: {
                year: "YY",
                month: "MMM 'yy",
                day: "dd",
                hour: "HH:mm",
              },
            },
            /*
              labels: {
                format: "dd/MM",
              },*/
          },
        };
        /*
        this.chartOptions = {
            series: [],
            chart: {
                type: 'line',
                height: 350,
                animations: {
                    enabled: false,
                },
            },
            xaxis: {
                categories: [],
                //type: 'datetime',

                labels: {
                    formatter: function (val) {
                        //import dayjs from 'dayjs' // ES 2015
                        //dayjs().format()
                        //val = dayjs(val).format('YYYY/MM/DD')
                        //var somevar = dayjs(val).format('YYYY/MM/DD')
                        // console.log(somevar)
                        return val
                    }
                }
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
                decimalsInFloat: undefined,
                labels: {
                    formatter: function (val, index) {
                        return val.toFixed(2);
                    },
                },
            },
        };*/
    }

    ngOnInit() {
        this.getCandleChartData(
            this.ticker,
            this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
        //console.log('getDropdowntData');
        this.getDropdowntData();
        //console.log('getIndicatorData');
        this.getIndicatorData();
        //this.namex = "da";
        //this.City = ["asdas","asdasd",'Florida', 'South Dakota', 'Tennessee', 'Michigan'];
        this.isDataAvailable = true;
    }

    getCandleChartData(ticker: string, selectedIndicator: string) {
        this.pythonApi.accion(ticker, selectedIndicator).subscribe((data: any) => {
            //this.updateTime(data);
            this.updateDataSeries(data);
            this.candleChartName = data.name;
            this.shareChartIndicator = data.indicator;
            this.candleChartTicker = data.ticker;
            this.isDataAvailable = true;
        });
    }
    onKeyUpEventonKeyUpEventTicker(event: any) {
        this.ticker = event.target.value;
        //console.log(this.ticker);
        this.getCandleChartData(this.ticker, this.indicator);
    }
    onKeyUpEventonKeyUpEventIndicator(event: any) {
        this.indicator = event.target.value;
        //console.log(this.indicator);
        this.getCandleChartData(this.ticker, this.indicator);
    }
    updateChartWith(date: Date) {
        //this.isDataAvailable = false;
        //this.getCandleChartData(this.ticker, this.indicator);
    }

    public updateDataSeries(dataGET: { name: any; indicator: any; values: any; data: any; date: any }) {
            var megaentry: [{ name?: string;data: number[]}];
            megaentry = dataGET.data;
            this.chartOptions.series = megaentry;
            this.chartOptions.xaxis.categories = dataGET.date;
    }
    public updateTime(datesGET: { name: any; indicator: any; values: any; data: any; date: any }) {
        var test = Object.values(datesGET.date);
        this.chartOptions.xaxis.categories = datesGET.date;
    }

    public updateSeriesSync() {
    }

    changeTickers(e) {
        //console.log('lo que seleccionaste');
        //console.log(e.target.value);
        //console.log(e)
        this.ticker = e.target.value;
        this.getCandleChartData(
            this.ticker,
            this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
        );
    }
    changeIndicator(e) {
        //console.log('lo que seleccionaste');
        //console.log(e.target.value);
        this.indicator = e.target.value;
        this.getCandleChartData(
            this.ticker,
            this.indicator
        );
    }

    getIndicatorData() {
        this.pythonApi.getCEDEARS().subscribe((data: any) => {

            this.packofIndicators = Object.keys(data.indicators);
            this.Indicators = this.packofIndicators;
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

            this.Tickers = this.packofTickers;
            this.isDataAvailable = true;
        });
    }
}
