import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticRevenueService {

  readonly baseUrlUser = 'https://localhost:44323/api/statistic'

  constructor(private http : HttpClient) { }

  getAll(fromDate : string , toDate : string):Observable<any>{

    let params = new HttpParams()
                .set('fromDate', fromDate)
                .set('toDate', toDate);

    return this.http.get<any>(this.baseUrlUser + '/getrevenue' , {params})
  }

}
