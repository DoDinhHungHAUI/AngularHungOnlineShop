import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportOrderUserService {

  readonly baseUrlReportOrderUser = 'https://localhost:44323/api/ReportUserOrder';

  constructor(private http : HttpClient) { }

  GetUserOrder():Observable<any>{
    return this.http.get<any>(this.baseUrlReportOrderUser + '/getUserOrder')
  }

  GetReportUserOrder(userId : any):Observable<any>{
    return this.http.get<any>(this.baseUrlReportOrderUser + '/getReportOrder/' + `${userId}`);
  }
}
