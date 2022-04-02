import { ProductCategory } from './../../../Models/product-category';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategoryService } from 'src/app/service/productCategory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-category-component',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})

export class ProductCategoryComponent implements OnInit {

  productCategory : any[] = [];
  constructor(private productCategoryService : ProductCategoryService , private toastr: ToastrService) { }

  //Khai báo 1 productCategory
  productCategoryModel : any;
  ModelTitle : string = "";
  ActiveAddEditProductCategory : boolean = false;

  isChecked : number = 0;


  //Name Search
  nameSearch :string= "";

  //PageSize
  pageSize : number = 10;
  //Current Page
  p:any;

  //productList To Search
  productListToSearch : any[] = [];


  //product to Delete

  productCategoryToDelete : any;

  @ViewChild('closebutton') closeButton : any;


  ngOnInit(): void {
    this.onShowProductCategory();

    //this.refreshProductCategoryList();
  }

  onShowProductCategory()
  {
    this.productCategoryService.getAll().subscribe(data => {
        this.productCategory = data;
        this.productListToSearch = data;
    });
  }

  getNowDate()
  {
    //Ngày tháng năm hiện tại
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var nowDate = dd + '/' + mm + '/' + yyyy;
    return nowDate;
  }

  addClickProductCategory()
  {
    this.productCategoryModel = {
      ID : 0,
      Name : "",
      Alias : "",
      Description : "",
      ParentID :null,
      DisplayOrder : null,
      Image : null,
      HomeFlag : null,
      Products : [],
      CreatedDate : this.getNowDate(),
      CreatedBy: null,
      UpdatedDate: null,
      UpdatedBy: null,
      MetaKeyword: null,
      MetaDescription: null,
      Status : false
    }

    this.ModelTitle = "Thêm Danh Mục Sản Phẩm";
    this.ActiveAddEditProductCategory  = true;

  }

  closeClick()
  {
    this.refreshProductCategoryList();
    this.ActiveAddEditProductCategory=false;
    console.log("close click to update");
    console.log(this.productCategory);
  }

  refreshProductCategoryList(){
    this.productCategoryService.getAll().subscribe(data => {
      this.productCategory = data;
    })
  }

  // onGetProductCategoryList(event : any)
  // {

  //   this.productCategory = event;
  //   this.refreshProductCategoryList();

  // }

  //Tìm kiếm

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


  Search()
  {
    if(this.nameSearch == "")
    {
      this.ngOnInit();
    }else{
      this.productCategory = this.productListToSearch.filter(res => {
        return this.removeVietnameseTones(res.Name).toLocaleLowerCase().includes(this.removeVietnameseTones(this.nameSearch).toLocaleLowerCase());
      })
    }
  }

  //Sắp Xếp ( Sort )

  key = 'Name';
  reverse : boolean = false;

  sortName(key : any){
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.productCategory.sort((a , b) : number => {
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

  //Edit product Category

  editProductCategory(item : any)
  {
    this.productCategoryModel = item;
    this.ModelTitle = "Cập nhật danh mục sản phẩm";
    this.ActiveAddEditProductCategory = true;
  }

  deleteProductCategory(item : any)
  {
    this.productCategoryToDelete = item;
  }

  confirmDelete()
  {
    this.productCategoryService.deleteProductCategory(this.productCategoryToDelete.ID).subscribe(data => {
      this.showDeleteSuccess();
      this.refreshProductCategoryList();
    })
  }

  showDeleteSuccess() {
    this.toastr.success('Xóa thành công', 'Thông báo', {
      timeOut: 2000,
    });
  }

}


