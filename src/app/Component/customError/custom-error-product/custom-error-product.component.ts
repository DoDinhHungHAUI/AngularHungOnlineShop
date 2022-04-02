import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-error-product',
  templateUrl: './custom-error-product.component.html',
  styleUrls: ['./custom-error-product.component.css']
})
export class CustomErrorProductComponent implements OnInit {

  @Input('control') control : any;
  @Input('namecontrol') controlName : any;

  constructor() { }

  ngOnInit(): void {
  }

  get message(){

    for(let err in this.control.errors)
    {
      return this.getErrorMessage(err , this.control.errors[err]);
    }
    return null;
  }

  getErrorMessage(err : any , value : any)
  {
    let messages : any = {
      'required' : `Vui lòng nhập ${this.controlName}`,
      'minlength' : `Tối thiểu ${value.requiredLength} kí tự`,
      'pattern' : `${this.controlName} không hợp lệ`
    }
    return messages[err];
  }
}
