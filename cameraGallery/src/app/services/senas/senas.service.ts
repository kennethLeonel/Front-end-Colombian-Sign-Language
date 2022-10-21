import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable({
	providedIn: 'root',
})
export class SenasService {
	constructor(private restService: RestService) {}

	public crearSena(arreglo: any, nombreSena: string) {
		const url = 'http://localhost:8080/new-signal';
		let token = String(sessionStorage.getItem('token'));
		console.log(token);
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		});
		return this.restService.post<any>(
			url,
			{
				name: nombreSena,
				images: arreglo,
			},
			{ headers: headers }
		);
	}


	public getStatusTrainModel() {
		const url = 'http://localhost:8080/train-state';
		let token = sessionStorage.getItem('token');
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		});
		return this.restService.get<any>(url, { headers: headers });
		//Me envia la lista de las señas que aún no se entrenan de nuestro dataset ,
		// si esta lista esta vacia pues le decimos que paila no puede entrenar,
		// pero si esta llenita que si entrene y le mostramos cuales son las señas nuevas
	}

	//primera petición componente entrenamiento cuando se permite entrenar
	public trainModel() {
		const url = 'http://localhost:8080/train';
		let token = sessionStorage.getItem('token');
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		});
		return this.restService.get<any>(url, { headers: headers });
		//solo me envia un mensaje de que se activo el entrenamiento
	}

	public getTimeTrainModel(id_training?: any) {
		let url: string;
		if (id_training == null) {
			url = 'http://localhost:8080/training-info'
		}
		else {
			url = 'http://localhost:8080/training-info/' + id_training;
		}
		let token = sessionStorage.getItem('token');
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		});
		return this.restService.get<any>(url, { headers: headers });
		//Me envia la estructura de datos como epoch, media per  Epoch et quantitie des epochs este lo llamo cada 5 segundos
		//puedo revisar  training_state para mostrar una alerta segun como se encuentre
	}
}
