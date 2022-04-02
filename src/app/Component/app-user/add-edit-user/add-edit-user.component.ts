import { UserService } from './../../../service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from 'src/app/service/group.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  isClickedAddOrEdit : boolean = false;

  listGroupUser : any[] = [];

  listGroupCheckedToView : any[] = [];

  @Input('UserModel') UserModel : any;
  @Input('closeButton') closebuttonToAddorEdit : any;
  @Input('listGroupChecked') listGroupChecked : any;

  //Khởi tạo thuộc tính
  Id : number = 0;
  FullName : any = "";
  UserName :any = "";
  Password : any = "";
  BirthDay :any = "";
  Email : any = "";
  PhoneNumber : any = "";

  constructor(private userService: UserService , private toastr: ToastrService , private groupService : GroupService , private _formBuilder : FormBuilder) { }

  ngOnInit(): void {
    console.log(this.listGroupChecked);
    this.loadUsertModel();
    this.createForm();
    this.LoadlistGroupUser();
  }

  public frmGroup : FormGroup = new FormGroup({

  });

  createForm()
  {
    this.frmGroup = this._formBuilder.group({
      checkArray: this._formBuilder.array([])
    })
  }

  checkGroupIsChecked : any[] = [];//Biến lưu trữ Id của các select được check
  onCheckboxChange(e : any) {
    const checkArray: FormArray = this.frmGroup.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      var item = this.listGroupCheckedToView.find((a : any) => a.ID == (e.target.value));
      let val = {
        ID : item.ID,
        Name : item.Name
      }
      this.checkGroupIsChecked.push(val)
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item : any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          var indexDel = this.checkGroupIsChecked.indexOf((a : any) => a.ID == (e.target.value));
          this.checkGroupIsChecked.splice( indexDel, 1);
          return;
        }
        i++;
      });
    }
    console.log(this.checkGroupIsChecked);
  }

  LoadlistGroupUser()
  {
    this.groupService.getAll().subscribe(data => {
      this.listGroupUser = data;
      console.log(this.listGroupChecked);
      //Xử lý
      for(let i = 0 ; i < this.listGroupUser.length ; i++)
      {
        let d = 0;
        for(let j = 0;j<this.listGroupChecked.length;j++)
        {
          if(this.listGroupUser[i].ID == this.listGroupChecked[j].ID)
          {
            var val = {
              ID : this.listGroupUser[i].ID,
              Name : this.listGroupUser[i].Name,
              checked : 1
            }
            d = 1;
            this.listGroupCheckedToView.push(val);
            break;
          }
        }
        if(d == 0)
        {
          var val = {
            ID : this.listGroupUser[i].ID,
            Name : this.listGroupUser[i].Name,
            checked : 0
          }
          this.listGroupCheckedToView.push(val);
        }
      }
      console.log(this.listGroupCheckedToView);

      this.listGroupCheckedToView.forEach((element : any) => {
          if(element.checked == 1)
          {
            var val = {
              ID  : element.ID,
              Name : element.Name
            }
            this.checkGroupIsChecked.push(val);
          }
      });

    },error => {
      console.log(error);
      this.toastr.error('có lỗi trong quá trình xử lý' , 'Thông báo' , {
        timeOut : 2000
      })
    })
  }



  loadUsertModel()
  {
    this.Id = this.UserModel.Id,
    this.FullName = this.UserModel.FullName,
    this.UserName =  this.UserModel.UserName,
    this.Password = this.UserModel.Password,
    this.BirthDay = this.UserModel.BirthDay,
    this.Email = this.UserModel.Email,
    this.PhoneNumber = this.UserModel.PhoneNumber
  }

  addUser()
  {
    this.isClickedAddOrEdit = true;
     var val =
      {
        ID :0,
        FullName :this.FullName,
        UserName :this.UserName,
        Password : this.Password,
        BirthDay : this.BirthDay,
        Email : this.Email,
        PhoneNumber :this.PhoneNumber,
        Groups : this.checkGroupIsChecked
      };
      console.log(val);
      this.userService.addUser(val).subscribe(
        response => {
          this.showAddSuccess();
          console.log(response);
          this.closebuttonToAddorEdit.nativeElement.click();
        },
        error => {
          console.log(error);
          this.showAddError();
        }
      );
  }

  showAddSuccess()
  {
    this.toastr.success('Thêm thành công' , 'Thông báo' , {
      timeOut : 2000,
    })
  }

  showAddError()
  {
    this.toastr.error('Có lỗi trong quá trình xử lý' , 'Thông báo' , {
      timeOut : 2000,
    })
  }

  updateUser()
  {
    var val =
    {
      Id: this.UserModel.Id,
      FullName :this.FullName,
      UserName :this.UserName,
      Password : this.Password,
      BirthDay : this.BirthDay,
      Email : this.Email,
      PhoneNumber :this.PhoneNumber,
      Groups : this.checkGroupIsChecked
    };

    this.userService.updateUser(val).subscribe(
    response => {
      this.showUpdateSuccess();
      this.closebuttonToAddorEdit.nativeElement.click();
    },
    error =>{
      console.log(error);
      this.showErrorUpdate();
    });
  }

  showUpdateSuccess()
  {
    this.toastr.success('Cập nhật người dùng thành công' , 'Thông báo' , {
      timeOut : 2000
    })
  }

  showErrorUpdate()
  {
    this.toastr.error('Có lỗi trong quá trình xử lý' , 'Thông báo' , {
      timeOut : 2000
    })
  }

  cancelPopup()
  {
    this.closebuttonToAddorEdit.nativeElement.click();
  }

}
