import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];    // Array para guardar los hospitales y mostrarlos en el select
  medico: Medico = new Medico();  // Instanciamos un médico nuevo para rellenarlo con los datos del formulario

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService
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
  crearMedico(form: NgForm) {

    // Si el formulario no es válido, no hacemos nada
    if (form.invalid) {
      return;
    }

    // Si es válido
    this._medicoService.guardarMedico(this.medico).subscribe( (response: any) => {

        console.log(response);
    });
  }

}
