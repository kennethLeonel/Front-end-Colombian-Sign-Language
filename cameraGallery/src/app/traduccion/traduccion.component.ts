import { Component, OnInit } from '@angular/core';
import { SenasService } from '../services/senas/senas.service';
import { EnviarCordenadasService } from '../services/socket/enviar-cordenadas.service';







import {
  drawConnectors,
  drawLandmarks,
} from '@mediapipe/drawing_utils/';
import { Camera } from '@mediapipe/camera_utils';
import { HAND_CONNECTIONS, Holistic, POSE_CONNECTIONS  } from '@mediapipe/holistic';
import { WebSocketSubject } from 'rxjs/webSocket';




@Component({
  selector: 'app-traduccion',
  templateUrl: './traduccion.component.html',
  styleUrls: ['./traduccion.component.css'],
  providers: [EnviarCordenadasService],
})
export class TraduccionComponent implements OnInit {
  // window : any;
  videoElement: any;
  canvasElement: any;
  canvasCtx: any;

  datosAProcesar: any;
  senaObtenida: any ;
  resultado: any = null;
  datosObtenidos : any = [];
  Checkbox: any = null;
  booleanoCheck : any =false;

  constructor(private senaService: SenasService, private enviar: EnviarCordenadasService) {

    var functi = async (msg: any, ws: WebSocketSubject<any>) => {
      var mensaje = JSON.parse(msg);
      if (mensaje === "chao") {
        console.log('Hey me activaron');
        ws.complete();
      }
    
      for(let key in mensaje) {

        this.datosObtenidos.push({ sena : key, peso: mensaje[key] });
      }
      
      this.datosObtenidos.forEach((senaActual: any) => {
          if (senaActual.peso >= 95){
            this.resultado = senaActual.sena;
            if (this.resultado=="Telefono"){
              this.resultado="Teléfono";
            }else if (this.resultado=="Balon"){
              this.resultado="Balón";
            }else if (this.resultado=="Sabado"){
              this.resultado="Sábado";
            }else if (this.resultado=="Lampara"){
              this.resultado="Lámpara";
            }
            this.datosObtenidos = [];
            this.senaObtenida =  this.resultado;
            if (!this.booleanoCheck){
              this.reproducirAudio(this.resultado);
            }
           
            this.resultado = null; 
          }
      });
      if (this.resultado == null) {
          this.resultado = " las seña puede ser "+ this.datosObtenidos[0].sena + ", " +  this.datosObtenidos[1].sena + " O " +  this.datosObtenidos[2].sena ;
         
          this.datosObtenidos = [];
          this.senaObtenida =  this.resultado;
          if (!this.booleanoCheck){
            this.reproducirAudio(this.resultado);
          }
          this.resultado = null;
          
        }
      console.log("resultado",this.resultado);



    }

    enviar.getmessages(functi);

    // this.booleanoCheck = this.Checkbox.checked;
    // console.log(this.booleanoCheck);
    setInterval(() =>{
      console.log("hola 3s" );
      this.sendMessage();

    }, 3000);
  }


  ngOnInit() {
    this.Checkbox = document.getElementsByClassName('mute')[0];
    this.Checkbox.addEventListener('change',()=>{
      this.booleanoCheck = this.Checkbox.checked;
      console.log(this.booleanoCheck);
      // if (this.booleanoCheck){
        setInterval(() =>{
          console.log("hola 1s" );
          
          this.sendMessage();
    
        }, 1000);
      // }else{
      //   setInterval(() =>{
      //     console.log("hola 3s" );
      //     this.sendMessage();
    
      //   }, 3000);
      // }
      
    });
    this.videoElement = document.getElementsByClassName('input_video')[0];
    this.canvasElement = document.getElementsByClassName('output_canvas')[0];
    this.canvasCtx = this.canvasElement.getContext('2d');

    const holistic = new Holistic({
      locateFile: (file) => {
        console.log(`https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`);
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      }
    });
    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    holistic.onResults(this.onResults.bind(this));

    const camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await holistic.send({ image: this.videoElement });
      },
      width: 400,
      height: 400,
    });
    camera.start();
    
  }

  onResults(results: any) {

   


    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.canvasCtx.drawImage(results.segmentationMask, 0, 0,
      this.canvasElement.width, this.canvasElement.height);

    // Only overwrite existing pixels.
    this.canvasCtx.globalCompositeOperation = 'source-in'; // se sobrepone en la imagen 
    // this.canvasCtx.fillStyle = '#00FF00';
    this.canvasCtx.fillStyle = 'rgba(0,0,0,0.2)';
    this.canvasCtx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    // Only overwrite missing pixels.
    this.canvasCtx.globalCompositeOperation = 'destination-atop';





    this.canvasCtx.drawImage(
      results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);
    this.canvasCtx.globalCompositeOperation = 'source-over';
    drawConnectors(this.canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
      { color: '#00FF00', lineWidth: 1 });
    drawLandmarks(this.canvasCtx, results.poseLandmarks,
      { color: '#FF0000', lineWidth: 1, radius: 1 });
    // drawConnectors(this.canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
    //   { color: '#C0C0C070', lineWidth: 1 });
    drawConnectors(this.canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
      { color: '#CC0000', lineWidth: 1 });
    drawLandmarks(this.canvasCtx, results.leftHandLandmarks,
      { color: '#00FF00', lineWidth: 1, radius: 1 });
    drawConnectors(this.canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
      { color: '#00CC00', lineWidth: 1 });
    drawLandmarks(this.canvasCtx, results.rightHandLandmarks,
      { color: '#FF0000', lineWidth: 1, radius: 1 });
    this.canvasCtx.restore();





    //Llamada al servicio para obtener la sena

    this.datosAProcesar = {
      pose: results.poseLandmarks,
      face: results.faceLandmarks.slice(0,468),
      leftHand: results.leftHandLandmarks,
      rightHand: results.rightHandLandmarks,
      segmentation: results.segmentationMask,
      ea: results.ea,
    }
  
    

    

  }




  reproducirAudio(sena: any) {
    console.log("reproducirAudio",sena);
    let utterance = new SpeechSynthesisUtterance(sena);
    utterance.lang = 'es-ES';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    speechSynthesis.speak(utterance);
  }

  

  // enviarSena() {
    
  //   this.senaService.enviarSena(this.datosAProcesar).subscribe(
  //     (      res: string) => {
  //       console.log(res);
  //       alert("El resultado es: " + res);
  //       this.senaObtenida = res;
      
  //       this.datosAProcesar = {};
       
  //       //Puede ser 
  //       //this.reproducirAudio();
  //     }
  //   )
  // }


  sendMessage() {

    if (this.datosAProcesar.rightHand || this.datosAProcesar.leftHand){
      this.enviar.socketConectado(this.datosAProcesar);
    }else{
      this.senaObtenida ='';
    }
    
    
  }



  


  

}

