
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

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//prueba
import { FusionChartsModule } from 'angular-fusioncharts';

import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)
@NgModule({
  declarations: [
    AppComponent,
    TraduccionComponent,
    LoginComponent,
    RegistroComponent,
    ConfiguracionesComponent,
    EntrenamientoComponent,
    AboutComponent,
   
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CameraModule,
    ReactiveFormsModule,
    HttpClientModule,
    FusionChartsModule,
    
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
