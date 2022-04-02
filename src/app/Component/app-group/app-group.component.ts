import { RoleService } from './../../service/role.service';
import { GroupService } from './../../service/group.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-group',
  templateUrl: './app-group.component.html',
  styleUrls: ['./app-group.component.css']
})
export class AppGroupComponent implements OnInit {



  listGroups : any = [];
  ModelTitle : any = "";
  groupModel : any;

  ActiveAddEditGroup : boolean = false;

  //Close button
  @ViewChild('closebutton') closeButton : any;

  //Name Search

  nameSearch : string = "";
  //PageSize
  pageSize : number = 10;

  //productList To Search
  groupToSearch : any[] = [];
  //Current Page
  p:any;
  listRoleChecked : any[] = [];
  NameDelete : any = "";
  groupToDelete : any;

  constructor(private groupService :  GroupService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showListGroup();
  }

  showListGroup()
  {
    this.groupService.getAll().subscribe(
    response => {
      this.listGroups = response;
      this.groupToSearch = response;
    },
    error => {
      console.log(error);
      this.showError();
    })
  }

  showError()
  {
    this.toastr.error('Có lỗi trong quá trình xử lý' , 'Thông báo' , {
      timeOut : 2000
    })
  }

  addGroup()
  {
    this.ModelTitle = "Thêm mới nhóm người dùng";
    this.groupModel = {

      ID : 0,
      Name :  "",
    }

    this.ActiveAddEditGroup  = true;
  }

  //Close popup

  closeClick()
  {
    this.refreshGroupList();
    this.ActiveAddEditGroup = false;
    console.log("close click to update");
  }

  refreshGroupList()
  {
    this.groupService.getAll().subscribe(data => {
      this.listGroups = data;
    })
  }

  deleteGroup(item : any)
  {
    this.NameDelete = item.Name;
    this.groupToDelete = item;
  }

  confirmDelete()
  {
    this.groupService.deleteGroup(this.groupToDelete.Id).subscribe(
    response => {
      this.showDeleteSuccess();
      this.refreshGroupList();
    },
    error => {
      console.log(error);
      this.errorDelete();
    }
    )
  }

  showDeleteSuccess()
  {
    this.toastr.success('Xóa thành công' , 'Thông báo' , {
      timeOut : 2000
    })
  }

  errorDelete()
  {
    this.toastr.error('Có lỗi trong quá trình xử lý' , 'Thông báo' , {
      timeOut : 2000
    })
  }

  editGroup(val : any)
  {
    this.groupModel = val;
    console.log(this.groupModel);

    this.groupService.getRoles(val.ID).subscribe(data => {
      this.listRoleChecked = data;

      this.ModelTitle = "Cập nhật nhóm người dùng";
      this.ActiveAddEditGroup = true;
    },
    error => {
      this.toastr.error('Có lỗi trong quá trình xử lý' , 'Thông báo' , {
        timeOut : 2000
      })
    })

  }

  //Chuyển có dấu thành không dấu
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


  //Tìm kiếm
  Search()
  {
    if(this.nameSearch == "")
    {
      this.ngOnInit();
    }else{
      this.listGroups = this.groupToSearch.filter(res => {
        return this.removeVietnameseTones(res.Name).toLocaleLowerCase().includes(this.removeVietnameseTones(this.nameSearch).toLocaleLowerCase());
      })
    }
  }

  key = 'Name';
  reverse : boolean = false;

  sortName(key : any){
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.listGroups.sort((a :any, b : any) : number => {
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


  selectPageSize(event : any)
  {
    this.pageSize = Number(event.target.value);
  }


}
