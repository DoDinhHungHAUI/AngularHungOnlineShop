import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-report',
  templateUrl: './template-report.component.html',
  styleUrls: ['./template-report.component.css']
})
export class TemplateReportComponent implements OnInit {

  @Input('listReportOrder') listReportOrder : any;
  @Input('inforUser') inforUser : any;


  tongTien : any = 0;

  constructor() { }

  ngOnInit(): void {
    this.totalPrice();
  }

  totalPrice()
  {
    this.listReportOrder.forEach((element : any) => {
      this.tongTien = this.tongTien + (element.Price * element.Quantity);
    });
  }

}
