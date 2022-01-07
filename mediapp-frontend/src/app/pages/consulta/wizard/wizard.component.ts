import { ConsultaService } from './../../../_service/consulta.service';
import { ConsultaListaExamenDTO } from './../../../_dto/consultaListaExamenDTO';
import { Consulta } from './../../../_model/consulta';
import { MatSnackBar, MatStepper } from '@angular/material';
import { DetalleConsulta } from './../../../_model/detalleConsulta';
import { ExamenService } from './../../../_service/examen.service';
import { Examen } from './../../../_model/examen';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from './../../../_service/medico.service';
import { EspecialidadService } from './../../../_service/especialidad.service';
import { PacienteService } from './../../../_service/paciente.service';
import { Especialidad } from './../../../_model/especialidad';
import { Paciente } from './../../../_model/paciente';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  examenes: Examen[] = [];

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  diagnostico: string;
  tratamiento: string;
  mensaje: string;

  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];

  medicoSeleccionado: Medico;
  especialidadSeleccionada: Especialidad;
  pacienteSeleccionado: Paciente;
  examenSeleccionado: Examen;

  consultorios: number[] = [];
  consultorioSeleccionado: number = 0;

  @ViewChild('stepper', {static : true}) stepper : MatStepper;

  constructor(
    private formBuilder : FormBuilder,
    private snackBar : MatSnackBar,
    private pacienteService : PacienteService,
    private especialidadService : EspecialidadService,
    private medicoService: MedicoService,
    private examenService : ExamenService,
    private consultaService : ConsultaService
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      'pacienteSeleccionado': new FormControl(),
      'fecha': new FormControl(new Date()),
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl(''),
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.listarPacientes();
    this.listarExamenes();
    this.listarMedicos();
    this.listarEspecilidad();
    this.listarConsultorios();
  }

  listarConsultorios(){    
    for (let i = 1; i <= 20; i++) {
      this.consultorios.push(i);
    }
  }

  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarEspecilidad() {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    });
  }

  listarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    });
  }

  listarExamenes() {
    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    });
  }

  agregar() {

    if (this.diagnostico != null && this.tratamiento != null) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.mensaje = `Debe agregar un diagnóstico y tramiento`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  agregarExamen() {
    if (this.examenSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        let examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.examenSeleccionado.idExamen) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = `El examen se encuentra en la lista`;
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        this.examenesSeleccionados.push(this.examenSeleccionado);
      }
    } else {
      this.mensaje = `Debe agregar un examen`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }

  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }

  seleccionarMedico(medico: Medico) {
    console.log(medico);
    this.medicoSeleccionado = medico;
  }

  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.value;
  }

  seleccionarEspecialidad(e: any) {
    this.especialidadSeleccionada = e.value;
  }

  seleccionarConsultorio(c: number) {
    this.consultorioSeleccionado = c;
  }

  estadoBotonRegistrar() {    
    return (this.detalleConsulta.length === 0 || this.especialidadSeleccionada === undefined || this.medicoSeleccionado === undefined || this.pacienteSeleccionado === undefined || this.consultorioSeleccionado === 0);
  }

  registrar(){
    let consulta = new Consulta();
    consulta.especialidad = this.especialidadSeleccionada;
    consulta.medico = this.medicoSeleccionado;
    consulta.paciente = this.pacienteSeleccionado;

    /*var tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    consulta.fecha = localISOTime;*/

    consulta.fecha = moment().format('YYYY-MM-DDTHH:mm:ss');
    consulta.detalleConsulta = this.detalleConsulta;
    consulta.numConsultorio = `C${this.consultorioSeleccionado}`;

    let consultaListaExamenDTO = new ConsultaListaExamenDTO();
    consultaListaExamenDTO.consulta = consulta;
    consultaListaExamenDTO.lstExamen = this.examenesSeleccionados;

    this.consultaService.registrar(consultaListaExamenDTO).subscribe( () => {
      this.snackBar.open("Se registró", "Aviso", { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });    
  }

  limpiarControles(){
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.pacienteSeleccionado = undefined;
    this.especialidadSeleccionada = undefined;
    this.medicoSeleccionado = undefined;
    this.examenSeleccionado = undefined;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.consultorioSeleccionado = 0;
    this.mensaje = '';
    this.stepper.reset();
  }

}
