import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http : HttpClient) { }

  readonly baseUrlUser = 'https://localhost:44323/api/applicationGroup'


  getAll():Observable<any>{
    return this.http.get<any>(this.baseUrlUser + '/getlist')
  }

  addGroup(val : any):Observable<any>{
    return this.http.post<any>(this.baseUrlUser + '/add' , val);
  }

  updateGroup(val : any):Observable<any>
  {
    return this.http.put<any>(this.baseUrlUser + '/update' , val);
  }

  deleteGroup(id : any):Observable<any>
  {
    return this.http.delete<any>(this.baseUrlUser + '/delete/' + `${id}`);
  }

  getRoles(groupId : any):Observable<any>
  {
    return this.http.get<any>(this.baseUrlUser + '/getRoles/' + `${groupId}`)
  }

}
