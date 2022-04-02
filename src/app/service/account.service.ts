import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders  } from '@angular/common/http';
import { User } from 'src/app/Models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }

  readonly rootUrl = 'https://localhost:44323';

  registerUser(user : any) : Observable<any>{

    const body: User = {
      UserName: user.userName,
      Password: user.passWord,
      Email: user.email,    }
    return this.http.post(this.rootUrl + '/api/account/Register', body);
  }

  userAuthentication(userName : any, password : any) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });;
  }

  getUserRole(username : any , password : any)
  {
    return this.http.get<any>(this.rootUrl + '/api/applicationUser/getUserRole/' + `${username}` + '/' +  `${password}`);
  }

}
