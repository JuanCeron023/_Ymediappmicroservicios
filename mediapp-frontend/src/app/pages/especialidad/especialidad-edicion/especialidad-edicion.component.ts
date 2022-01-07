import { ActivatedRoute, Router, Params } from '@angular/router';
import { EspecialidadService } from './../../../_service/especialidad.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Especialidad } from './../../../_model/especialidad';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  id: number;
  especialidad: Especialidad;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private especialidadService: EspecialidadService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.especialidad = new Especialidad();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.especialidadService.listarPorId(this.id).subscribe(data => {
        let id = data.idEspecialidad;
        let nombre = data.nombre;
        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre)
        });
      });
    }
  }

  operar() {
    this.especialidad.idEspecialidad = this.form.value['id'];
    this.especialidad.nombre = this.form.value['nombre'];

    if (this.especialidad != null && this.especialidad.idEspecialidad > 0) {
      //BUENA PRACTICA
      this.especialidadService.modificar(this.especialidad).pipe(switchMap(() => {
        return this.especialidadService.listar();
      })).subscribe(data => {
        this.especialidadService.especialidadCambio.next(data);
        this.especialidadService.mensajeCambio.next("Se modificó");
      });

    } else {
      //PRACTICA COMUIN
      this.especialidadService.registrar(this.especialidad).subscribe(data => {
        this.especialidadService.listar().subscribe(especialidad => {
          this.especialidadService.especialidadCambio.next(especialidad);
          this.especialidadService.mensajeCambio.next("Se registró");
        });
      });
    }

    this.router.navigate(['especialidad']);
  }

}
