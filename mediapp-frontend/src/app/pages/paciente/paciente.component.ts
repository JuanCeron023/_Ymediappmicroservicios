import { Paciente } from './../../_model/paciente';
import { PacienteService } from './../../_service/paciente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  cantidad: number = 0;
  dataSource: MatTableDataSource<Paciente>;
  displayedColumns = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //Cuando trabajar pageable no es necesario el MatPaginator con ViewChield

  constructor(private pacienteService : PacienteService, private snack : MatSnackBar) { }

  ngOnInit() {
    this.pacienteService.pacienteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.pacienteService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

    /*this.pacienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });*/

    this.pacienteService.listarPageable(0, 10).subscribe(data => {
      //console.log(data);
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idPaciente: number) {
    this.pacienteService.eliminar(idPaciente).subscribe(() => {
      this.pacienteService.listar().subscribe(data => {
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('SE ELIMINO');

      });
    });
  }

  mostrarMas(e: any){
    this.pacienteService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data);
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
    });
  }

}
