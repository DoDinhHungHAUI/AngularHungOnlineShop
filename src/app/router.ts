import { ForbiddenComponent } from './Component/forbidden/forbidden.component';
import { AuthGuard } from './Auth/auth.guard';
import { ReportOrderUserComponent } from './Component/admin/report-order-user/report-order-user.component';
import { ImportProductExcelComponent } from './Component/admin/import-product-excel/import-product-excel.component';
import { RevenueChartComponent } from './Component/admin/revenue-chart/revenue-chart.component';
import { AppGroupComponent } from './Component/app-group/app-group.component';
import { AppRoleComponent } from './Component/app-role/app-role.component';
import { AppUserComponent } from './Component/app-user/app-user.component';
import { HomeComponent } from './Component/home/home.component';
import { SignInComponent } from './Component/Account/sign-in/sign-in.component';
import { SingUpComponent } from './Component/Account/sing-up/sing-up.component';
import { UserComponent } from './Component/Account/user/user.component';
import { Routes } from "@angular/router";
import { AdminComponent } from "./Component/admin/admin.component";
import { ProductCategoryComponent } from "./Component/admin/product-category/product-category.component";
import { ProductComponent } from "./Component/admin/product/product.component";

export const appRoutes: Routes = [

  //{path : '' , redirectTo : 'AdminComponent' , pathMatch : 'full'},
  {path : 'AdminComponent' , component : AdminComponent,
    children :[
                {path : 'danhMucSanPham' , component : ProductCategoryComponent},
                {path : 'danhSachSanPham' , component : ProductComponent},
                {path : 'nguoidung' , component : AppUserComponent},
                {path : 'quyen' , component : AppRoleComponent},
                {path : 'nhomNguoiDung' , component : AppGroupComponent},
                {path : 'Thongkedoanhthu' , component : RevenueChartComponent},
                {path : 'NhapSPTuExcel' , component : ImportProductExcelComponent},
                {path : 'QuanLyDonHang' , component : ReportOrderUserComponent}
              ]
  },
  {path : 'danhMucSanPham' , component : ProductCategoryComponent},
      {path : 'danhSachSanPham' , component : ProductComponent},
      {path : 'nguoidung' , component : AppUserComponent},
      {path : 'quyen' , component : AppRoleComponent},
      {path : 'nhomNguoiDung' , component : AppGroupComponent},
      {path : 'Thongkedoanhthu' , component : RevenueChartComponent},
      {path : 'NhapSPTuExcel' , component : ImportProductExcelComponent},
      {path : 'QuanLyDonHang' , component : ReportOrderUserComponent},
  {
    path : 'forbidden', component : ForbiddenComponent
  },
  {path : 'danhMucSanPham' , component : ProductCategoryComponent},
  {path : 'danhSachSanPham' , component : ProductComponent},
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SingUpComponent }]
  },
  {
      path: 'login', component: UserComponent,
      children: [{ path: '', component: SignInComponent }]
  },
  {path : 'home' , component : HomeComponent},
  { path : '', redirectTo:'/login', pathMatch : 'full'}

];
