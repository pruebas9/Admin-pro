import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIO } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service'; // Si importo de service.index da error
import { Hospital } from '../../models/hospital.model';


@Injectable()

export class HospitalService {


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
  ) {
    this.listarHospitales();
   }

  // =================================================================================
  // Función para listar hospitales. Paginados
  // Parámetro: valor del número de registro a partir del cual mostrar (5 por página)
  // =================================================================================
  listarHospitales(desde: number = 0) {

    const url = URL_SERVICIO + '/hospital?desde=' + desde;

    return this.http.get(url).map( (response: any) => {

      return {
        hospitales: response.hospitales,
        total: response.total // Guardo el total de registros que vienen
      };

    });
  }

  // =================================================================================
  // Función para buscar un hospital por su id
  // Parámetros: el id del hospital que queremos buscar
  // =================================================================================
  obtenerHospital(id: string) {

    const url = URL_SERVICIO + '/hospital/' + id;

    return this.http.get(url).map( (response: any) => response.hospital);
  }


  // =================================================================================
  // Función para buscar un hospital por su id
  // Parámetros: el id del hospital que queremos buscar
  // =================================================================================
  borrarHospital(hospital: Hospital) {

    const url = URL_SERVICIO + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.delete(url).map( response => {

      swal('Eliminado!', 'El hospital ha sido eliminado correctamente', 'success');
    });

  }


  // =================================================================================
  // Función para buscar un hospital por un término de búsqueda
  // Parámetros: termino para buscar el hospital
  // =================================================================================
  buscarHospital(termino) {

    const url = URL_SERVICIO + '/buscar/coleccion/hospitales/' + termino;

    return this.http.get(url).map((response: any) => response.coleccion);
  }


  // =================================================================================
  // Función para crear un hospital
  // Parámetros: nombre para crear el hospital
  // =================================================================================
  crearHospital(nombre: string) {

    const url = URL_SERVICIO + '/hospital?token=' + this._usuarioService.token;

    // Hago la llamada al método de la API, paso la url y el nombre en forma de objeto (valdría { nombre } también)
    return this.http.post(url, { nombre: nombre }).map((response: any) => response.hospital);
  }


  // =================================================================================
  // Función para acualizar un hospital
  // Parámetros: un objeto hospital de tipo Hospital (importar el modelo)
  // =================================================================================
  actualizarHospital(hospital: Hospital) {

    // Formo la url concatenando además el id y el token
    const url = URL_SERVICIO + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    // Hago la llamada al método de la API, paso la url y el objeto hospital
    return this.http.put(url, hospital).map((response: any) => {

      swal('Actualizadod!', 'El hospital ' + hospital.nombre + ' ha sido actualizado correctamente', 'success');
      return response.hospital;
    });
  }
}



