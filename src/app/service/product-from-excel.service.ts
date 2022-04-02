import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductFromExcelService {


  readonly baseUrlProduct = 'https://localhost:44323/api/product';

  constructor(private http : HttpClient) { }

  importProductExcel(fileToUpload: File , categoryId : any) : Observable<any>
  {
    const formData: FormData = new FormData();
    formData.append("categoryId" , categoryId);
    formData.append("fileExcel" , fileToUpload);

    return this.http.post<any>(this.baseUrlProduct + "/import" , formData);
  }

  getBaseUrl():Observable<any>
  {
    return this.http.get<any>(this.baseUrlProduct + '/getBaseUrl');
  }



}
