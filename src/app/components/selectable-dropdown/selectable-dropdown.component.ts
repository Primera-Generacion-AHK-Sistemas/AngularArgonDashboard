import { Component, ViewChild, OnInit } from '@angular/core';
import { PythonTechnicalAnalysysDataService } from 'src/app/services/api/apianalysys/python-technical-analysys.service';

@Component({
    selector: 'app-selectable-dropdown',
    templateUrl: './selectable-dropdown.component.html',
    styleUrls: ['./selectable-dropdown.component.scss'],
})
export class SelectableDropdownComponent implements OnInit {
    public packofTickers: [{ name: any, ticker: any}?];
    public packofIndicators: string[];
    namex: string;
    titlex: string;
    simple: string;
    isDataAvailable = false;
    chartIsCollapsed = true;
    collapseInactive = true;
    //city: ["asdas","asdasd"];
    //city: [string];
    //City: string[]
    Tickers: any = []
    Indicators: string[];
    //test: Date = new Date();

    constructor(
        private pythonApi: PythonTechnicalAnalysysDataService,) {
            this.packofTickers = [];
            this.packofIndicators = [];
        }




    ngOnInit() {
        console.log("getDropdowntData")
        this.getDropdowntData()
        console.log("getIndicatorData")
        this.getIndicatorData()
        //this.namex = "da";
        //this.City = ["asdas","asdasd",'Florida', 'South Dakota', 'Tennessee', 'Michigan'];
        //this.isDataAvailable = true;
    }
 // Choose city using select dropdown
 changeCity(e) {
    console.log("lo que seleccionaste")
    console.log(e.target.value)
    //console.log(e)
  }


  getIndicatorData() {
    this.pythonApi
        .getCEDEARS()
        .subscribe((data: any) => {
            //this.updateSeries(data);
            //this.updateTime(data);

            console.log("get Indicators Data")

            console.log(data.indicators);

            //var array_of_values: any = []
            //console.log(keysss);

            this.packofIndicators = Object.keys(data.indicators);
            //console.log(data.indicators)
            this.namex = "da";
            this.Tickers = this.packofIndicators;
            this.isDataAvailable = true;
            /*
            for (let index = 0; index < data.indicators.length; index++) {
                //const element = this.chartOptions.series[index];
                //console.log("index");
                //console.log(index);
                //this.chartOptions.series[index].pop()
                //this.chartOptions.series[index];
                //console.log(data.cedears[index].nombre);
                //array_of_values.push(data.cedears[index].nombre);
                console.log("indicators");
                console.log(data.indicators[index])
                var keys = Object.keys(data.indicators[index]);
                console.log(keys)
                //var newentry: { name: string; ticker:string; } = { name: data.cedears[index].nombre, ticker: data.cedears[index].ticker };
                //this.packoftickers.push(newentry)
            }
            */
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
            //this.City = ["asdas","asdasd",'Florida', 'South Dakota', 'Tennessee', 'Michigan'];
            //this.City = this.packoftickers;
            //this.isDataAvailable = true;
        });
}
    getDropdowntData() {
        this.pythonApi
            .getCEDEARS()
            .subscribe((data: any) => {
                //this.updateSeries(data);
                //this.updateTime(data);


                //console.log(data.indicators);
                //console.log("odex");

                //console.log("values");
                //var array_of_values: any = []

                for (let index = 0; index < data.cedears.length; index++) {
                    //const element = this.chartOptions.series[index];
                    //console.log("index");
                    //console.log(index);
                    //this.chartOptions.series[index].pop()
                    //this.chartOptions.series[index];
                    //console.log(data.cedears[index].nombre);
                    //array_of_values.push(data.cedears[index].nombre);

                    var newentry: { name: string; ticker:string; } = { name: data.cedears[index].nombre, ticker: data.cedears[index].ticker };
                    this.packofTickers.push(newentry)
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





                console.log("get CEDEARS")
                console.log(data.cedears)
                this.namex = "da";
                //this.City = ["asdas","asdasd",'Florida', 'South Dakota', 'Tennessee', 'Michigan'];
                this.Tickers = this.packofTickers;
                this.isDataAvailable = true;
            });
    }
 // Choose city using select dropdown

}
