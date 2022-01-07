import { Menu } from './../_model/menu';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCambio = new Subject<Menu[]>();

  //url: string = `${environment.HOST}/menus`;
  url: string = `${environment.HOST}/${environment.MICRO_CR}/menus`;

  constructor(private http: HttpClient) { }

  listar(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.get<Menu[]>(`${this.url}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorUsuario(nombre: string){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);    
    return this.http.post<Menu[]>(`${this.url}/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
