import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public httpHead: {} = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }

  public get<T>(url: string, httpHeader?: {}): Observable<T> {
    console.log('get', url);
    return this.http.get<T>(url, httpHeader).pipe(
      // retry(5),
      catchError(this.handleError)
    );
  }

  public post<T>(url: string, data: any, httpHeader?: {}): Observable<T> {
    console.log('post', url);
    return this.http.post<T>(url, data, httpHeader).pipe(
      // retry(5),
      catchError(this.handleError)
    );
  }

  public put<T>(url: string, data: any, httpHeader?: {}): Observable<T> {
    console.log('put', url);
    return this.http.put<T>(url, data, httpHeader).pipe(
      // retry(5),
      catchError(this.handleError)
    );
  }

  public delete<T>(url: string, httpHeader?: {}): Observable<T> {
    console.log('delete', url);
    return this.http.delete<T>(url, httpHeader).pipe(
      // retry(5),
      catchError(this.handleError)
    );
  }

}
