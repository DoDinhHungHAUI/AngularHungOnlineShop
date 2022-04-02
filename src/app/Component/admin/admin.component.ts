import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css',
              './../../../assets/libs/fontawesome-free/css/all.min.css' ,
              './../../../assets/Admin/css/adminlte.min.css',

            ],

})
export class AdminComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit(): void {
  }

  logoutClick()
  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRoles')
    this.route.navigate(['/login'])
  }

}
