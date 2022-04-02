import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from 'src/app/service/productCategory.service';
import { ProductFromExcelService } from 'src/app/service/product-from-excel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-product-excel',
  templateUrl: './import-product-excel.component.html',
  styleUrls: ['./import-product-excel.component.css']
})
export class ImportProductExcelComponent implements OnInit {


  nameAndIdProductCategory : any[] = [];

  CategoryID : any;
  urlBaseTemplate : any;

  isCheckedError : boolean = false;

  fileInputLabel: any = null;

  fileUploadForm : FormGroup = new FormGroup({

  });

  constructor(private toastr: ToastrService , private productFromExcelService : ProductFromExcelService ,  private productCategoryService : ProductCategoryService , private FormBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.showNameAndIdProductCategory();
    this.createForm();
    this.urlDowloadTemplate();
  }

  urlDowloadTemplate()
  {
    this.productFromExcelService.getBaseUrl().subscribe(res => {
      this.urlBaseTemplate =  res;
    } , error => {
      this.toastr.error('có lỗi trong quá trình xử lý' , 'Thông báo' , {
        timeOut : 2000
      })
    })
  }

  createForm()
  {
    this.fileUploadForm = this.FormBuilder.group({
      myfile : ['' , Validators.required],
      CategoryID : ['' , Validators.required]

    })
  }

  showNameAndIdProductCategory()
  {
    this.productCategoryService.getAll().subscribe(
      data => {
        this.nameAndIdProductCategory = data;
      },
      error => {

      }
    )
  }

  fileToUpload : any;

  onFileSelect(event : any) {
    console.log(event);
    if (event.target.files.length > 0) {
      this.fileToUpload= event.target.files[0];
      console.log(this.fileToUpload);
      // console.log(file);
      this.fileInputLabel = this.fileToUpload.name;
      // this.fileUploadForm.get('myfile')?.setValue(file);
    }
  }

  addProductFromExcel()
  {
    this.isCheckedError = true;
    var file = this.fileToUpload;

    if(this.fileUploadForm.invalid)
    {
      return;
    }

    console.log(file);
    this.productFromExcelService.importProductExcel(file , this.CategoryID).subscribe(res => {
      this.toastr.success('Thêm sản phẩm thành công' , 'Thông báo' , {
        timeOut : 2000
      })
    },error => {
      this.toastr.error('Có lỗi trong quá trình xử lý' , 'Thông báo', {
        timeOut : 2000
      })
      console.log(error);
    });
  }

  cancelUpload()
  {
    this.fileInputLabel = null;
    this.CategoryID = null;
  }

}
