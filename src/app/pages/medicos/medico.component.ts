import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

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
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    // Con esto controlamos todos los parámetros que tenemos en la ruta
    activatedRoute.params.subscribe( params => {

      // Vamos a sacar el id del médico de la url
      const id = params['id'];

      // Si lo que venga por parámetro en la url es distinto de 'nuevo' (es decir, que sea la url con el id)
      if (id !== 'nuevo') {

        this.cargarMedico( id ); // Llamo a la función de cargar la información del médico y le paso el id
      }
    });
  }

  ngOnInit() {

    // Para cargar los hospitales y mostrarlos en el select...
    this._hospitalService.listarHospitales().subscribe( (response: any) => {

      this.hospitales = response.hospitales;
    });


    // Nos suscribimos a las notificaciones del servicio del modal para subir imágenes
    this._modalUploadService.notificacion.subscribe( (response: any) => {

      // Seteo en la propiedad médico la imagen que me viene en la respuesta del servicio para actualizarla
      this.medico.img = response.medico.img
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


  // =================================================================================
  // Función para cargar la información de un médico.
  // Parametros: el id del médico
  // =================================================================================
  cargarMedico(id: string) {

    // LLamamos al método del servicio que nos da la información del médico
    this._medicoService.cargarMedico(id).subscribe( (response: any) => {

      // Seteamos la info que nos llega en nuestro objeto médico vacío
      this.medico = response;
      // Como hospital es un objeto y necesitamos sólo el id, seteamos esa propiedad (porque el obj médico viene populado)
      this.medico.hospital = response.hospital._id;

      this.cambiarHospital(this.medico.hospital); // Lanzo la función para que cambie la imagen del hospital

    });

  }


  // =================================================================================
  // Función para cambiar la imagen de un médico (abrirá el modal)
  // Parametros: ninguno
  // =================================================================================
  cambiarImagen() {

    // Llamamos al servicio para abrir el modal
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
