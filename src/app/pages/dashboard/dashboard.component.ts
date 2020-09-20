import { PythonDataService } from './../../services/api/python/python-data.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from '../../variables/charts';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [DatePipe],
})
export class DashboardComponent implements OnInit {
    public datasets: any;
    public data: any;
    public salesChart;
    public clicked: boolean = true;
    public clicked1: boolean = false;
    candleChartData: any;

    constructor(
        private pythonApi: PythonDataService,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        this.datasets = [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ];
        this.data = this.datasets[0];

        var chartOrders = document.getElementById('chart-orders');

        parseOptions(Chart, chartOptions());

        var ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options: chartExample2.options,
            data: chartExample2.data,
        });

        var chartSales = document.getElementById('chart-sales');

        this.salesChart = new Chart(chartSales, {
            type: 'line',
            options: chartExample1.options,
            data: chartExample1.data,
        });

        this.getCandleChartData();
    }

    public updateOptions() {
        this.salesChart.data.datasets[0].data = this.data;
        this.salesChart.update();
    }

    getCandleChartData() {
        this.pythonApi
            .accion(
                'MSFT',
                this.todayDateToDatePipe(),
                this.aYearAgoDateToDatePipe()
            )
            .subscribe((data: any) => {
                this.candleChartData = data;
                console.log(data);
            });
    }

    aYearAgoDate(date: Date) {
        return date.setFullYear(date.getFullYear() - 1);
    }

    aYearAgoDateToDatePipe() {
        return this.datePipe.transform(
            this.aYearAgoDate(new Date()),
            'yyyy/MM/dd'
        );
    }

    todayDateToDatePipe() {
        return this.datePipe.transform(Date.now(), 'yyyy/MM/dd');
    }
}
