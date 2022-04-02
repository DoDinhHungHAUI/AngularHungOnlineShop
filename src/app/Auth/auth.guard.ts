import { UserService } from './../service/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router : Router , private userService : UserService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem('userToken') != null)
    {
      debugger;
      let roles = route.data["roles"] as Array<string>;
      if(roles){
        var match = this.userService.roleMatch(roles);
        if(match){
          return true
        }
        else{
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }
    this.router.navigate(['/login']);
    return false;

  }



}
