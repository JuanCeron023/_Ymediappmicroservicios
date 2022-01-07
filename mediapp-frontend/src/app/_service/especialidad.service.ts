import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Especialidad } from './../_model/especialidad';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidadCambio = new Subject<Especialidad[]>();
  mensajeCambio = new Subject<string>();

  //url: string = `${environment.HOST}/especialidades`;
  url: string = `${environment.HOST}/${environment.MICRO_CRUD}/especialidades`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Especialidad[]>(this.url);
  }

  listarPorId(idEspecialidad: number) {
    return this.http.get<Especialidad>(`${this.url}/${idEspecialidad}`);
  }

  registrar(especialidad: Especialidad) {
    return this.http.post(this.url, especialidad);
  }

  modificar(especialidad: Especialidad) {
    return this.http.put(this.url, especialidad);
  }

  eliminar(idEspecialidad: number) {
    return this.http.delete(`${this.url}/${idEspecialidad}`);
  }
}
