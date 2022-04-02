import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './Component/admin/admin.component';
import { ProductCategoryComponent } from './Component/admin/product-category/product-category.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryService } from './service/productCategory.service';
import { AddEditProductCategoryComponent } from './Component/admin/product-category/add-edit-product-category/add-edit-product-category.component';

import { CKEditorModule } from 'ckeditor4-angular';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { NgxPaginationModule } from 'ngx-pagination';
import { CustomERProductCategoryComponent } from './Component/customError/custom-erproduct-category/custom-erproduct-category.component';
import { ProductComponent } from './Component/admin/product/product.component';
import { AddEditProductComponent } from './Component/admin/product/add-edit-product/add-edit-product.component';
import { SignInComponent } from './Component/Account/sign-in/sign-in.component';
import { SingUpComponent } from './Component/Account/sing-up/sing-up.component';
import { UserComponent } from './Component/Account/user/user.component';
import { HomeComponent } from './Component/home/home.component';
import { CustomErrorComponent } from './Component/customError/custom-error/custom-error.component';
import { AppUserComponent } from './Component/app-user/app-user.component';
import { AddEditUserComponent } from './Component/app-user/add-edit-user/add-edit-user.component';
import { AppRoleComponent } from './Component/app-role/app-role.component';
import { AddEditRoleComponent } from './Component/app-role/add-edit-role/add-edit-role.component';
import { AppGroupComponent } from './Component/app-group/app-group.component';
import { AddEditGroupComponent } from './Component/app-group/add-edit-group/add-edit-group.component';
import { RevenueChartComponent } from './Component/admin/revenue-chart/revenue-chart.component';
import { ImportProductExcelComponent } from './Component/admin/import-product-excel/import-product-excel.component';
import { ReportOrderUserComponent } from './Component/admin/report-order-user/report-order-user.component';
import { TemplateReportComponent } from './Component/admin/report-order-user/template-report/template-report.component';
import { CustomErrorProductComponent } from './Component/customError/custom-error-product/custom-error-product.component';
import { AuthGuard } from './Auth/auth.guard';
import { ForbiddenComponent } from './Component/forbidden/forbidden.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ProductCategoryComponent,
    AddEditProductCategoryComponent,
    CustomERProductCategoryComponent,
    ProductComponent,
    AddEditProductComponent,
    SignInComponent,
    SingUpComponent,
    UserComponent,
    HomeComponent,
    CustomErrorComponent,
    AppUserComponent,
    AddEditUserComponent,
    AppRoleComponent,
    AddEditRoleComponent,
    AppGroupComponent,
    AddEditGroupComponent,
    RevenueChartComponent,
    ImportProductExcelComponent,
    ReportOrderUserComponent,
    TemplateReportComponent,
    CustomErrorProductComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    CKEditorModule,
    ToastrModule.forRoot(),
  ],
  providers: [ProductCategoryService , AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
