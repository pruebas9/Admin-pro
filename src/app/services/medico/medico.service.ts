import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';

@Injectable()
export class MedicoService {

  constructor(
    public http: HttpClient
  ) { }


  // =================================================================================
  // Función para listar todos los hospitales (paginados)
  // Parametros: desde, es el valor desde el registro que va a mostrar
  // =================================================================================
  listarMedicos(desde: number = 0) {

    const url = URL_SERVICIO + '/medico?desde=' + desde;

    return this.http.get(url).map( (response: any) => {

      return response;

      // return {
      //   medicos: response.medicos,
      //   total: response.total // Guardo el total de registros que vienen
      // };

    });
  }


  // =================================================================================
  // Función para buscar un médico por un término de búsqueda
  // Parámetros: termino para buscar el médico
  // =================================================================================
  buscarMedico(termino) {

    const url = URL_SERVICIO + '/buscar/coleccion/medicos/' + termino;

    return this.http.get(url).map((response: any) => response.coleccion);
  }


}
