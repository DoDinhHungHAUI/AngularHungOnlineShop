import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-error',
  templateUrl: './custom-error.component.html',
  styleUrls: ['./custom-error.component.css']
})
export class CustomErrorComponent implements OnInit {

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
