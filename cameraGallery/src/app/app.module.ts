import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraModule } from './camera/camera.module';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { TraduccionComponent } from './traduccion/traduccion.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//prueba
import { FusionChartsModule } from 'angular-fusioncharts';

import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);
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
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
