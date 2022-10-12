
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {
  dato: any = null;
  //  public chart: any;
  dataSource: any;
  chartConfig: any;

  prueba = [{ sena: "bien", peso: 70 }
    , { sena: "mal", peso: 30 }

  ];

  constructor(private router: Router) {

    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation()!.extras.state) {
      this.dato = this.router.getCurrentNavigation()!.extras.state!['dato'];;
      console.log(this.dato);

    }

    let prueba = [];

    for (let j = 0; j < this.prueba.length; j++) {
      prueba.push({ label: this.prueba[j].sena, value: this.prueba[j].peso });
    }

    //prueba
    this.chartConfig = {
      width: '700',
      height: '400',
      type: 'column2d',
      dataFormat: 'json',
    };

    this.dataSource = {
      "chart": {
        "caption": this.prueba[0].sena,
        // "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Intento",
        "yAxisName": "Precisión",
        "numberSuffix": "%",
        "theme": "fusion",
      },
      "data": prueba
    };
  }

  ngOnInit(): void {
 }



}
