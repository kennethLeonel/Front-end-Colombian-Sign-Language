import {AfterViewInit, Component, OnInit ,ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements AfterViewInit { 

  WIDTH = 640;//640
  HEIGHT = 480;

 
  @ViewChild("video")
  public video!: ElementRef;

  @ViewChild("canvas")
  public canvas!: ElementRef;

  captures: string[] = [];
  inputText : string = "";
  error: any;
  isCaptured!: boolean;
  

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "No tienes dispositivo de camara";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    for (let i = 0; i < 3; i++) {
      
        this.drawImageToCanvas(this.video.nativeElement);
        this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
        this.isCaptured = false;
    
    }
    // this.drawImageToCanvas(this.video.nativeElement);
    // this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    console.log(this.captures);
     this.isCaptured = true;
  }

  removeCurrent() {
    this.isCaptured = false;
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }
  eliminarFoto(idx: number) {
    var ImagenesActuales =this.captures.filter(item => item !== this.captures[idx]);
    this.captures = ImagenesActuales;
    this.isCaptured = false;
    console.log(this.captures);
  }
  subir(nombresena: string){
    this.inputText = nombresena;
    console.log(this.inputText);
  
  }

  eliminarTodo(){
    this.captures = [];
    this.isCaptured = false;
  }
  

  procesar(){
    if (this.captures.length <= 0) {
       alert("No hay fotos para procesar");
    
     }else if (this.inputText == "") {
      alert("No se especifica la seña para procesar");
    }else{
      alert("Procesando..." + this.inputText);
    }
    
  }  
}











