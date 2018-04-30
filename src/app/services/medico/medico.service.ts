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


  // =================================================================================
  // Función para guardar un médico. Vale para crear y para actualizar
  // Parámetros: el objeto médico de donde podremos sacar sus datos
  // =================================================================================
  guardarMedico(medico: Medico) {

    let url = URL_SERVICIO + '/medico/'; // La url base para las 2 peticiones (put y post)

    // Para diferenciar la creación de la actualización comprobamos si existe el id del médico
    if (medico._id) {

      // Actualizamos el médico:
      url += medico._id + '?token=' + this._usuarioService.token; // Construimos la url correcta para la petición

      return this.http.put(url, medico).map((response: any) => {

        swal('Médico actualizado!', 'El médico ' + response.medico.nombre + ' se ha actualizado correctamente', 'success');
        return response.medico;

      });

    } else {

      // Creamos el médico:
      url += '?token=' + this._usuarioService.token; // Construimos la url correcta para la petición

      return this.http.post(url, medico).map((response: any) => {

        swal('Médico creado!', 'El médico ' + response.medico.nombre + ' se ha creado correctamente', 'success');
        return response.medico;

      });
    }



  }

  // =================================================================================
  // Función para cargar un médico y ver su información para, por ejemplo, el update.
  // Parámetros: el id de ese médico que queremos cargar
  // =================================================================================
  cargarMedico(id: string) {

    const url = URL_SERVICIO + '/medico/' + id;

    // Llamo al método de la API
    return this.http.get(url).map((response: any) => {

      return response.medico;

    });

  }


}
