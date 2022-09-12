import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email : string ="";
  contra : string ="";
  constructor( private router :Router) { }

  ngOnInit(): void {
  }
  home(){
    this.router.navigate(['/home']);
  }
  login (){
    console.log(this.email);
    console.log(this.contra);
    this.router.navigate(['/home'], { queryParams: { id: '1' } });
  }

}
