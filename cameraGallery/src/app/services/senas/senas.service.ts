import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class SenasService {

  constructor( private restService: RestService) {
    
   }

  public crearSena(arreglo : any, nombreSena :string) {
    const url = 'http://localhost:8080/new-signal';
    let token = String(sessionStorage.getItem('token'));
    console.log(token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
    return this.restService.post<any>(url,{
      "name": nombreSena,
      "photos":  arreglo 
    }, {headers: headers});
     
  }
  // // este no se usa
  // public enviarSena(datos: any) {
  //   const url = 'http://localhost:8080/predict-signal';
  //   let token = sessionStorage.getItem('token');
  //   // return this.restService.post<any>(url,{array,nombreSena});
  //   return this.restService.post<any>(url,{
  //     "coordenadas" : datos
  //   }, {'Accept': 'application/json',
  //    'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + token });

  // }

  public getStatusTrainModel (){
    const url = 'http://localhost:8080/train-state';
    let token = sessionStorage.getItem('token');
    return this.restService.get<any>(url, {'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + token });
     //Me envia la lista de las señas que aún no se entrenan de nuestro dataset ,
     // si esta lista esta vacia pues le decimos que paila no puede entrenar,
     // pero si esta llenita que si entrene y le mostramos cuales son las señas nuevas
    }
  

  public trainModel (){
    const url = 'http://localhost:8080/train';
    let token = sessionStorage.getItem('token');
    return this.restService.get<any>(url, {'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + token });
     //solo me envia un mensaje de que se activo el entrenamiento
  }

  public getTimeTrainModel (){
    const url = 'http://localhost:8080/train-info';
    let token = sessionStorage.getItem('token');
    return this.restService.get<any>(url, {'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization':  token });
     //Me envia la estructura de datos como epoch, media per  Epoch et quantitie des epochs este lo llamo cada 5 segundos
     //puedo revisar  training_state para mostrar una alerta segun como se encuentre 
    }





  







}
