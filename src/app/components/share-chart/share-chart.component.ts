//import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexYAxis, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';
import dayjs from 'dayjs'
import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexMarkers,
  ApexAnnotations,
  ApexStroke
} from "ng-apexcharts";

import { DatePipe } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PythonTechnicalAnalysysDataService } from 'src/app/services/api/apianalysys/python-technical-analysys.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

/*
export interface ChartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
}*/
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-share-chart',
  templateUrl: './share-chart.component.html',
  styleUrls: ['./share-chart.component.scss'],
  providers: [DatePipe],
})
export class ShareChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
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
  //#endregion

  constructor(private pythonApi: PythonTechnicalAnalysysDataService, private datePipe: DatePipe) {
    this.packofTickers = [];
    this.packofIndicators = [];
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
        tickAmount: 6,
        categories: [],
        labels: {
            show: true,
        },
    }*/
    this.chartOptions = {
      chart: {
        height: 380,
        width: "100%",
        type: "line",
      },
      series: [],
      xaxis: {
        tickAmount: 6,
        categories: [],

        labels: {
          show: true,
        }
        /*
        type: "datetime",
        //min: new Date("01 Mar 2012").getTime(),
        tickAmount: 6,
        categories: [],

        labels: {
          show: true,
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
         */
        }
        /*
          labels: {
            format: "dd/MM",
          },*/


  }
}



  ngOnInit() {
    this.getCandleChartData(
      this.ticker,
      this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
    );
    console.log('getDropdowntData');
    this.getDropdowntData();
    console.log('getIndicatorData');
    this.getIndicatorData();
    //this.namex = "da";
    //this.City = ["asdas","asdasd",'Florida', 'South Dakota', 'Tennessee', 'Michigan'];
    //this.isDataAvailable = true;
  }

  getCandleChartData(ticker: string, selectedIndicator: string) {
    this.pythonApi.accion(ticker, selectedIndicator).subscribe((data: any) => {
      this.updateSeries(data);
      //this.chartOptions.series = data.data;
      this.updateTime(data);
      this.candleChartName = data.name;
      this.shareChartIndicator = data.indicator;
      this.candleChartTicker = data.ticker;
      this.isDataAvailable = true;
    });
  }

  public updateSeries(dataGET: { name: any; indicator: any; values: any; data: any; date: any }) {
    //var dataGetted: [{ name: any; data: any[] }?];
    //dataGetted = dataGET.data;
    //console.log(dataGetted);
    this.chartOptions.series = dataGET.data;
    console.log(dataGET.data);

  }
  public updateTime(datesGET: { name: any; indicator: any; values: any; data: any; date: any }) {
    //console.log('date');
    //console.log(datesGET.date);
    //var test = Object.values(datesGET.date);
    //console.log('test');
    //console.log(test);

    this.chartOptions.xaxis.categories = datesGET.date;
    console.log(datesGET.date);
    console.log(this.chartOptions);
  }



  changeTickers(e) {
    console.log('lo que seleccionaste');
    console.log(e.target.value);
    //console.log(e)
    this.ticker = e.target.value;
    this.getCandleChartData(
      this.ticker,
      this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
    );
  }
  changeIndicator(e) {
    console.log('lo que seleccionaste');
    console.log(e.target.value);
    this.indicator = e.target.value;
    this.getCandleChartData(
      this.ticker,
      this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
    );
  }

  getIndicatorData() {
    this.pythonApi.getCEDEARS().subscribe((data: any) => {


      this.packofIndicators = Object.keys(data.indicators);

      this.Indicators = this.packofIndicators;
      //this.isDataAvailable = true;

      //this.isDataAvailable = true;
    });
  }
  getDropdowntData() {
    this.pythonApi.getCEDEARS().subscribe((data: any) => {
      //this.updateSeries(data);
      //this.updateTime(data);

      console.log(data.indicators);
      console.log('odex');

      console.log('values');
      //var array_of_values: any = []

      for (let index = 0; index < data.cedears.length; index++) {
        //const element = this.chartOptions.series[index];
        //console.log("index");
        //console.log(index);
        //this.chartOptions.series[index].pop()
        //this.chartOptions.series[index];
        //console.log(data.cedears[index].nombre);
        //array_of_values.push(data.cedears[index].nombre);

        var newentry: { name: string; ticker: string } = {
          name: data.cedears[index].nombre,
          ticker: data.cedears[index].ticker,
        };
        this.packofTickers.push(newentry);
      }
      /*
       */
      //this.chartOptions.series.pop()
      //console.log(dataGET);
      //var values: { name: any, indicator: any, values: any, data: any, date: any };
      /*
          ticker	"AMD"
          name	"Advanced Micro Devices, Inc."
          indicator	"adx"
          values	[…]
          data	{…}
          date	[…]
          */
      //values = dataGET;

      console.log('get CEDEARS');
      console.log(data.cedears);
      //this.namex = "da";
      //this.City = ["asdas","asdasd",'Florida', 'South Dakota', 'Tennessee', 'Michigan'];
      this.Tickers = this.packofTickers;
      //this.isDataAvailable = true;
    });
  }
}
