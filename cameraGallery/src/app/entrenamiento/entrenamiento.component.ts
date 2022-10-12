import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.css']
})
export class EntrenamientoComponent implements OnInit {

  // Variable that will hold the time of train our model to be able to show it in the view 
  days : any  ;
  hours : any;
  minutes : any
  seconds : any;

  // DOM Manipulation

  daysElement : any = document.getElementById("days");
  hoursElement : any = document.getElementById("hours");
  minutesElement : any = document.getElementById("minutes");
  secondsElement : any = document.getElementById("seconds");

  constructor() { }

  ngOnInit(): void {
  }
  entrenar(){

    console.log("Entrenando");
    this.showTime(Date.now());
  }


  showTime (date : any){
    
    this.days = date.days;
    console.log(this.days);
    this.hours = date.hours;
    console.log(this.hours);
    this.minutes = date.minutes;
    console.log(this.minutes);
    this.seconds = date.seconds;
    console.log(this.seconds);
    
    this.daysElement.innerHTML = this.days;
    this.hoursElement.innerHTML = this.hours;
    this.minutesElement.innerHTML = this.minutes;
    this.secondsElement.innerHTML = this.seconds;

    setInterval(this.showTime, 1000);
  }

  


  


}
