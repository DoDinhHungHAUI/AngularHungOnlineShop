import { RoleService } from './../../../service/role.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.css']
})
export class AddEditRoleComponent implements OnInit {


  isClickedAddOrEdit : boolean = false;

  //Thuộc tính

  classError : string  = "classError";

  Name : any = "";
  Description : any = "";
  Id : number = 0;
   //Close button
   @Input('closeButton') closebuttonToAddorEdit : any;
   @Input('roleModel') roleModel : any;

  constructor(private roleService : RoleService , private toastr: ToastrService , private _formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.loadRoleModel();
    this.createForm();
  }

  // frmRole = this._formBuilder.group({

  //   NameRole : ['' , Validators.required],

  //   DescriptionRole : ['' , Validators.required],
  // })

  public frmRole : FormGroup = new FormGroup({

    NameRole : new FormControl(''),
    DescriptionRole : new FormControl(''),
  });

  createForm()
  {
    this.frmRole = this._formBuilder.group({

      NameRole : ['' , [
        Validators.required,
      ]],

      DescriptionRole : ['' , [
        Validators.required
      ]],
    })

  }

  loadRoleModel()
  {
    this.Id = this.roleModel.Id;
    this.Name = this.roleModel.Name;
    this.Description = this.roleModel.Description;
  }

  AddRoleClick()
  {

    this.isClickedAddOrEdit = true;
    var val =
    {
      Name : this.Name,
      Description : this.Description
    };


    if (this.frmRole.invalid) {

      return;
    }

    this.roleService.addRole(val).subscribe(
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

  updateRole()
  {
    this.isClickedAddOrEdit = true;
    var val = {
      Id : this.roleModel.Id,
      Name : this.Name,
      Description : this.Description
    }

    if (this.frmRole.invalid) {

      return;
    }

    this.roleService.updateRole(val).subscribe(
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
