import { Component, OnInit } from '@angular/core';
import { SenasService } from '../services/senas/senas.service';
import { EnviarCordenadasService } from '../services/socket/enviar-cordenadas.service';
// 
import { NavigationExtras, Router } from '@angular/router';


import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils/';
import {
    HAND_CONNECTIONS,
    Holistic,
    POSE_CONNECTIONS
} from '@mediapipe/holistic';
import { WebSocketSubject } from 'rxjs/webSocket';




@Component({
    selector: 'app-traduccion',
    templateUrl: './traduccion.component.html',
    styleUrls: ['./traduccion.component.css'],
    providers: [EnviarCordenadasService],
})
export class TraduccionComponent implements OnInit {
    videoElement: any;
    canvasElement: any;
    canvasCtx: any;
    camera: Camera | any;
    datosAProcesar: any;
    senaObtenida: any;
    datosObtenidos: any = [];
    Checkbox: any = null;
    booleanoCheck: any = false;
    //Para la prueba 10 seg
    // intervalo = 10000;
    intervalo = 3000;
    arregloPrueba: any = [];
    // DOM
    buttonPronostic: any;


    constructor(
        private senaService: SenasService,
        private enviar: EnviarCordenadasService,
        private router: Router
    ) {
        var functi = async (msg: any, ws: WebSocketSubject<any>) => {
            var mensaje = JSON.parse(msg);
            if (mensaje === 'chao') {
                console.log('Hey me activaron');
                ws.complete();
            }

            this.datosObtenidos = [];

            for (let key in mensaje) {
                this.datosObtenidos.push({ sena: key, peso: mensaje[key] });
            }
            console.log(this.datosObtenidos.length);
            // probar con lo de pasar datos al otro componente
            
           

            if (this.arregloPrueba.length > 0) {
                this.buttonPronostic.disabled = false;
            }else{
                this.buttonPronostic.disabled = true;
            }

            if (this.arregloPrueba.length == 30){
                this.arregloPrueba.shift();
            }

            this.arregloPrueba.push(this.datosObtenidos[0]);
            console.log(this.arregloPrueba.length);

            this.buttonPronostic.addEventListener('click', () => {
                let navigationExtras: NavigationExtras = {
                    state: {
                        dato: this.arregloPrueba
                    }
                };
                clearInterval(captureInterval)
                speechSynthesis.cancel();
                this.camera.stop();
                this.router.navigate(['/configuracion'], navigationExtras);
            });

            // if (this.arregloPrueba.length < 10) {
            //     this.arregloPrueba.push(this.datosObtenidos[0]);
            // }
            // if (this.arregloPrueba.length == 10) {
            //     this.arregloPrueba.push(-1);
            //     let navigationExtras: NavigationExtras = {
            //         state: {
            //             dato: this.arregloPrueba

            //         }
            //     };
            //     this.camera.stop();
            //     speechSynthesis.cancel();
            //     this.router.navigate(['/configuracion'], navigationExtras);


            // }




            // finaliza parte prueba 


            if (this.datosObtenidos[0].peso >= 95) {
                if (this.datosObtenidos[0].sena === "Sabado") {
                    this.senaObtenida = "Sábado";
                } else if (this.datosObtenidos[0].sena === "Telefono") {
                    this.senaObtenida = "Teléfono";
                } else if (this.datosObtenidos[0].sena === "Balon") {
                    this.senaObtenida = "Balón";
                } else if (this.datosObtenidos[0].sena === "Lampara") {
                    this.senaObtenida = "Lámpara";
                } else {
                    this.senaObtenida = this.datosObtenidos[0].sena;
                }
            } else {
                this.senaObtenida =
                    'La seña puede ser ' +
                    this.datosObtenidos[0].sena +
                    ' o ' +
                    this.datosObtenidos[1].sena +
                    ' o ' +
                    this.datosObtenidos[2].sena;
            }

            if (!this.booleanoCheck) {
                speechSynthesis.cancel();
                this.reproducirAudio(this.senaObtenida);
            }
        };
        enviar.getmessages(functi);
       let captureInterval = setInterval(() => this.sendMessage(), this.intervalo);
    }

    ngOnInit() {
        
        this.buttonPronostic = document.getElementById('button_pronostic');
        this.buttonPronostic.disabled = true;
        // this.helper.prueba();
        this.Checkbox = document.getElementsByClassName('mute')[0];
        this.Checkbox.addEventListener('change', () => {
            this.setIntervalo(this.Checkbox.checked);
            console.log(this.booleanoCheck);
        });
        this.videoElement = document.getElementsByClassName('input_video')[0];
        this.canvasElement =
            document.getElementsByClassName('output_canvas')[0];
        this.canvasCtx = this.canvasElement.getContext('2d');

        const holistic = new Holistic({
            locateFile: (file) => {
                console.log(
                    `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`
                );
                return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
            },
        });
        holistic.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            refineFaceLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                await holistic.send({ image: this.videoElement });
            },
        });

        this.camera.start();
        this.setIntervalo(this.Checkbox.checked);
        holistic.onResults(this.onResults.bind(this));
    }

    ngOnDestroy() {
        this.camera.stop();
        speechSynthesis.cancel();
    }

    onResults(results: any) {
        this.canvasCtx.save();
        this.canvasCtx.clearRect(
            0,
            0,
            this.canvasElement.width,
            this.canvasElement.height
        );
        this.canvasCtx.drawImage(
            results.segmentationMask,
            0,
            0,
            this.canvasElement.width,
            this.canvasElement.height
        );

        // Only overwrite existing pixels.
        this.canvasCtx.globalCompositeOperation = 'source-in'; // se sobrepone en la imagen
        // this.canvasCtx.fillStyle = '#00FF00';
        this.canvasCtx.fillStyle = 'rgba(0,0,0,0.2)';
        this.canvasCtx.fillRect(
            0,
            0,
            this.canvasElement.width,
            this.canvasElement.height
        );

        // Only overwrite missing pixels.
        this.canvasCtx.globalCompositeOperation = 'destination-atop';

        this.canvasCtx.drawImage(
            results.image,
            0,
            0,
            this.canvasElement.width,
            this.canvasElement.height
        );
        this.canvasCtx.globalCompositeOperation = 'source-over';
        drawConnectors(
            this.canvasCtx,
            results.poseLandmarks,
            POSE_CONNECTIONS,
            { color: '#00FF00', lineWidth: 1 }
        );
        drawLandmarks(this.canvasCtx, results.poseLandmarks, {
            color: '#FF0000',
            lineWidth: 1,
            radius: 1,
        });
        // drawConnectors(this.canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
        //   { color: '#C0C0C070', lineWidth: 1 });
        drawConnectors(
            this.canvasCtx,
            results.leftHandLandmarks,
            HAND_CONNECTIONS,
            { color: '#CC0000', lineWidth: 1 }
        );
        drawLandmarks(this.canvasCtx, results.leftHandLandmarks, {
            color: '#00FF00',
            lineWidth: 1,
            radius: 1,
        });
        drawConnectors(
            this.canvasCtx,
            results.rightHandLandmarks,
            HAND_CONNECTIONS,
            { color: '#00CC00', lineWidth: 1 }
        );
        drawLandmarks(this.canvasCtx, results.rightHandLandmarks, {
            color: '#FF0000',
            lineWidth: 1,
            radius: 1,
        });
        this.canvasCtx.restore();

        this.datosAProcesar = {
            pose: results.poseLandmarks ? results.poseLandmarks : null,
            face: results.faceLandmarks ? results.faceLandmarks.slice(0, 468) : null,
            leftHand: results.leftHandLandmarks ? results.leftHandLandmarks : null,
            rightHand: results.rightHandLandmarks ? results.rightHandLandmarks : null,
            segmentation: results.segmentationMask ? results.segmentationMask : null,
            ea: results.ea ? results.ea : null,
        };
    }

    reproducirAudio(sena: any) {
        console.log('reproducirAudio', sena);
        let utterance = new SpeechSynthesisUtterance(sena);
        utterance.lang = 'es-ES';
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);

    }

    sendMessage() {
       
            console.log(this.intervalo);
            if (this.datosAProcesar.rightHand || this.datosAProcesar.leftHand) {
                this.enviar.socketConectado(this.datosAProcesar);
            } else {
                this.senaObtenida = '';
            }
      

    }

    setIntervalo(boolCheck: boolean) {
        this.booleanoCheck = boolCheck;
        if (boolCheck) {
            this.intervalo = 1000;
        } else {
            //Para la prueba 10 seg  
            // this.intervalo = 10000;
            // para la parte de producción del sistema 3 seg
            this.intervalo = 3000;
        }
    }


}
