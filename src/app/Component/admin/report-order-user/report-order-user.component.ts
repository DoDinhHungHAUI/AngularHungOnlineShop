import { ReportOrderUserService } from './../../../service/report-order-user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report-order-user',
  templateUrl: './report-order-user.component.html',
  styleUrls: ['./report-order-user.component.css']
})
export class ReportOrderUserComponent implements OnInit {

  listUserOrder : any;

  listReportOrder : any;
  isDisplayTablePopup : boolean = false;
  userName : any;
  inforUser : any = "";

  constructor(private reportOrderUserService :  ReportOrderUserService , private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.loadReportUserOrder();
  }

  loadReportUserOrder()
  {
    this.reportOrderUserService.GetUserOrder().subscribe(data => {
      this.listUserOrder = data;
    },
    error => {
      this.toastrService.error('Có lỗi trong quá trình xử lý' , 'Thông báo' , {
        timeOut : 2000
      })
    })
  }

  onDetailOrder(item : any)
  {
    this.inforUser = item;
    // this.userName = item.FullName
    this.reportOrderUserService.GetReportUserOrder(item.CustomerId).subscribe(data => {
      this.listReportOrder = data;
      this.isDisplayTablePopup = true;
    },error => {
      this.toastrService.error('Có lỗi trong quá trình xử lý' , 'Thông báo' , {
        timeOut : 2000
      })
    })
  }

  closePopup()
  {
    this.isDisplayTablePopup = false;
  }

  openPDF()
  {
    let DATA = document.getElementById('container') as HTMLElement;
    console.log(DATA);
    html2canvas(DATA).then(canvas => {

        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

        PDF.save('hoa-don.pdf');
    });
  }

}
