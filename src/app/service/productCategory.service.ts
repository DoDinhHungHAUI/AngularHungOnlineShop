import { Injectable  } from '@angular/core';
import { HttpClient, HttpHeaders  ,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class ProductCategoryService  {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),
  };


  readonly baseUrlProductCategory = 'https://localhost:44323/api/productcategory';



  constructor(private http : HttpClient) {

   }

  getAll():Observable<any>{
    return this.http.get<any>(this.baseUrlProductCategory + '/getall')
  }


  updateProductCategory(val : any):Observable<any>
  {
    // const headers = { 'content-type': 'application/json'}
    // const body=JSON.stringify(val);

    // console.log(body);

    return this.http.put<any>(this.baseUrlProductCategory + '/update' , val);
  }

  addProductCategory(val : any):Observable<any>
  {
    // const headers = { 'content-type': 'application/json'}
    // const body=JSON.stringify(val);

    // console.log(body);

    return this.http.post<any>(this.baseUrlProductCategory + '/create' , val);
  }


  deleteProductCategory(id : any):Observable<any>
  {
    // const headers = { 'content-type': 'application/json'}
    // const body=JSON.stringify(val);

    // console.log(body);

    return this.http.delete<any>(this.baseUrlProductCategory + '/delete/' + `${id}`);
  }

}
