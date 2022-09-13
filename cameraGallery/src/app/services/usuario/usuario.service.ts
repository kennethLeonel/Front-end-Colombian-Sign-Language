import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }
}





@Injectable({
  providedIn: 'root'
})
export class TripulanteService {

  constructor(
    private restService: RestService
  ) { }

  // CRUD - CREATE - READ - UPDATE - DELETE

  // ------------------------------------------------------------
  // -------------------------- CREATE --------------------------
  // ------------------------------------------------------------

  // ------------------------------------------------------------
  // ------------------------- OTROS ---------------------------
  // ------------------------------------------------------------

  public setIdTripulanteLogeado(id: number) {
    sessionStorage.setItem('idTripulanteActual', String(id));
  }

  public setRolTripulanteLogeado(rol: string) {
    sessionStorage.setItem('rolTripulanteActual', rol);
  }

  public getIdTripulanteLogeado(): number {
    if (this.isAuth()) {
      return Number(sessionStorage.getItem('idTripulanteActual'));
    }
    else {
      return -1;
    }
  }

  public getRolTripulanteLogeado(): string {
    if (this.isAuth()) {
      return sessionStorage.getItem('rolTripulanteActual')!;
    }
    else {
      return '';
    }
  }

  public cerrarSesion(): void {
    var sesionIniciada = this.isAuth();
    var mensaje = '';

    console.log(sesionIniciada);

    if (sesionIniciada) {
      this.logout().subscribe(
        () => {
          sessionStorage.clear;
          sessionStorage.setItem('Auth', 'false');
          sessionStorage.removeItem('idTripulanteActual');
          sessionStorage.removeItem('rolTripulanteActual');
          mensaje = 'Sesion cerrada correctamente';
        },
        error => mensaje = 'Error'
      );
    }
    else {
      mensaje = 'Error: No hay una sesion abierta';
    }
  }

  public isAuth(): boolean {
    if (sessionStorage.getItem('Auth') != null && sessionStorage.getItem('Auth') === 'true') {
      return true;
    }
    else {
      return false;
    }
  }



  ///////////////////////////////////////
  /////    Autenticación
  ///////////////////////////////////////


  public login(usuario: string, password: string) {
    const formHeaders = new HttpHeaders();
    formHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const formParams = new HttpParams()
      .set('username', usuario)
      .set('password', password);

    return this.restService.post<any>('http://localhost:8080/login', null, {
      headers: formHeaders,
      params: formParams,
      withCredentials: true
    });
  }

  public logout() {
    return this.restService.post('http://localhost:8080/logout', '',
      { withCredentials: true });
  }


}
