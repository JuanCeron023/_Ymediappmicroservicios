import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Examen } from './../_model/examen';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
 
  examenCambio = new Subject<Examen[]>();
  mensajeCambio = new Subject<string>();

  //url: string = `${environment.HOST}/examenes`;
  url: string = `${environment.HOST}/${environment.MICRO_CRUD}/examenes`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Examen[]>(this.url);
  }

  listarPorId(idExamen: number) {
    return this.http.get<Examen>(`${this.url}/${idExamen}`);
  }

  registrar(examen: Examen) {
    return this.http.post(this.url, examen);
  }

  modificar(examen: Examen) {
    return this.http.put(this.url, examen);
  }

  eliminar(idExamen: number) {
    return this.http.delete(`${this.url}/${idExamen}`);
  }
}
