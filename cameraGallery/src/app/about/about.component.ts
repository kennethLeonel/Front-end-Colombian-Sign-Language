import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  
  integrantes = [{
    perfil: "../assets/images/juan.jpeg",
    nombre: "Juan Pablo",
    apellido: "Ortiz Rubio",
    correo: "ortizrubio@javeriana.edu.co"
  },
  {
    perfil: "../assets/images/kenneth.jpg",
    nombre: "Kenneth David",
    apellido: "Leonel Triana",
    correo: "kdavidleonelt@javeriana.edu.co"
  }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
