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

  oneYearBtn = false;
  oneMonthBtn = false;
  oneWeekBtn = false;
  ticker: string = 'TSLA';
  indicator: string = 'adx';
  constructor(private pythonApi: PythonTechnicalAnalysysDataService, private datePipe: DatePipe) {

    this.packofTickers = [];
    this.packofIndicators = [];
    this.chartOptions = {
      chart: {
        height: 380,
        width: "100%",
        type: "line",
      },
      colors: [],
      annotations: {},
      series: [],
      xaxis: {
        tickAmount: 6,
        categories: [],

        labels: {
          show: true,
          formatter: function (val) {
            var valor = dayjs(val).format('DD/MM/YYYY')
            return valor
          }
        }
      }
    }
  }


  addCustomUser = (term) => ({ id: term, name: term });

  ngOnInit() {
    this.getCandleChartData(
      this.ticker,
      this.indicator
    );
    this.getDropdowntData();
    this.getIndicatorData();
  }

  onChange($event) {
    this.ticker = $event.ticker;
    this.getCandleChartData(
      this.ticker,
      this.indicator
    );

  }
  onChangeIndicator($event) {
    this.indicator = $event;
    this.getCandleChartData(
      this.ticker,
      this.indicator //this.dateToDatePipe(this.aMonthAgoDate(new Date())
    );

  }

  getCandleChartData(ticker: string, selectedIndicator: string) {
    this.pythonApi.accion(ticker, selectedIndicator).subscribe((data: any) => {
      this.updateChartOptions(data);
      this.updateSeries(data);
      //this.chartOptions.series = data.data;
      this.updateTime(data);
      this.candleChartName = data.name;
      this.shareChartIndicator = data.indicator;
      this.candleChartTicker = data.ticker;
      this.isDataAvailable = true;
      this.collapseInactive = false;
      this.chartIsCollapsed = false;
    });
  }
  /**
   * name
   */
  public updateChartOptions(dataGET: { name: any; indicator: any; values: any; data: any; date: any }) {
    console.log(dataGET.indicator);
    switch (dataGET.indicator) {
      case "adx":
        console.log("Índice de movimiento direccional (DMI)");
        this.chartOptions.colors = ["#775dd0", "#00e396", "#ff4560"];
        this.chartOptions.annotations = {yaxis: [{y: 25,
              borderColor: "#000000",
              label: {
                borderColor: "#000000",
                style: {
                  color: "#000000",
                  background: "#000000",
                },
                //text: "Y Axis Annotation",
              },
            },
          ],
        };
        break;
      case "stoch":
        console.log("Indicador Estocástico");
        this.chartOptions.colors = ["#00e396", "#ff4560"];
        this.chartOptions.annotations = {
          yaxis: [
            {
              y: 20,
              borderColor: "#000000",
              label: {
                borderColor: "#000000",
                style: {
                  color: "#000000",
                  background: "#000000",
                },
                //text: "Y Axis Annotation",
              },
            },
            {
              y: 80,
              borderColor: "#000000",
              label: {
                borderColor: "#000000",
                style: {
                  color: "#000000",
                  background: "#000000",
                },
                //text: "Y Axis Annotation",
              },
            },
          ]};
        break;
      case "bbands":
        console.log("Bollinger Bands");
        this.chartOptions.colors = ["#00e396", "#7eb9e0","#feb019","#008ffb"];
        this.chartOptions.annotations = {};
        break;
      case "atx":
        console.log("Average True Range (ATR)");
        this.chartOptions.colors = ["#feb019"];
        this.chartOptions.annotations = {};
        break;
      default:
        console.log("anyone");
        this.chartOptions.colors = [];
        this.chartOptions.annotations = {};
        break;
    }

    console.log("Options");
    console.log(this.chartOptions);
  }
  public updateSeries(dataGET: { name: any; indicator: any; values: any; data: any; date: any }) {
    //var dataGetted: [{ name: any; data: any[] }?];
    //dataGetted = dataGET.data;
    //console.log(dataGetted);
    this.chartOptions.series = dataGET.data;
    //console.log(dataGET.data);

  }
  public updateTime(datesGET: { name: any; indicator: any; values: any; data: any; date: any }) {
    this.chartOptions.xaxis.categories = datesGET.date;
  }



  changeTickers(e) {
    this.ticker = e.target.value;
    this.getCandleChartData(
      this.ticker,
      this.indicator
    );
  }
  changeIndicator(e) {
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
    });
  }
}
