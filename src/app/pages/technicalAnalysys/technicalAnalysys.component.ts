import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
    chartOptions,
    parseOptions,
    chartExample2,
} from '../../variables/charts';

@Component({
    selector: 'app-dashboard',
    templateUrl: './technicalAnalysys.component.html',
    styleUrls: ['./technicalAnalysys.component.scss'],
})
export class TechnicalAnalysysComponent implements OnInit {
    public datasets: any;
    public data: any;
    public salesChart;

    constructor() {}

    ngOnInit() {
        this.datasets = [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ];
        this.data = this.datasets[0];

        var chartOrders = document.getElementById('chart-orders');

        parseOptions(Chart, chartOptions());

        //var city = ["asdas","asdasd"];
       
    }

    public updateOptions() {
        this.salesChart.data.datasets[0].data = this.data;
        this.salesChart.update();
    }
}
