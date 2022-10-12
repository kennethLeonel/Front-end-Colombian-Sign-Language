import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import Swal from 'sweetalert2'

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
  angForm: FormGroup|any;
  userModel : string ="";
  constructor(private router :Router,private fb: FormBuilder , private usuarioService : UsuarioService)  { 
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm() {
    this.angForm = this.fb.group({
      nombre: ['', Validators.required ],
      contra: ['', Validators.required ],
      email: ['', Validators.required ],
      rol : ['', Validators.required ],
     

    });
  }
  registrarse(){
    // console.log(this.nombre);
    // console.log(this.email);
    // console.log(this.contra);
  

    if(this.rolA !== ""){
      this.rolUsuario = this.rolA;
    }else if(this.rolC !== ""){
      this.rolUsuario = this.rolC;
    }
    // console.log(this.rolUsuario);
    this.usuarioService.crearUsuario(this.nombre,this.email,this.contra,this.rolUsuario).subscribe(
      res => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          text: 'Usuario registrado correctamente',
        })
       
        this.router.navigate(['/login']);
      },
    );

  }
  

}
