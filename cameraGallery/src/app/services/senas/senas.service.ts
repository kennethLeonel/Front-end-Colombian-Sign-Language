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

    // return this.restService.post<any>(url,{array,nombreSena});
    return this.restService.post<any>(url,{
      "name": nombreSena,
      "photos":  arreglo 
     
    }, {'Accept': 'application/json', 'Content-Type': 'application/json'});
  }

  







}
