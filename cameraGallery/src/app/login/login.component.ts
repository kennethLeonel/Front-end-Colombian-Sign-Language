import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email : string ="";
  contra : string ="";
  angForm: FormGroup|any;
  constructor( private router :Router,private fb: FormBuilder) { 
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
    this.router.navigate(['/home'], { queryParams: { id: '1' } });
  }

}
