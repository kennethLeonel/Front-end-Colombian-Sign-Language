import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nombre : string ="";
  email : string ="";
  contra : string ="";
  rolA : string ="";
  rolC : string ="";
  rolUsuario : string ="";
  constructor(private router :Router) { }

  ngOnInit(): void {
  }
  registrarse(){
    console.log(this.nombre);
    console.log(this.email);
    console.log(this.contra);

    if(this.rolA !== ""){
      this.rolUsuario = this.rolA;
    }else if(this.rolC !== ""){
      this.rolUsuario = this.rolC;
    }
    console.log(this.rolUsuario);
  }

}
