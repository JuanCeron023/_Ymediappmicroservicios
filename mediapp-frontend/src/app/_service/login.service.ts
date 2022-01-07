import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //url: string = `${environment.HOST}/oauth/token`
  url: string = `${environment.HOST}/uaa/oauth/token`

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(usuario: string, contrasena: string) {
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }

  cerrarSesion() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    this.http.get(`${environment.HOST}/uaa/tokens/anular/${token}`).subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    });
  }

  estaLogeado() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  enviarCorreo(correo: string) {
    return this.http.post<number>(`${environment.HOST}/${environment.MICRO_CR}/login/enviarCorreo`, correo, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }

  verificarTokenReset(token: string) {  
    return this.http.get<number>(`${environment.HOST}/${environment.MICRO_CR}/login/restablecer/verificar/${token}`);
  }

  restablecer(token: string, clave: string) {
    return this.http.post<number>(`${environment.HOST}/${environment.MICRO_CR}/login/restablecer/${token}`, clave, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }
}
