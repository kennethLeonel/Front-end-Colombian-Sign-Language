import { Prediction } from './../../../prediction';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,Inject } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
// import { DeviceDetectorService } from 'ngx-device-detector';
// import { Holistic }  from '@mediapipe/holistic';
// import { Camera } from '@mediapipe/camera_utils';



// import {Hands} from '@mediapipe/hands';
// // import  drawing 
// import * as DrawingUtils from '@mediapipe/drawing_utils';
// import * as ControlUtils from '@mediapipe/control_utils';


declare let deviceDetector: any;
// import DeviceDetector = require("device-detector-js");
import { DeviceDetectorResult, DeviceDetectorOptions } from "device-detector-js";
import * as DeviceDetector from 'device-detector-js';
import { DOCUMENT } from '@angular/common';


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
      width: 1280,
      height: 720
    });
    camera.start();
  }

onResults(results:any) {
    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.canvasCtx.drawImage(results.segmentationMask, 0, 0,
      this.canvasElement.width, this.canvasElement.height);

    // Only overwrite existing pixels.
    this.canvasCtx.globalCompositeOperation = 'source-in';
    this.canvasCtx.fillStyle = '#00FF00';
    this.canvasCtx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    // Only overwrite missing pixels.
    this.canvasCtx.globalCompositeOperation = 'destination-atop';
    this.canvasCtx.drawImage(
      results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);

    this.canvasCtx.globalCompositeOperation = 'source-over';
    drawConnectors(this.canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
      { color: '#00FF00', lineWidth: 4 });
    drawLandmarks(this.canvasCtx, results.poseLandmarks,
      { color: '#FF0000', lineWidth: 2 });
    drawConnectors(this.canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
      { color: '#C0C0C070', lineWidth: 1 });
    drawConnectors(this.canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
      { color: '#CC0000', lineWidth: 5 });
    drawLandmarks(this.canvasCtx, results.leftHandLandmarks,
      { color: '#00FF00', lineWidth: 2 });
    drawConnectors(this.canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
      { color: '#00CC00', lineWidth: 5 });
    drawLandmarks(this.canvasCtx, results.rightHandLandmarks,
      { color: '#FF0000', lineWidth: 2 });
    this.canvasCtx.restore();
  }
//   constructor(@Inject(DOCUMENT) private document: Document, private camera : Camera, private holistic : Holistic , private hands : Hands, private drawingUtils : DrawingUtils, private controlUtils : ControlUtils) {

//     this.window = this.document.defaultView;
//  }
// }
// // declare global {
// //   interface Window {
// //     mpHands : any ;    
// //     drawingUtils : any ;
// //     controls: any ;
// //     controls3d : any;
// //   }
// // }

// window.mpHands = Hands;
// window.drawingUtils = DrawingUtils;
// window.controls = ControlUtils;
// window.controls3d = ControlUtils3d;


 
//   // const mpHands : any = window;    
//   // const drawingUtils : any = window;
//   // const controls: any = window;
//   // const controls3d : any= window;

// // Usage: testSupport({client?: string, os?: string}[])
// // Client and os are regular expressions.
// // See: https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/README.md for
// // legal values for client and os
// testSupport([
//   {client: 'Chrome'},
// ]);

// function testSupport(supportedDevices:{client?: string; os?: string;}[]) {
//   const deviceDetector = new DeviceDetector();
//   const detectedDevice = deviceDetector.parse(navigator.userAgent);

//   let isSupported = false;
//   for (const device of supportedDevices) {
//     if (device.client !== undefined) {
//       const re = new RegExp(`^${device.client}$`);
//       if (!re.test(detectedDevice.client!.name)) {
//         continue;
//       }
//     }
//     if (device.os !== undefined) {
//       const re = new RegExp(`^${device.os}$`);
//       if (!re.test(detectedDevice.os!.name)) {
//         continue;
//       }
//     }
//     isSupported = true;
//     break;
//   }
//   if (!isSupported) {
//     alert(`This demo, running on ${detectedDevice.client!.name}/${detectedDevice.os!.name}, ` +
//           `is not well supported at this time, continue at your own risk.`);
//   }
// }

// // Our input frames will come from here.
// const videoElement =
//     document.getElementsByClassName('input_video')[0] as HTMLVideoElement;
// const canvasElement =
//     document.getElementsByClassName('output_canvas')[0] as HTMLCanvasElement;
// const controlsElement =
//     document.getElementsByClassName('control-panel')[0] as HTMLDivElement;
// const canvasCtx = canvasElement.getContext('2d')!;

// const config = {locateFile: (file: any) => {
//   return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION }/${file}`;
// }};

// // We'll add this to our control panel later, but we'll save it here so we can
// // call tick() each time the graph runs.
// const fpsControl = new controls.FPS();

// // Optimization: Turn off animated spinner after its hiding animation is done.
// const spinner = document.querySelector('.loading')! as HTMLDivElement;
// spinner.ontransitionend = () => {
//   spinner.style.display = 'none';
// };

// const landmarkContainer = document.getElementsByClassName(
//                               'landmark-grid-container')[0] as HTMLDivElement;
// const grid = new controls3d.LandmarkGrid(landmarkContainer, {
//   connectionColor: 0xCCCCCC,
//   definedColors:
//       [{name: 'Left', value: 0xffa500}, {name: 'Right', value: 0x00ffff}],
//   range: 0.2,
//   fitToGrid: false,
//   labelSuffix: 'm',
//   landmarkSize: 2,
//   numCellsPerAxis: 4,
//   showHidden: false,
//   centered: false,
// });

// function onResults(results: mpHands.Results): void {
//   // Hide the spinner.
//   document.body.classList.add('loaded');

//   // Update the frame rate.
//   fpsControl.tick();

//   // Draw the overlays.
//   canvasCtx.save();
//   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//   canvasCtx.drawImage(
//       results.image, 0, 0, canvasElement.width, canvasElement.height);
//   if (results.multiHandLandmarks && results.multiHandedness) {
//     for (let index = 0; index < results.multiHandLandmarks.length; index++) {
//       const classification = results.multiHandedness[index];
//       const isRightHand = classification.label === 'Right';
//       const landmarks = results.multiHandLandmarks[index];
//       drawingUtils.drawConnectors(
//           canvasCtx, landmarks, mpHands.HAND_CONNECTIONS,
//           {color: isRightHand ? '#00FF00' : '#FF0000'});
//       drawingUtils.drawLandmarks(canvasCtx, landmarks, {
//         color: isRightHand ? '#00FF00' : '#FF0000',
//         fillColor: isRightHand ? '#FF0000' : '#00FF00',
//         radius: (data: drawingUtils.Data) => {
//           return drawingUtils.lerp(data.from!.z!, -0.15, .1, 10, 1);
//         }
//       });
//     }
//   }
//   canvasCtx.restore();

//   if (results.multiHandWorldLandmarks) {
//     // We only get to call updateLandmarks once, so we need to cook the data to
//     // fit. The landmarks just merge, but the connections need to be offset.
//     const landmarks = results.multiHandWorldLandmarks.reduce(
//         (prev: any, current: any) => [...prev, ...current], []);
//     const colors = [];
//     let connections: mpHands.LandmarkConnectionArray = [];
//     for (let loop = 0; loop < results.multiHandWorldLandmarks.length; ++loop) {
//       const offset = loop * mpHands.HAND_CONNECTIONS.length;
//       const offsetConnections =
//           mpHands.HAND_CONNECTIONS.map(
//               (connection: number[]) =>
//                   [connection[0] + offset, connection[1] + offset]) as
//           mpHands.LandmarkConnectionArray;
//       connections = connections.concat(offsetConnections);
//       const classification = results.multiHandedness[loop];
//       colors.push({
//         list: offsetConnections.map((unused: any, i: number) => i + offset),
//         color: classification.label,
//       });
//     }
//     grid.updateLandmarks(landmarks, connections, colors);
//   } else {
//     grid.updateLandmarks([]);
//   }
// }

// const hands = new mpHands.Hands(config);
// hands.onResults(onResults);

// // Present a control panel through which the user can manipulate the solution
// // options.
// new controls
//     .ControlPanel(controlsElement, {
//       selfieMode: true,
//       maxNumHands: 2,
//       modelComplexity: 1,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5
//     })
//     .add([
//       new controls.StaticText({title: 'MediaPipe Hands'}),
//       fpsControl,
//       new controls.Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
//       new controls.SourcePicker({
//         onFrame:
//             async (input: controls.InputImage, size: controls.Rectangle) => {
//               const aspect = size.height / size.width;
//               let width: number, height: number;
//               if (window.innerWidth > window.innerHeight) {
//                 height = window.innerHeight;
//                 width = height / aspect;
//               } else {
//                 width = window.innerWidth;
//                 height = width * aspect;
//               }
//               canvasElement.width = width;
//               canvasElement.height = height;
//               await hands.send({image: input});
//             },
//       }),
//       new controls.Slider({
//         title: 'Max Number of Hands',
//         field: 'maxNumHands',
//         range: [1, 4],
//         step: 1
//       }),
//       new controls.Slider({
//         title: 'Model Complexity',
//         field: 'modelComplexity',
//         discrete: ['Lite', 'Full'],
//       }),
//       new controls.Slider({
//         title: 'Min Detection Confidence',
//         field: 'minDetectionConfidence',
//         range: [0, 1],
//         step: 0.01
//       }),
//       new controls.Slider({
//         title: 'Min Tracking Confidence',
//         field: 'minTrackingConfidence',
//         range: [0, 1],
//         step: 0.01
//       }),
//     ])
//     .on((x: any) => {
//       const options = x as mpHands.Options;
//       videoElement.classList.toggle('selfie', options.selfieMode);
//       hands.setOptions(options);
//     });




}

