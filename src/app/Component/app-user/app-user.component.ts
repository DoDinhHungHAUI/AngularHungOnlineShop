import { UserService } from './../../service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {

  //Biến lưu trữ danh sách sản phẩm
  userList : any[] = [];
  //Name Search
  nameSearch :string= "";
  listGroupChecked : any[] = [];
//ProductList to Search
  userListToSearch : any[] = [];

  NameDelete : any = "";
  userToDelete : any = "";

  @ViewChild('closebutton') closeButton : any;

  //userModel
  userModel : any;
  ModelTitle : any = "";

  ActiveAddEditUser : boolean = false;

   //page phân trang
   pageSize : number = 10;
   //Current Page
   p:any;

  constructor(private userService :  UserService , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showListUser();
  }

  showListUser()
  {
    this.userService.getAll().subscribe(
      response => {
        this.userListToSearch = response;
        this.userList = response;
    },
    error => {
      this.toastr.error('Có lỗi trong quá trình xử lý' , 'thông báo' , {
        timeOut : 2000,
      })
      console.log(error);
    })
  }

  addUser()
  {
    this.userModel = {

      Id : 0,
      FullName : "",
      UserName : "",
      Password : "",
      BirthDay : null,
      Email : "",
      PhoneNumber : ""
    }
    this.listGroupChecked = [];
    this.ModelTitle = "Thêm Người Dùng";

    this.ActiveAddEditUser  = true;
  }

  refreshUsertList()
  {
    this.userService.getAll().subscribe(data => {
      this.userList = data;
    })
  }

  closeClick()
  {
    this.refreshUsertList();
    this.ActiveAddEditUser = false;
  }


  editUser(val : any)
  {
    this.userModel = val;

    this.userService.getGroups(val.Id).subscribe(data => {
      this.listGroupChecked = data;

      this.ModelTitle = "Cập nhật người dùng";
      this.ActiveAddEditUser = true;
    },
    error => {
      this.toastr.error('Có lỗi trong quá trình xử lý' , 'Thông báo' , {
        timeOut : 2000
      })
    })
  }

  deleteUser(item : any)
  {
    this.NameDelete = item.FullName;
    this.userToDelete = item;
  }

  confirmDelete()
  {
    this.userService.deleteRole(this.userToDelete.Id).subscribe(
      response => {
        this.toastr.success('Xóa thành công' , 'thông báo' , {
          timeOut : 2000,
        })
        this.refreshUsertList();
      },
      error => {
        console.log(error);
        this.toastr.error('Có lỗi trong quá trình xử lý' , 'thông báo' , {
          timeOut : 2000,
        })
      }
    )
  }
  //Phần Trang
  selectPageSize(event : any)
  {
    this.pageSize = Number(event.target.value);
  }
  //Sắp xếp
  key = 'Name';
  reverse : boolean = false;

  sortName(key : any){

    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.userList.sort((a , b) : number => {
      if(a[key] < b[key]){
        return -1*direction;
      }
      else if(a[key]  >b[key]){
        return 1*direction;
      }
      else{
        return 0;
      }
    });
  }

  removeVietnameseTones(str : any) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
  }


  Search()
  {
    if(this.nameSearch == "")
    {
      this.ngOnInit();
    }else{
      this.userList = this.userListToSearch.filter(res => {
        return this.removeVietnameseTones(res.FullName).toLocaleLowerCase().includes(this.removeVietnameseTones(this.nameSearch).toLocaleLowerCase());
      })
    }
  }

}
