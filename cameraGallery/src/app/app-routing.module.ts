import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { TraduccionComponent } from './traduccion/traduccion.component';
import { CameraComponent } from './camera/camera.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "captura", component: CameraComponent},
  {path: "traductor", component: TraduccionComponent},
  {path: "login" , component: LoginComponent},
  {path: "registro", component: RegistroComponent},
  {path: "configuracion", component: ConfiguracionesComponent},
  {path: "entrenamiento", component: EntrenamientoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
