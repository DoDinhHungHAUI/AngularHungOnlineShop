import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-erproduct-category',
  templateUrl: './custom-erproduct-category.component.html',
  styleUrls: ['./custom-erproduct-category.component.css']
})
export class CustomERProductCategoryComponent implements OnInit {

  @Input('frmTextboxErrorCategoryName') frmTextboxErrorCategoryName : any;

  constructor() { }

  ngOnInit(): void {
  }

  get message(){

    for(let err in this.frmTextboxErrorCategoryName.errors)
    {
      return this.getErrorMessage(err , this.frmTextboxErrorCategoryName.errors[err]);
    }
    return null;
  }

  getErrorMessage(err :any, value : any)//error : tên lỗi , value : giá trị ứng với lỗi đó
  {
    let message : any ={
      'required' : 'Không được bỏ trống',
      'minlength' : `Vui Lòng Nhập Lớn Hơn : ${value.requiredLength}` + " kí Tự ",
      'maxlength' : `Vui lòng không nhập quá  : ${value.requiredLength}` + " kí Tự",
      'pattern' : 'Không hợp lệ rồi hihi',
    }
    return message[err];
  }

}
