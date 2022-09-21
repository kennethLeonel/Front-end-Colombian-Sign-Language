// import { Injectable } from '@angular/core';
// import * as Rj from 'rxjs';
// import { AnonymousSubject } from 'rxjs/internal/Subject';

// @Injectable({
//   providedIn: 'root'
// })

// export class WebSocketSubjectService {
//   constructor() {}
  
//   private subject?: Rj.Subject<MessageEvent>;

//   public connect(url:any): Rj.Subject<MessageEvent> {
//     if (!this.subject) {
//       this.subject = this.create(url);
//       console.log('Successfully connected To: ' + url);
//     }
//     return this.subject;
//   }

//   private create(url:any): Rj.Subject<MessageEvent> {
//     let wsc = new WebSocket(url);

//     let observable = Rj.Observable.create((obs: Rj.Observer<MessageEvent>) => {

//       wsc.onmessage = obs.next.bind(obs);
//       wsc.onerror = obs.error.bind(obs);
//       wsc.onclose = obs.complete.bind(obs);
      

//       return wsc.close.bind(wsc);
//       // return true;
//     });

//     let observer = {
     
//       next: (data: string) => {
//         if (wsc.readyState === WebSocket.OPEN) {
//          console.log(observable);
//           wsc.send(JSON.stringify("dataKenneth"));
//         }
//       },
//     };
//     return Rj.Subject.create(observer, observable);
//   }
// }
