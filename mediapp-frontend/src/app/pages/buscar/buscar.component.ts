import { DialogoComponentComponent } from './dialogo-component/dialogo-component.component';
import { ConsultaService } from './../../_service/consulta.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Consulta } from './../../_model/consulta';
import { FiltroConsultaDTO } from './../../_dto/filtroConsultaDTO';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  maxFecha: Date = new Date();
  displayedColumns = ['paciente', 'medico', 'especialidad', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Consulta>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private consultaService : ConsultaService,
    private dialog : MatDialog
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'dni' : new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta' : new FormControl()
    });
  }

  buscar(){
    let filtro = new FiltroConsultaDTO(this.form.value['dni'], this.form.value['nombreCompleto'], this.form.value['fechaConsulta']);

    /*
      {
        dni : xxxxxx
        nombreCompleto: xxxxx
        fecha: xxxxxxx
      }
    */

    if(filtro.fechaConsulta){
      delete filtro.dni;
      delete filtro.nombreCompleto;

      this.consultaService.buscar(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }else{
      delete filtro.fechaConsulta;

      if(filtro.dni.length === 0){
        delete filtro.dni;
      }

      if (filtro.nombreCompleto.length === 0) {
        delete filtro.nombreCompleto
      }

      this.consultaService.buscar(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }

  }

  verDetalle(consulta : Consulta){
    this.dialog.open(DialogoComponentComponent, {
      data : consulta
    });
  }

}
