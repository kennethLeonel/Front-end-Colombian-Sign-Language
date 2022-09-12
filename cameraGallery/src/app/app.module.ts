
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraModule } from './camera/camera.module';
import { TraduccionComponent } from './traduccion/traduccion.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { AboutComponent } from './about/about.component';
import { PruebaTensorComponent } from './prueba-tensor/prueba-tensor.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TraduccionComponent,
    LoginComponent,
    RegistroComponent,
    ConfiguracionesComponent,
    EntrenamientoComponent,
    AboutComponent,
    PruebaTensorComponent
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CameraModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
