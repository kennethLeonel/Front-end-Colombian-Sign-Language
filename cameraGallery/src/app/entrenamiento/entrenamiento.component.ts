import { Component, OnInit } from '@angular/core';
import { SenasService } from '../services/senas/senas.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.css']
})
export class EntrenamientoComponent implements OnInit {

  // Variable that will hold the time of train our model to be able to show it in the view 
  days: any;
  hours: any;
  minutes: any
  seconds: any;
  signsNoTrained: any = [];
  signsExist = false;
  stringSigns: String = "";
  structTime: any;

  //this variables change through time / 5 seconds 
  mean_time_execution: any;
  epoch: any;
  cant_epochs: any;
  training_state: any;

  // DOM Manipulation

  //element button to make a evenet click
  botonEntrenar : any;
  

  daysElement: any = document.getElementById("days");
  hoursElement: any = document.getElementById("hours");
  minutesElement: any = document.getElementById("minutes");
  secondsElement: any = document.getElementById("seconds");





  constructor(private senasService: SenasService) {

  }

  ngOnInit(): void {
    this.senasService.getStatusTrainModel().subscribe(
      res => {
        console.log(res);
        // mIRAR QUE NOS MANDA RES PARA INICIALIZAR NUESTRO ARREGLO DE SEÑAS 

      });

      // prueba qeu funcione
      //this.signsNoTrained.push("hola");

    if (this.signsNoTrained.length > 0) {

     this.signsExist = true;
      this.signsNoTrained.forEach((value: any) => {
        this.stringSigns += value + " ";
      });
      if (this.signsExist == true) {
        this.botonEntrenar = document.getElementById("button_train");
        this.botonEntrenar.disabled = false;
        console.log("este es",this.botonEntrenar);
        Swal.fire({
          icon: 'success',
          title: 'Señas por entrenar',
          text: 'Se han encontrado señas por entrenar en el sistema \n ' + this.stringSigns,
        })
      }
    } else {

      Swal.fire({
        icon: 'warning',
        title: 'Tranquilo todo esta entrenado',
        text: 'No se han encontrado señas por entrenar en el sistema \n Captura nuevas señas para entrenar el modelo',
      })
    }

    // Function add a event click to the button to train the model 
    // and show the time that the model will take to train
    this.botonEntrenar?.addEventListener("click", () => {
      console.log("click");
      this.botonEntrenar.disabled = true;
      this.senasService.trainModel().subscribe(
        res => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Entrenamiento en proceso',
            text: 'El modelo se esta entrenando, por favor espere',
          })
        },

      );

      let intervaLCall = setInterval(() => {
        if (this.callServiceTime() == false) {
          clearInterval(intervaLCall);
        }else{
          this.callServiceTime()
        }
        
      }, 5000);
      
    }
    );

  }


  callServiceTime(): any {
   
    this.senasService.getTimeTrainModel().subscribe(
      res => {
        console.log(res);
        // mIRAR QUE NOS MANDA RES PARA INICIALIZAR NUESTRO ARREGLO DE SEÑAS 
        this.structTime = res;
        this.mean_time_execution = this.structTime.mean_time_execution;
        this.epoch = this.structTime.epoch;
        this.cant_epochs = this.structTime.cant_epochs;
        this.training_state = this.structTime.training_state;
      },
    );

    // prueba qeu funcione
    //this.training_state = 3;

    /* 
        PROCESSING = 1
        FINISHED = 2
        ERROR = 3
    */
    if (this.training_state == 1) {
      Swal.fire({
        icon: 'info',
        title: 'Entrenamiento en proceso',
        text: 'El modelo se esta entrenando, por favor espere',
      });
    } else if (this.training_state == 2) {
      Swal.fire({
        icon: 'success',
        title: 'Entrenamiento finalizado',
        text: 'El modelo se ha entrenado correctamente',
      });
      return false;

    } else if (this.training_state == 3) {
      Swal.fire({
        icon: 'error',
        title: 'Entrenamiento fallido',
        text: 'El modelo no se ha podido entrenar',
      });
      this.botonEntrenar.disabled = false;
      return false;
    
    }
  }


}












