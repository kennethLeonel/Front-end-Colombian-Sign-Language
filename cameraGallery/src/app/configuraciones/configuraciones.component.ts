import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
	selector: 'app-configuraciones',
	templateUrl: './configuraciones.component.html',
	styleUrls: ['./configuraciones.component.css'],
})
export class ConfiguracionesComponent implements OnInit {
	dato: any = null;
	dataSource: any;
	chartConfig: any;
	existData: boolean = false;

	constructor(private router: Router) {
		if (
			this.router.getCurrentNavigation() &&
			this.router.getCurrentNavigation()!.extras.state
		) {
			this.dato =
				this.router.getCurrentNavigation()!.extras.state!['dato'];
			this.existData = true;
		}
		if (this.existData) {
			let prueba = [];
			for (let j = 0; j < this.dato.length; j++) {
				prueba.push({
					label: this.dato[j].sena,
					value: this.dato[j].peso,
				});
			}
			this.chartConfig = {
				width: '700',
				height: '400',
				type: 'column2d',
				dataFormat: 'json',
			};

			this.dataSource = {
				chart: {
					caption: 'Precisión de la red neuronal',
					xAxisName: 'Intento',
					yAxisName: 'Precisión',
					numberSuffix: '%',
					theme: 'fusion',
				},
				data: prueba,
			};
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Que triste!',
				text: 'No hay datos para mostrar!',
			});
			setTimeout(() => {
				this.router.navigate(['/traductor']);
			}, 8000);
		}
	}

	ngOnInit(): void {}
}
