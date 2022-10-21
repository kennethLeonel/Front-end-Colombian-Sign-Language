import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SenasService } from '../services/senas/senas.service';

@Component({
	selector: 'app-entrenamiento',
	templateUrl: './entrenamiento.component.html',
	styleUrls: ['./entrenamiento.component.css'],
})
export class EntrenamientoComponent implements OnInit {
	// Variable that will hold the time of train our model to be able to show it in the view

	hours: any;
	minutes: any;
	seconds: any;
	signsNoTrained: any = [];
	signsExist = false;
	stringSigns: String = '';
	structTime: any;

	//this variables change through time / 5 seconds
	mean_time_execution: any;
	epoch: any;
	cant_epochs: any;
	training_state: any;

	// DOM Manipulation

	//element button to make a evenet click
	botonEntrenar: any;
	hoursElement: any;
	minutesElement: any;
	secondsElement: any;
	idTrain: any;
	time: any = 0;
	switcher: any = true;
	
	constructor(private senasService: SenasService, private router: Router) {}

	ngOnInit(): void {
		this.botonEntrenar = document.getElementById('button_train');
		this.botonEntrenar.disabled = true;

		this.senasService.getTimeTrainModel().subscribe((res) => {
			console.log(res);
			this.structTime = res;
			this.mean_time_execution = this.structTime.mean_time_execution;
			this.epoch = this.structTime.epoch;
			this.cant_epochs = this.structTime.cant_epochs;
			this.training_state = this.structTime.training_state;

			// If the las trainig is finished or error we can train
			if (this.training_state == 3 || this.training_state == 4) {
				this.senasService.getStatusTrainModel().subscribe((res) => {
					this.signsNoTrained = res;
					// mIRAR QUE NOS MANDA RES PARA INICIALIZAR NUESTRO ARREGLO DE SEÑAS

					if (this.signsNoTrained.length > 0) {
						this.signsExist = true;
						this.signsNoTrained.forEach((value: any) => {
							this.stringSigns += value.name + ', ';
						});
						this.stringSigns = this.stringSigns.slice(0, -2);
						if (this.signsExist == true) {
							this.botonEntrenar.disabled = false;
							console.log('este es', this.botonEntrenar);
							Swal.fire({
								icon: 'success',
								title: 'Señas por entrenar',
								text:
									'Se han encontrado señas por entrenar en el sistema: \n [' + this.stringSigns + ']',
							});
						}
					} else {
						Swal.fire({
							icon: 'warning',
							title: 'Tranquilo todo esta entrenado',
							text: 'No se han encontrado señas por entrenar en el sistema \n Captura nuevas señas para entrenar el modelo',
						});
					}
				});
			} else {
				this.idTrain = 0; // this id is only to allow the constant update of the state of the training
				let intervaLCall = setInterval(() => {
					if (this.callServiceTime() == false) {
						clearInterval(intervaLCall);
					} else {
						if (this.idTrain >= 0) {
							this.callServiceTime();
						}
					}
				}, 5000);
				if (this.training_state == 1) {
					Swal.fire({
						icon: 'info',
						title: 'Entrenamiento en proceso',
						text: 'El modelo se está entrenando en este momento por otra ejecución',
						timer: 5000,
					});
				}
			}
		},(error) =>{
			Swal.fire({
				icon: 'error',
				title: 'El entrenamiento obtuvo un error por desgracia',
				text: 'Error: ' + error.message,
				timer: 5000,
			});
		}

		
		);

		// prueba qeu funcione
		//this.signsNoTrained.push('hola');

		// Function add a event click to the button to train the model
		// and show the time that the model will take to train
		this.botonEntrenar?.addEventListener('click', () => {
			console.log('click');
			this.botonEntrenar.disabled = true;
			this.senasService.trainModel().subscribe(
				(res) => {
					console.log(res);
					this.idTrain = res.id;
					console.log(this.idTrain);
					Swal.fire({
						icon: 'success',
						title: 'Entrenamiento en proceso',
						text: 'El modelo se esta entrenando, por favor espere',
					});
					let intervaLCall = setInterval(() => {
						if (this.callServiceTime() == false) {
							clearInterval(intervaLCall);
						} else {
							if (this.idTrain >= 0) {
								this.callServiceTime();
							}
						}
					}, 5000);
				},
				(err) => {
					console.log(err);
					Swal.fire({
						icon: 'error',
						title: 'Error al entrenar el modelo',
						text: 'Ha ocurrido un error al entrenar el modelo, por favor intente de nuevo',
					});
					this.botonEntrenar.disabled = false;
				}
			);
		});
	}

	callServiceTime(): any {
		this.senasService.getTimeTrainModel().subscribe((res) => {
			console.log(res);
			// MIRAR QUE NOS MANDA RES PARA INICIALIZAR NUESTRO ARREGLO DE SEÑAS
			this.structTime = res;
			this.mean_time_execution = this.structTime.mean_time_execution;
			this.epoch = this.structTime.epoch;
			this.cant_epochs = this.structTime.cant_epochs;
			this.training_state = this.structTime.training_state;
			this.time = this.mean_time_execution * (this.cant_epochs - this.epoch);
		});
		// estimación * (cant_epochs - epoch)

		// convert seconds to hours minutes and seconds
		/*
		    CREATED = 0
			START = 1
			PROCESSING = 2
			FINISHED = 3
			ERROR = 4
			
    	*/

		if (this.switcher) {
			let timeInterval = setInterval(() => {
				if (this.training_state == 3 || this.training_state == 4) {
					clearInterval(timeInterval);
				} else {
					this.takeTime();
				}
			}, 1000);
			this.switcher = false;
		}

		if (this.training_state == 3) {
			Swal.fire({
				icon: 'success',
				title: 'Entrenamiento finalizado',
				text: 'El modelo se ha entrenado correctamente',
				
			});
			this.router.navigate(['/traductor']);
			return false;
		} else if (this.training_state == 4) {
			Swal.fire({
				icon: 'error',
				title: 'Entrenamiento fallido',
				text: 'El modelo no se ha podido entrenar',
			});
			this.botonEntrenar.disabled = false;

			return false;
		}
		return true;
	}

	takeTime() {
		this.time = this.time - 1;
		this.hours = Math.floor(this.time / 3600);
		this.minutes = Math.floor(this.time / 60 - this.hours * 60);
		this.seconds = Math.floor(this.time % 60);
		console.log(this.hours, this.minutes, this.seconds);
		this.hoursElement = document.getElementById('hours');
		this.minutesElement = document.getElementById('minutes');
		this.secondsElement = document.getElementById('seconds');

		this.hoursElement.innerHTML = this.hours + ' Horas';
		this.minutesElement.innerHTML = this.minutes + ' Minutos';
		this.secondsElement.innerHTML = this.seconds + ' Segundos';
	}
}
