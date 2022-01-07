import { ConsultaService } from './../../../_service/consulta.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConsultaListaExamenDTO } from './../../../_dto/consultaListaExamenDTO';
import { Consulta } from './../../../_model/consulta';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialogo-component',
  templateUrl: './dialogo-component.component.html',
  styleUrls: ['./dialogo-component.component.css']
})
export class DialogoComponentComponent implements OnInit {

  consulta: Consulta;
  examenes: ConsultaListaExamenDTO[];

  constructor(private dialogRef: MatDialogRef<DialogoComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consulta, private consultaService : ConsultaService) { }

  ngOnInit() {
    this.consulta = this.data;
    this.listarExamenes();
  }

  listarExamenes(){
    this.consultaService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe(data => {
      this.examenes = data;
    });
  }

  cancelar(){
    this.dialogRef.close();
  }

}
