import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string = 'http://localhost:8080/api/customers';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`)
      .pipe(
        catchError(this.handleErrors)
      );
  }

  getCustomerById(id): Observable<any> {
    let url = `${this.baseUrl}/listById/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleErrors)
    )
  }

  createCustomer(data): Observable<any> {
    let url = `${this.baseUrl}/add`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.handleErrors)
      )
  }

  updateCustomerbyId(id, data): Observable<any> {
    let url = `${this.baseUrl}/updateById/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.handleErrors)
    )
  }

  deleteCustomerById(id): Observable<any> {
    let url = `${this.baseUrl}/deleteById/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.handleErrors)
    )
  }


  handleErrors(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
