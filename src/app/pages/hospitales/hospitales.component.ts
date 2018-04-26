import { Component, OnInit } from '@angular/core';
import { HospitalService, UsuarioService } from '../../services/service.index';
import { URL_SERVICIO } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any; // Para evitar los posibles errores de sweetAlert

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = []; // Array vacío de tipo Hospital para guardar los hospitales
  totalRegistros: number = 0;
  desde: number = 0;
  cargando: boolean = false; // Controla el loading...


  constructor(
    public _hospitalService: HospitalService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService

  ) { }

  ngOnInit() {

    this.listarHospitales(); // Ejecutamos nada más cargar el componente

    // Para trabajar con los modales debemos suscribirnos a la notificación (EventEmitter)
    // En el momento en el que la notificación emita algo... listamos los hospitales
    this._modalUploadService.notificacion.subscribe( () => this.listarHospitales());

  }


  // =================================================================================
  // Función para listar todos los hospitales (paginados)
  // Parametros: ninguno
  // =================================================================================
  listarHospitales() {

    this._hospitalService.listarHospitales(this.desde).subscribe( (response: any) => {

      this.totalRegistros = response.total;
      this.hospitales = response.hospitales;

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
    this.listarHospitales();
  }


  // =================================================================================
  // Función para actualizar un hospital por su id
  // Parametros: id para actualizar el hospital
  // =================================================================================
  actualizarHospital(hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital).subscribe( (response: any) => {

          // Llamamos a la función que lista los usuarios de nuevo
          this.listarHospitales();

          // TODO: hacer que al eliminar el hospital vuelva a la página 1
    });
  }



  // =================================================================================
  // Función para borrar un hospital por su id
  // Parametros: el objeto hospital de donde sacaremos su id
  // =================================================================================
  borrarHospital(hospital: Hospital) {

    // Pop up de confirmación para eliminar el usuario
    swal({
      title: 'Está seguro?',
      text: 'Está a punto de eliminar el hospital',
      icon: 'warning',
      dangerMode: true,
    })
    .then(borrar => {

      // Si recibo un true llamo al método del servicio hospital que hace petición a la API para borrar
      if (borrar) {
        this._hospitalService.borrarHospital(hospital).subscribe( (response: any) => {

          // Llamamos a la función que lista los usuarios de nuevo
          this.listarHospitales();

          // TODO: hacer que al eliminar el hospital vuelva a la página 1

        });
      }
    });
  }


  // =================================================================================
  // Función para crear un hospital
  // Parametros: No recibe parámetros porque se introduce el valor en el input del sweetAlert
  // =================================================================================
  crearHospital() {

    swal({
      title: 'Crear hospital',
      text: 'Ingresos el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then( (valor: string) => {

      // Si no hay valor o está vacío
      if (!valor || valor.length <= 0) {
        return;
      }

      this._hospitalService.crearHospital(valor).subscribe((response: any) => {
        this.listarHospitales(); // No me importa la respuesta, listo los hospitales
      });
    });
  }


  // =================================================================================
  // Función para buscar un hospital por un término de búsqueda
  // Parametros: término de búsqueda para el hospital
  // =================================================================================
  buscarHospital(termino: string) {

    // Si la longitud del término menor o igual a 0 (no haya término)
    if (termino.length <= 0) {
      this.listarHospitales(); // Mostramos todos los usuarios
      return;
    }

    this.cargando = true; // Mostramos cargando...

    // Llamamos al método del servicio. En el subscribe recibimos un array de usuarios
    this._hospitalService.buscarHospital(termino).subscribe( (response: any) => {

      // Seteamos la propiedad con los valores que nos vienen en el array
      this.hospitales = response;

      this.cargando = false; // Quitamos el cargando...

    });
  }


  // =================================================================================
  // Función para actualizar (o subir) la imagen de un hospital
  // Parametros: el objeto hospital
  // =================================================================================
  actualizarImagen(hospital: Hospital) {

    // Llamo al método del servicio del modal. Debemos suscribirnos a la notificación (en el ngOnInit)
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }
}
