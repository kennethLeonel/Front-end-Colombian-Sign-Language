import { Injectable } from '@angular/core';
// // import { Observable, Subject } from 'rxjs';
// import { map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

// export interface Message {
//   user: string;
//   messageContent: string;
// }




@Injectable({
  providedIn: 'root'
})
export class EnviarCordenadasService {


  private myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:8080/ws');


  public socketConectado(dato: any): void {
    //Enviar al servidor
    this.myWebSocket.next(dato);
  }

  public getmessages(functi: any) {
    // var mensaje :any | undefined;
    return this.myWebSocket.subscribe(
      msg => functi(msg, this.myWebSocket),
      // Llamado cada vez que hay un mensaje del servidor     
      err => console.log(err),
      // Llamado si la API de WebSocket señala algún tipo of error     
      () => console.log('complete')
      // Llamado cuando la conexión está cerrada (por cualquier motivo)   
    );

  }



  // object.error({ code: 4000, reason: 'I think our app just broke!' });


}







