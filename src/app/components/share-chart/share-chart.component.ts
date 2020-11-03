import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { DatePipe } from '@angular/common';
import { PythonTechnicalAnalysysDataService } from 'src/app/services/api/apianalysys/python-technical-analysys.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Bank, BANKS } from '../demo-data';


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

  /** list of banks */
  protected banks: Bank[] = BANKS;

  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();



  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  candleChartTicker: '';
  candleChartName: '';
  shareChartIndicator: '';
  isDataAvailable = false;
  chartIsCollapsed = true;
  collapseInactive = true;

  //#region datesButtons
  oneYearBtn = false;
  oneMonthBtn = false;
  oneWeekBtn = false;
  ticker: string = 'TSLA';
  indicator: string = 'adx';
  //#endregion

  constructor(
      private pythonApi: PythonTechnicalAnalysysDataService,
      private datePipe: DatePipe
  ) {
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
  }

  ngOnInit() {
      this.getCandleChartData(
          this.ticker, this.indicator//this.dateToDatePipe(this.aMonthAgoDate(new Date())
      );
      // set initial selection
      this.bankCtrl.setValue(this.banks[10]);

      // load the initial bank list
      this.filteredBanks.next(this.banks.slice());

      // listen for search field value changes
      this.bankFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanks();
        });
  }

  getCandleChartData(ticker: string, selectedIndicator: string) {
      this.pythonApi
          .accion(ticker, selectedIndicator)
          .subscribe((data: any) => {
              this.updateSeries(data);
              this.updateTime(data);
              this.candleChartName = data.name;
              this.shareChartIndicator = data.indicator;
              this.candleChartTicker = data.ticker;
              this.isDataAvailable = true;
          });
  }
  onKeyUpEventonKeyUpEventTicker(event: any) {

      this.ticker = event.target.value;
      console.log(this.ticker);
      this.getCandleChartData(this.ticker, this.indicator);

  }
  onKeyUpEventonKeyUpEventIndicator(event: any) {

      this.indicator = event.target.value;
      console.log(this.indicator);
      this.getCandleChartData(this.ticker, this.indicator);

  }
  updateChartWith(date: Date) {
      //this.isDataAvailable = false;
      //this.getCandleChartData(this.ticker, this.indicator);
  }

  public updateSeries(dataGET: { name: any, indicator: any, values: any, data: any, date: any }) {

    var megaentry: [{ name?: string;data: number[]}];
    megaentry = dataGET.data;
    this.chartOptions.series = megaentry;
    this.chartOptions.xaxis.categories = dataGET.date;

    this.chartOptions.xaxis.categories = dataGET.date;

  }
  public updateTime(datesGET: { name: any, indicator: any, values: any, data: any, date: any }) {
      this.chartOptions.xaxis.categories = datesGET.date

  }

  public updateSeriesSync() {
      this.chartOptions.series = [{
          data: [23, 44, 1, 22]
      }];
  }

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



  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        //commented
        //this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
