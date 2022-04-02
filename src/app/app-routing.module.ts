// import { AdminComponent } from './Component/admin/admin.component';
// import { ProductCategoryComponent } from './Component/admin/product-category/product-category.component';
// import { ProductComponent } from './Component/admin/product/product.component';

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { appRoutes } from './router';

// const routes: Routes = [

//   {path : '' , redirectTo : 'AdminComponent' , pathMatch : 'full'},
//   {path : 'AdminComponent' , component : AdminComponent},
//   {path : 'danhMucSanPham' , component : ProductCategoryComponent},
//   {path : 'danhSachSanPham' , component : ProductComponent}

// ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
