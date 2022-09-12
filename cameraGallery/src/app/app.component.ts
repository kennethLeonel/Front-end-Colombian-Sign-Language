import { Component,VERSION,OnInit } from '@angular/core';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'cameraGallery';
  name = 'Angular ' + VERSION.major;
  esperar : number | undefined;
  usuarioLogueado = false;

  ngOnInit() {
    this.route.queryParamMap
    .subscribe((params) => {
      this.esperar = Number(params.get('id'));
      if(this.esperar == 1){
        this.usuarioLogueado = true;
        console.log(this.usuarioLogueado);
      }
  });
  }


  constructor( private router :Router,private route: ActivatedRoute  ) {}

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

