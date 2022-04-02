import { RoleService } from './../../../service/role.service';
import { GroupService } from './../../../service/group.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.css']
})
export class AddEditGroupComponent implements OnInit {

  isClickedAddOrEdit : boolean = false;

  //Thuộc tính

  classError : string  = "classError";

  Name : any = "";
  ID : number = 0;

  roleInGroup : any = [];
  listRoles : any[] = [];
  listRoleCheckedToView : any = [];

  checkRoleIsChecked : any[] = [];//Biến lưu trữ Id của các select được check
  //Close button
  @Input('closeButton') closebuttonToAddorEdit : any;
  @Input('groupModel') GroupModel : any;
  @Input('listRoleChecked') listRoleChecked : any;

  constructor(private roleService :  RoleService , private groupService : GroupService, private toastr: ToastrService , private _formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.loadGroupModel();
    this.createForm();
    this.loadRoleInGroup();
    this.LoadlistRoles();
  }

  loadGroupModel()
  {
    this.ID = this.GroupModel.ID;
    this.Name = this.GroupModel.Name;
  }

  loadRoleInGroup()
  {
    this.roleService.getAll().subscribe(data => {
      this.roleInGroup = data;
    })
  }

  public frmGroup : FormGroup = new FormGroup({

  });

  createForm()
  {
    this.frmGroup = this._formBuilder.group({

      NameGroup : ['' , [
        Validators.required,
      ]],
      checkArray: this._formBuilder.array([])
    })

  }


  onCheckboxChange(e : any) {
    const checkArray: FormArray = this.frmGroup.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      var itemRole = this.listRoleCheckedToView.find((a : any) => a.Id == (e.target.value));

      let val = {
        Id : itemRole.Id,
        Name : itemRole.Name,
        Description : itemRole.Description
      }
      this.checkRoleIsChecked.push(val)
    } else {

      // var indexDel = this.roleInGroup.indexOf((a : any) => a.Id == (e.target.value));
      //     this.checkRoleIsChecked.splice( indexDel, 1);

      var indexDel = this.checkRoleIsChecked.findIndex((a : any) => a.Id == (e.target.value));
      //console.log(indexDel);
      this.checkRoleIsChecked.splice( indexDel, 1);
    }

    console.log(this.checkRoleIsChecked);
  }

  LoadlistRoles()
  {
    this.roleService.getAll().subscribe(data => {
      this.listRoles = data;
      console.log(this.listRoleChecked);
      //Xử lý
      for(let i = 0 ; i < this.listRoles.length ; i++)
      {
        let d = 0;
        for(let j = 0;j<this.listRoleChecked.length;j++)
        {
          if(this.listRoles[i].Id == this.listRoleChecked[j].Id)
          {
            var val = {
              Id : this.listRoles[i].Id,
              Name : this.listRoles[i].Name,
              Description : this.listRoles[i].Description,
              checked : 1
            }
            d = 1;
            this.listRoleCheckedToView.push(val);
            break;
          }
        }
        if(d == 0)
        {
          var val = {
            Id : this.listRoles[i].Id,
            Name : this.listRoles[i].Name,
            Description : this.listRoles[i].Description,
            checked : 0
          }
          this.listRoleCheckedToView.push(val);
        }
      }
      console.log(this.listRoleCheckedToView);

      this.listRoleCheckedToView.forEach((element : any) => {
          if(element.checked == 1)
          {
            var val = {
              Id  : element.Id,
              Name : element.Name,
              Description : element.Description
            }
            this.checkRoleIsChecked.push(val);
          }
      });
    },error => {
      console.log(error);
      this.toastr.error('có lỗi trong quá trình xử lý' , 'Thông báo' , {
        timeOut : 2000
      })
    })
  }



  AddGroupClick()
  {
    this.isClickedAddOrEdit = true;
    var val =
    {
      Name : this.Name,
      Roles : this.checkRoleIsChecked

    };

    if (this.frmGroup.invalid) {

      return;
    }

    this.groupService.addGroup(val).subscribe(
      data => {
        console.log(data);
        this.showAddSuccess();
        this.closebuttonToAddorEdit.nativeElement.click();
      },
      error => {
        console.log(error);
        this.showToastrError();
      }
    )
  }

  showToastrError()
  {
    this.toastr.error('Có lỗi trong quá trình xử lý' , 'Thông báo' , {
      timeOut : 2000
    });
  }

  showAddSuccess()
  {
    this.toastr.success('Thêm quyền thành công' , 'Thông báo' , {
      timeOut : 2000
    });
  }

  cancelPopup()
  {
    this.closebuttonToAddorEdit.nativeElement.click();
  }

  updateGroup()
  {
    this.isClickedAddOrEdit = true;
    var val = {
      ID : this.GroupModel.ID,
      Name : this.Name,
      Roles : this.checkRoleIsChecked
    }

    if (this.frmGroup.invalid) {
      return;
    }

    this.groupService.updateGroup(val).subscribe(
      response => {
        this.showUpdateSuccess();
        this.closebuttonToAddorEdit.nativeElement.click();
      },
      error =>{
        console.log(error);
        this.showToastrError();
    });

  }

  showUpdateSuccess()
  {
    this.toastr.success('Sửa quyền thành công' , 'thông báo' , {
      timeOut : 2000
    })
  }

}
