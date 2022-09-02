import { Component,VERSION } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cameraGallery';
  name = 'Angular ' + VERSION.major;

  constructor( private router :Router) {
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

