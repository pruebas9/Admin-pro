import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../service.index';  // Para tener información del usuario a mano (token)

@Injectable()
export class MedicoService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
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


  // =================================================================================
  // Función para borrar un médico
  // Parámetros: el objeto médico de donde podremos sacar su id
  // =================================================================================
  borrarMedico(id: string) {

    const url = URL_SERVICIO + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url).map((response: any) => {

      swal('Eliminado!', 'El médico ha sido eliminado correctamente', 'success');
      return response.medico;

    });
  }


}
