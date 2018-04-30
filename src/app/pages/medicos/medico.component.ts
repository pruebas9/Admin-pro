import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];                      // Array para guardar los hospitales y mostrarlos en el select
  medico: Medico = new Medico('', '', '', '', '');  // Instanciamos un médico nuevo para rellenarlo con los datos del formulario
  hospital: Hospital = new Hospital('');            // Creamos un hospital para mostrar los datos del hospital


  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router
  ) { }

  ngOnInit() {

    // Para cargar los hospitales y mostrarlos en el select...
    this._hospitalService.listarHospitales().subscribe( (response: any) => {

      this.hospitales = response.hospitales;
    });
  }


  // =================================================================================
  // Función para crear un médico en el onSubmit del formulario
  // Parametros: pasamos el formulario entero para validarlo y extraer los datos
  // =================================================================================
  guardarMedico(form: NgForm) {

    // Si el formulario no es válido, no hacemos nada
    if (form.invalid) {
      return;
    }

    // Si es válido
    this._medicoService.guardarMedico(this.medico).subscribe( (response: any) => {

      // Seteamos la info que nos viene en nuestra propiedad (nos viene directamente el médico en la response)
      this.medico = response;

      // Redireccionamos a la página de editar médico
      this.router.navigate(['/medico', response._id]); // La response ya es el objeto médico

    });

  }

  // =================================================================================
  // Función para controlar el cambio en el select de hospitales y mostrar los datos de ese hospital
  // Parametros: el id sacado del propio evento change con 'target.value'
  // =================================================================================
  cambiarHospital(id: string) {

    // LLamamos al método del servicio que nos da la información de un hospital por su id
    this._hospitalService.obtenerHospital(id).subscribe( (response: any) => {

      // Seteamos la info que nos llega en nuestro objeto hospital vacío
      this.hospital = response;

    });

  }

}
