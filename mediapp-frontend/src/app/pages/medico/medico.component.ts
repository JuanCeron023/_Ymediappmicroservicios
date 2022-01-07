import { switchMap } from 'rxjs/operators';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';
import { Medico } from './../../_model/medico';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { MedicoService } from './../../_service/medico.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  displayedColumns = ['idmedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  dataSource: MatTableDataSource<Medico>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private medicoService : MedicoService, private dialog : MatDialog, private snack: MatSnackBar) { }

  ngOnInit() {
    this.medicoService.medicoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.medicoService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.medicoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  filtrar(valor : string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(medico? : Medico){
    let med = medico != null ? medico : new Medico();
    this.dialog.open(MedicoDialogoComponent, {
      width: '250px',
      data: med
    });
  }

  eliminar(medico : Medico){
    this.medicoService.eliminar(medico.idMedico).pipe(switchMap( () => {
      return this.medicoService.listar();
    })).subscribe(data => {
      this.medicoService.medicoCambio.next(data);
      this.medicoService.mensajeCambio.next('SE ELIMINO');
    });
  }

}
