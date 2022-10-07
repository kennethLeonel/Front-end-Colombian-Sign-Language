
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { User_authenticated, User_data } from '../models/users';
import { RestService } from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  constructor(private restService: RestService) { }

  private options= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      
    })
  }
  public login(email: string, password: string):Observable<User_authenticated> {
    const serverUrl="http://localhost:8080/login";
    const formHeaders = new HttpHeaders();
    formHeaders.append('accept', 'application/json');
    formHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var formData: any = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const formParams = new HttpParams()
      .set('email', email)
      .set('password', password);
  const params = new URLSearchParams();
  params.append('email',email);
  params.append('password',password);


  return this.restService.post<User_authenticated>(serverUrl,formParams);
  }

  public get_token(user_authenticated:string):Observable<User_data[]>{

    const serverUrl="http://localhost:8080/get-token";

    const body=JSON.stringify("");
    const headers= {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_authenticated}`
      })
    }
    return this.restService.post<any>(serverUrl,body,headers);
  }


}
