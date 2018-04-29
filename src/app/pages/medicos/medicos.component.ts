import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];       // Array de médicos
  desde: number = 0;            // Para controlar la paginación
  totalRegistros: number = 0;
  cargando: boolean = false;    // Controla el loading


  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {

    this.cargarMedicos(); // A la carga del componente cargamos los médicos
  }


  // =================================================================================
  // Función para cargar la lista de todos los médicos (paginados)
  // Parametros: ninguno
  // =================================================================================
  cargarMedicos() {

    this._medicoService.listarMedicos(this.desde).subscribe((response: any) => {

      this.totalRegistros = response.total;
      this.medicos = response.medicos;

      console.log(response);

    });
  }

  // =================================================================================
  // Función para modificar el parámetro que controla la paginación
  // Parametros: valor que aumentará la paginación
  // =================================================================================
  cambiarDesde(valor: number) {

    const nuevoDesde = this.desde + valor; // Cogemos el valor de nuestro registro y sumanos lo que nos viene

    // Controlo que el 'desde' no sea mayor que el total de registros
    if (nuevoDesde >= this.totalRegistros) {
      return;
    }

    // Controlo que el 'desde' no sea menor que 0
    if (nuevoDesde < 0) {
      return;
    }

    this.desde += valor; // Incremento por el valor que venga

    // Llamo a la función para que arroje más registros
    this.cargarMedicos();
  }


  // =================================================================================
  // Función para buscar un médico por un término de búsqueda
  // Parametros: término de búsqueda para el médico
  // =================================================================================
  buscarHospital(termino: string) {

    // Si la longitud del término menor o igual a 0 (no haya término)
    if (termino.length <= 0) {
      this.cargarMedicos(); // Mostramos todos los usuarios
      return;
    }

    this.cargando = true; // Mostramos cargando...

    // Llamamos al método del servicio. En el subscribe recibimos un array de usuarios
    this._medicoService.buscarMedico(termino).subscribe( (response: any) => {

      // Seteamos la propiedad con los valores que nos vienen en el array
      this.medicos = response;

      this.cargando = false; // Quitamos el cargando...

    });
  }


  // =================================================================================
  // Función para buscar un médico por un término de búsqueda
  // Parametros: término de búsqueda para el médico
  // =================================================================================
  borrarMedico(medico: Medico) {

    // Llamamos al método del servicio. En el subscribe recibimos un array de usuarios
    this._medicoService.borrarMedico(medico._id).subscribe( (response: any) => {

      this.cargarMedicos(); // Cargamos los médicos después del borrado

    });
  }

}
