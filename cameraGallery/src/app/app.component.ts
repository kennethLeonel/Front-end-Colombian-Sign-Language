import { Component,VERSION,OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'cameraGallery';
  name = 'Angular ' + VERSION.major;



  ngOnInit(): void {
    

  }


  constructor( private router :Router ) {}

  home(){
    this.router.navigate(['/home']);
  }
  irATraduccion(){
    this.router.navigate(['/traductor']);
  }
  irACaptura(){
    this.router.navigate(['/captura']);
  }
  irALogin(){
    this.router.navigate(['/login']);
  }
  irARegistro(){
    this.router.navigate(['/registro']);
  }
  irAConfiguracion(){
    this.router.navigate(['/configuracion']);
  }
  irAEntrenamiento(){
    this.router.navigate(['/entrenamiento']);
  }
}

