import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {  User_authenticated } from '../models/users';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  token :any;
  email : string ="";
  contra : string ="";
  angForm: FormGroup|any;
  constructor( private router :Router,private fb: FormBuilder , private loginService : LoginService) { 
    this.createForm()
  }

  ngOnInit(): void {
  }

  createForm() {
    this.angForm = this.fb.group({
    
      contra: ['', Validators.required ],
      email: ['', Validators.required ],
     
     

    });
  }
  // home(){
  //   this.router.navigate(['/home']);
  // }
  login (){
    console.log(this.email);
    console.log(this.contra);
   
    this.loginService.login(this.email,this.contra).subscribe(
      res => {
        sessionStorage.setItem("email",this.email);
       // sessionStorage.setItem("usuario",res.usuario);
        sessionStorage.setItem("token",res.access_token);
      
        console.log(res.access_token);
    
        this.router.navigate(['/home'], { queryParams: { id: '1' } });


     });
  }
}