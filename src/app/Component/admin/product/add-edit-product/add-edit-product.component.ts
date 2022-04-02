import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ProductCategoryService } from 'src/app/service/productCategory.service';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  //isClickedAddOrEdit
  isClickedAddOrEdit : boolean = false;

  @Input('productModel') productModel : any;
  @Input('urlImageedit') urlImageedit : any;
  @Input('urlMultipleImageEdit') urlMultipleImageEdit : any;

  //File to Upload
  fileToUpload: any;

  //show productCategory
  nameAndIdProductCategory : any[] = [];

  productList : any = [];

  ischecked :number= 0;

  //isSelected

  isSelected : number = -1;

  //upload multi images
  myFiles: string[] = [];
  ImageMulti : any = [];
  fileToUploadMulti : any;
  i : number = 0;
  displayMutileImage : any[] = [];

  //Close button
  @Input('closeButton') closebuttonToAddorEdit : any;

  //Choose file
  @ViewChild('actionfile') onLinktoFile : any;

  ID : number = 0;
  Name : string =  "";
  Alias :  string =  "";
  CategoryID : any = null;
  Image : any = null;
  MoreImages : any = null;
  Price : any = null;
  PromotionPrice : any = null;
  Warranty : any = null;
  Description : string = "";
  Content : string = "";
  HomeFlag : any = null;
  HotFlag : any = null;
  ViewCount : any = null;
  CreatedDate : any = null;
  CreatedBy: any = null;
  UpdatedDate: any = null;
  UpdatedBy:any = null;
  MetaKeyword: any = null;
  MetaDescription: any = null;
  Status : boolean = false;
  OriginalPrice : any = null;
  Tags : any = null;
  Quantity : any = null;
  Color : any = null;
  Model :any =  null;
  whereProduct :any =  null;

  constructor(private _formBuilder : FormBuilder , private productService : ProductService , private productCategoryService : ProductCategoryService , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showNameAndIdProductCategory();
    this.loadProductModel();
    this.loadUrlImageServer();
    this.createForm();
  }

  loadUrlImageServer()
  {
    this.ImageMulti = [];
    this.productService.getImage().subscribe(data => {
      for(let i = 0 ; i < this.displayMutileImage.length ; i++)
      {
        this.ImageMulti.push(data + this.displayMutileImage[i]);
      }
    })
  }

  loadProductModel()
  {
    // this.productService.getAll().subscribe(data => {

    //   this.productList = data;



    //   console.log(this.productModel);

    // })

    this.ID = this.productModel.ID;
    this.Name = this.productModel.Name;
    this.Alias =  this.productModel.Alias;
    this.CategoryID = this.productModel.CategoryID;
    this.Image = this.productModel.Image;
    this.MoreImages = this.productModel.MoreImages;
    this.Price = this.productModel.Price;
    this.PromotionPrice = this.productModel.PromotionPrice;
    this.Warranty = this.productModel.Warranty;
    this.Description = this.productModel.Description;
    this.Content = this.productModel.Content;
    this.HomeFlag = this.productModel.HomeFlag;
    this.HotFlag = this.productModel.HotFlag;
    this.ViewCount = this.productModel.ViewCount;
    this.CreatedDate = this.productModel.CreatedDate;
    this.CreatedBy= this.productModel.CreatedBy;
    this.UpdatedDate= this.productModel.UpdatedDate;
    this.UpdatedBy=this.productModel.UpdatedBy;
    this.MetaKeyword= this.productModel.MetaKeyword;
    this.MetaDescription= this.productModel.MetaDescription;
    this.Status = this.productModel.Status;
    this.Tags = this.productModel.Tags;
    this.OriginalPrice = this.productModel.OriginalPrice;
    this.Quantity = this.productModel.Quantity;
    this.Color = this.productModel.Color;
    this.Model = this.productModel.Model;
    this.whereProduct = this.productModel.whereProduct;

    if(this.Status)
    {
      this.ischecked = 1;
    }else{
      this.ischecked = 0;
    }

    // for(let dmuc of this.nameAndIdProductCategory)
    // {
    //   if(dmuc.ID == this.productModel.CategoryID)
    //   {
    //     this.isSelected = dmuc.ID;
    //     console.log(this.isSelected);
    //     break;
    //   }
    // }

    if(this.urlImageedit)
    {
      this.Image = this.urlImageedit;
    }

    if(this.urlMultipleImageEdit)
    {
      this.MoreImages = this.urlMultipleImageEdit;
      var d = 0;
      for(let i = 0 ; i < this.MoreImages.length ; i++)
      {
        if(this.MoreImages[i] == "|")
        {
          var arrayImages = this.MoreImages.slice(d , i);
          d = i + 1;
          this.displayMutileImage.push(arrayImages);
        }
      }
    }

    console.log(this.displayMutileImage);
  }

  showNameAndIdProductCategory()
  {
    this.productCategoryService.getAll().subscribe(
      data => {
        this.nameAndIdProductCategory = data;
        for(let dmuc of this.nameAndIdProductCategory)
        {
          if(dmuc.ID == this.productModel.CategoryID)
          {
            this.isSelected = dmuc.ID;
            console.log(this.isSelected);
            break;
          }
        }
        console.log(this.nameAndIdProductCategory);
      },
      error => {

      }
    )
  }

  AddProductClick()
  {
    this.isClickedAddOrEdit = true;
    var val =
    {
      Name : this.Name,
      Alias : this.Alias,
      CategoryID : this.CategoryID,
      Image : null,
      MoreImages : this.MoreImages,
      Price : this.Price,
      PromotionPrice : this.PromotionPrice,
      Warranty : this.Warranty,
      Description : this.Description,
      Content : this.Content,
      HomeFlag : this.HomeFlag,
      HotFlag : this.HotFlag,
      ViewCount : this.ViewCount,
      CreatedDate : this.CreatedDate,
      CreatedBy: this.CreatedBy,
      UpdatedDate: this.UpdatedDate,
      UpdatedBy:this.UpdatedBy,
      MetaKeyword: this.MetaKeyword,
      MetaDescription: this.MetaDescription,
      Status : this.Status,
      Tags : this.Tags,
      OriginalPrice : this.OriginalPrice,
      Quantity : this.Quantity,
      Color : this.Color,
      Model : this.Model,
      whereProduct : this.whereProduct
    };

    if (this.frmProduct.invalid) {
      return;
    }

    this.productService.addProductCategory(val , this.fileToUpload , this.myFiles).subscribe(
      data => {
        console.log(data);
        this.showAddSuccess();
        this.closebuttonToAddorEdit.nativeElement.click();
      },
      error => {
        console.log(error);
        this.showAddError();
      }
    )
    console.log(val);
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

  handleFileInput(file : any)
  {
    this.fileToUpload = file.target.files.item(0);
    //Show image preview
    console.log(file.target.files.item(0));
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.Image = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  onCheckboxChange(event : any)
  {
    this.Status = !this.Status;
  }

  onChangeCKEditor( event: CKEditor4.EventInfo ) {
    console.log( event.editor.getData() );
    this.Content = event.editor.getData();
  }

  cancelPopup()
  {
    this.closebuttonToAddorEdit.nativeElement.click();
  }

  //Sửa sản phẩm
  updateProduct()
  {
    var val =
    {
      ID : this.productModel.ID,
      Name : this.Name,
      Alias : this.Alias,
      CategoryID : this.CategoryID,
      Image : this.Image,
      MoreImages : this.MoreImages,
      Price : this.Price,
      PromotionPrice : this.PromotionPrice,
      Warranty : this.Warranty,
      Description : this.Description,
      Content : this.Content,
      HomeFlag : this.HomeFlag,
      HotFlag : this.HotFlag,
      ViewCount : this.ViewCount,
      CreatedDate : this.CreatedDate,
      CreatedBy: this.CreatedBy,
      UpdatedDate: this.UpdatedDate,
      UpdatedBy:this.UpdatedBy,
      MetaKeyword: this.MetaKeyword,
      MetaDescription: this.MetaDescription,
      Status : this.Status,
      Tags : this.Tags,
      OriginalPrice : this.OriginalPrice,
      Quantity : this.Quantity,
      Color : this.Color,
      Model : this.Model,
      whereProduct : this.whereProduct
    };

    console.log(val);

    this.productService.updateProduct(val , this.fileToUpload , this.myFiles).subscribe(
    response => {
      this.showUpdateSuccess();
      this.closebuttonToAddorEdit.nativeElement.click();
    },
    error =>{
      console.log(error);
      this.showErrorUpdate();
    });
  }

  showUpdateSuccess() {
    this.toastr.success('Sửa Thành Công', 'Thông báo', {
      timeOut: 2000,
    });
  }

  showErrorUpdate()
  {
    this.toastr.error('Có Lỗi Trong quá trình xử lý', 'Thông Báo', {
      timeOut: 2000,
    });
  }

  getFileDetails(e : any)
  {
      this.fileToUploadMulti = e.target.files.item(0);
      //Show image preview

      //console.log (e.target.files);
      for (var i = 0; i < e.target.files.length; i++) {
        this.myFiles.push(e.target.files[i]);
      }
      console.log(this.myFiles);

      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.ImageMulti[this.i] = event.target.result;
        this.i = this.i + 1;
      }
      reader.readAsDataURL(this.fileToUploadMulti);
  }


  //Tạo form

  public frmProduct : FormGroup = new FormGroup({

    nameProduct : new FormControl(''),
    AliasProduct : new FormControl(''),
    CategoryIDProduct : new FormControl(''),
    OriginalPriceProduct : new FormControl(''),
    QuantityProduct : new FormControl(''),
    PriceProduct : new FormControl(''),
    ColorProduct : new FormControl(''),
    ModelProduct : new FormControl(''),
    whereProductProduct : new FormControl(''),
  });

  createForm()
  {
    this.frmProduct = this._formBuilder.group({

      nameProduct : ['' , Validators.required],

      // tieudeSeo : ['' , [
      //   Validators.required
      // ]],

      // Name : ['' , [
      //   Validators.required,
      // ]],
      AliasProduct : ['',Validators.required],
      CategoryIDProduct : ['',Validators.required],
      OriginalPriceProduct :['',Validators.required],
      QuantityProduct :['',Validators.required],
      PriceProduct : ['',Validators.required],
      ColorProduct : ['',Validators.required],
      ModelProduct : ['',Validators.required],
      whereProductProduct : ['',Validators.required],

    })

  }













}
