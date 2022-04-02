import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { AccountService } from 'src/app/service/account.service';
import { NgForm, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./../user/user.component.css']
})
export class SingUpComponent implements OnInit {

  user : User = new User();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private accountService : AccountService , private fb : FormBuilder , private toastr: ToastrService , private router : Router) { }

  ngOnInit(): void {
  }

  // resetForm(form? : NgForm){
  //   if(form != null)
  //   {
  //     form.reset();
  //   }
  //   this.user = {
  //     UserName : '',
  //     Password : '',
  //     Email : '',
  //   }
  // }

  profileUser = this.fb.group({
    userName : ['' , Validators.required],
    passWord : ['' , Validators.required],
    email : ['' , [Validators.required, Validators.pattern(this.emailPattern)]],
    passwordAgain : ['' , Validators.required]
  },
  );

  onSubmitSignUp()
  {
    var formValue = this.profileUser;
    // console.log(this.profileUser.value);
    // console.log(formValue.value);
    this.accountService.registerUser(formValue.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.profileUser.reset();
          this.showRegisterSuccess();
          this.router.navigate(['/login'])
        }
        else
          this.showRegisterError();
        });
  }

  showRegisterSuccess() {
    this.toastr.success('Đăng ký thành công', 'Thông báo', {
      timeOut: 2000,
    });
  }
  showRegisterError() {
    this.toastr.error('Có lỗi trong quá trình xử lý', 'Thông báo', {
      timeOut: 2000,
    });
  }

}
