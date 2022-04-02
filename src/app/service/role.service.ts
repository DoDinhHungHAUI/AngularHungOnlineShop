import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  readonly baseUrlRole = 'https://localhost:44323/api/applicationRole'

  constructor(private http : HttpClient) { }

  getAll():Observable<any>{
    return this.http.get<any>(this.baseUrlRole + '/getList')
  }

  addRole(val : any):Observable<any>{
    return this.http.post<any>(this.baseUrlRole + '/add' , val);
  }

  deleteRole(id : any):Observable<any>
  {
    return this.http.delete<any>(this.baseUrlRole + '/delete/' + `${id}`);
  }

  updateRole(val : any):Observable<any>
  {
    return this.http.put<any>(this.baseUrlRole + '/update' , val);
  }

}
