import { ProductCategory } from './../../../../Models/product-category';
import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { FormBuilder , FormControl, FormGroup , Validators } from '@angular/forms';

import { ProductCategoryService } from 'src/app/service/productCategory.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product-category',
  templateUrl: './add-edit-product-category.component.html',
  styleUrls: ['./add-edit-product-category.component.css']
})
export class AddEditProductCategoryComponent implements OnInit {

  constructor(private productCategoryService : ProductCategoryService ,private _formBuilder : FormBuilder , private toastr: ToastrService) { }

  @Input('productCategoryModel') productCategoryModel : any;

  @Input('closeButton') closebuttonToAddorEdit : any;

  // @Output('ProductCategoryList')

  // onHandleProductCategoryList = new EventEmitter<any>();

  //IsChecked

  ischecked :number= 0;

  //check checked checkbox

  checkedCheckbox : boolean = true;

  //isSelected

  isSelected : number = -1;
  //Khởi tạo Danh Sách ProductCategory

  //isClickedAddOrEdit

  isClickedAddOrEdit : boolean = false;

  productCategoryList : any = [];

  ID : number = 0;
  Name : string =  "";
  Alias :  string =  "";
  Description : string = "";
  ParentID : any = null;
  DisplayOrder :any = null;
  Image : any =null;
  HomeFlag : any = null;
  Products : any =  [];
  CreatedDate : any =null;
  CreatedBy: any =null;
  UpdatedDate: any =null;
  UpdatedBy:any = null;
  MetaKeyword: any =null;
  MetaDescription: any =null;
  Status : boolean = false;

  ngOnInit(): void {
    this.loadProductCategoryModel();
    this.createForm();
  }

  loadProductCategoryModel()
  {
    this.productCategoryService.getAll().subscribe(data => {

      this.productCategoryList = data;

      this.ID = this.productCategoryModel.ID;

      this.Name = this.productCategoryModel.Name;
      this.Alias = this.productCategoryModel.Alias;
      this.Description = this.productCategoryModel.Description;

      this.ParentID = this.productCategoryModel.ParentID;

      this.DisplayOrder = this.productCategoryModel.DisplayOrder;
      this.Image = this.productCategoryModel.Image;
      this.HomeFlag = this.productCategoryModel.HomeFlag;
      this.Products = this.productCategoryModel.Products;
      this.CreatedDate = this.productCategoryModel.CreatedDate;
      this.CreatedBy = this.productCategoryModel.CreatedBy;
      this.UpdatedDate = this.productCategoryModel.UpdatedDate;
      this.UpdatedBy = this.productCategoryModel.UpdatedBy;
      this.MetaKeyword = this.productCategoryModel.MetaKeyword;
      this.MetaDescription = this.productCategoryModel.MetaDescription;

      this.Status = this.productCategoryModel.Status;
      if(this.Status)
      {
        this.ischecked = 1;
      }else{
        this.ischecked = 0;
      }

      for(let dmucCha of this.productCategoryList)
      {
        if(dmucCha.ID == this.productCategoryModel.ID)
        {
          this.isSelected = dmucCha.id;
          break;
        }
      }

    })
  }

  updateProductCategory()
  {
    var val =
    {
      ID : this.productCategoryModel.ID,
      Name :this.Name,
      Alias :  this.Alias,
      Description : this.Description,
      ParentID : this.ParentID,
      DisplayOrder :this.DisplayOrder,
      Image : this.Image,
      HomeFlag : this.HomeFlag,
      Products : this.Products,
      CreatedDate : this.CreatedDate,
      CreatedBy: this.CreatedBy,
      UpdatedDate:this.UpdatedDate,
      UpdatedBy: this.UpdatedBy,
      MetaKeyword: this.MetaKeyword,
      MetaDescription: this.MetaDescription,
      Status : this.Status

    };

    this.productCategoryService.updateProductCategory(val).subscribe(
    response => {
      this.showUpdateSuccess();
      this.closebuttonToAddorEdit.nativeElement.click();
    },
    error =>{
      console.log(error);
      this.showErrorUpdate();
    });


    // this.productCategoryService.getAll().subscribe((data:any)=>{
    //   this.productCategoryList=data;
    // });

    //this.onHandleProductCategoryList.emit(this.productCategoryList);

  }

  addProductCategory()
  {
    this.isClickedAddOrEdit = true;
     var val =
        {
          ID : this.productCategoryList.length + 1,
          Name :this.Name,
          Alias :  this.Alias,
          Description : this.Description,
          ParentID : this.ParentID,
          DisplayOrder :this.DisplayOrder,
          Image : this.Image,
          HomeFlag : this.HomeFlag,
          Products : this.Products,
          CreatedDate : null,
          CreatedBy: this.CreatedBy,
          UpdatedDate:this.UpdatedDate,
          UpdatedBy: this.UpdatedBy,
          MetaKeyword: this.MetaKeyword,
          MetaDescription: this.MetaDescription,
          Status : this.Status

          // ID: 8,
          // Name: "Quần Áo",
          // Alias: "Quần áo 1",
          // Description: "Mô tả 1",
          // ParentID: null,
          // DisplayOrder: null,
          // Image: null,
          // HomeFlag: null,
          // Products: [],
          // CreatedDate: null,
          // CreatedBy: null,
          // UpdatedDate: null,
          // UpdatedBy: null,
          // MetaKeyword: null,
          // MetaDescription: null,
          // Status: true

        };

        console.log(val);

        if (this.frmProductCategy.invalid) {
          return;
        }
        this.productCategoryService.addProductCategory(val).subscribe(
        response => {
          this.showAddSuccess();
          console.log(response);
          this.closebuttonToAddorEdit.nativeElement.click();
        },
        error => {
          console.log(error);
          this.showAddError();
        });


        // this.productCategoryService.getAll().subscribe(data => {
        //   this.productCategoryList = data;
        // })

        // console.log(this.productCategoryList);

        // this.onHandleProductCategoryList.emit(this.productCategoryList);
  }

  loadDanhMucCha()
  {

  }

  showAddSuccess() {
    this.toastr.success('Thông Báo', 'Thêm Thành Công', {
      timeOut: 2000,
    });
  }
  showAddError()
  {
    this.toastr.error('Có Lỗi Trong quá trình xử lý', 'Thông Báo', {
      timeOut: 2000,
    });
  }

  showUpdateSuccess() {
    this.toastr.success('Cập nhật thành công', 'Thông Báo', {
      timeOut: 2000,
    });
  }

  showErrorUpdate() {
    this.toastr.success('Có Lỗi Trong quá trình Xử lý', 'Thông báo', {
      timeOut: 2000,
    });
  }

  onCheckboxChange(event : any)
  {

    this.Status = !this.Status;
  }

  selectOption(event : any)
  {
    console.log(event.target.value);
  }

  cancelPopup()
  {
    this.closebuttonToAddorEdit.nativeElement.click();
  }
  //validation form angular

  public frmProductCategy : FormGroup = new FormGroup({

    nameProductCategory : new FormControl(''),
    tieudeSeo : new FormControl(''),
    //motaNgan : new FormControl(''),
    //MetaDescriptions : new FormControl(''),
    //status : new FormControl(''),

  });

  createForm()
  {
    this.frmProductCategy = this._formBuilder.group({

      nameProductCategory : ['' , [
        Validators.required,
        // Validators.minLength(5),
        Validators.maxLength(100)
      ]],

      tieudeSeo : ['' , [
        Validators.required
      ]],

      // motaNgan : ['' , [
      //   Validators.required
      // ]],

      // MetaDescriptions : ['' , [
      //   Validators.required
      // ]],
      // status : ["" , [
      //   Validators.required
      // ]]

    })
  }
}
