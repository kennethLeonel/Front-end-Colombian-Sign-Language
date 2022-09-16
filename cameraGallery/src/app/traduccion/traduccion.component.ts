import { Prediction } from './../../../prediction';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,Inject } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

import {
  drawConnectors,
  drawLandmarks,
} from '@mediapipe/drawing_utils/';
import { Camera } from '@mediapipe/camera_utils';
import { FACEMESH_TESSELATION, HAND_CONNECTIONS, Holistic, POSE_CONNECTIONS } from '@mediapipe/holistic';



@Component({
  selector: 'app-traduccion',
  templateUrl: './traduccion.component.html',
  styleUrls: ['./traduccion.component.css']
})
export class TraduccionComponent implements OnInit {
  // window : any;
  videoElement: any;
  canvasElement: any;
  canvasCtx: any;
  constructor() { }
  ngOnInit() {
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

onResults(results:any) {
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
      { color: '#00FF00', lineWidth: 1 ,radius: 1 });
    drawConnectors(this.canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
      { color: '#00CC00', lineWidth: 1 });
    drawLandmarks(this.canvasCtx, results.rightHandLandmarks,
      { color: '#FF0000', lineWidth: 1,radius: 1 });
    this.canvasCtx.restore();
  }
  reproducirAudio(){

  }

}

