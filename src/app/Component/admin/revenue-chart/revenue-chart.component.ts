import { map } from 'rxjs/operators';
import { StatisticRevenueService } from './../../../service/statistic-revenue.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Chart, registerables} from 'chart.js';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.css']
})
export class RevenueChartComponent implements OnInit {

  listStatisticRevenue : any = [];

  fromDate : string = "01/01/2021";
  toDate : string = "01/01/2022";

  fromDateChange : string = "01/01/2021";
  toDateChange : string = "01/01/2022";

  chart : any =[];
  benefit : any = [];
  date : any = [];


  constructor(private statisticRevenueService :  StatisticRevenueService , private toastrService : ToastrService) {
    Chart.register(...registerables);

   }

  ngOnInit(): void {
    this.loadListStatisticRevenue();

  }

  initChart()
  {

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
          labels: this.date,
          datasets: [{
              label: '# lợi nhuận',//Ngày tháng
              data: this.benefit,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  loadListStatisticRevenue()
  {
    this.statisticRevenueService.getAll(this.fromDate , this.toDate).subscribe(data => {
      this.listStatisticRevenue = data;
      this.benefit = this.listStatisticRevenue.map((item : any) => item.Benefit);
      this.date =  this.listStatisticRevenue.map((item : any) => this.formatDate(item.Date));

      this.initChart();

      console.log(this.benefit);
    },
    error => {
      this.toastrService.error('Có lỗi trong quá trình xử lý' , 'Thông báo', {
        timeOut : 2000
      })
      console.log(error);
    })
  }

  formatDate(dateTimeFormat : any)
  {
    var yyyy = dateTimeFormat.slice(0,4);
    var mm = dateTimeFormat.slice(5,7);
    var dd = dateTimeFormat.slice(8,10);
    return dd + '-' + mm + '-' + yyyy;
  }

  thongKe()
  {
    this.fromDateChange = this.fromDate.slice(8,10) + '/' + this.fromDate.slice(5,7) + '/' + this.fromDate.slice(0,4);
    this.toDateChange = this.toDate.slice(8,10) + '/' + this.toDate.slice(5,7) + '/' + this.toDate.slice(0,4);


    this.statisticRevenueService.getAll(this.fromDate , this.toDate).subscribe(data => {
      this.listStatisticRevenue = data;
      console.log(this.listStatisticRevenue);
      this.benefit = this.listStatisticRevenue.map((item : any) => item.Benefit);
      this.date =  this.listStatisticRevenue.map((item : any) => this.formatDate(item.Date));

      this.chart.destroy();

      this.initChart();

    });
  }

}
