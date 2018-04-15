import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http'; // Para hacer petición http a la API
import { URL_SERVICIO } from '../../config/config'; // Llamo al fichero config de constantes

// Imports de los observables
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) { }


  // =================================================================================
  // Función para crear un usuario (Registro)
  // =================================================================================
  crearUsuario( usuario: Usuario ) {

    const url = URL_SERVICIO + '/usuario'; // Url de la petición

    // Hacemos la petición a la API para crear el usuario
    return this.http.post(url, usuario).map( (response: any) => {


      // Si la respuesta es correcta, tengo el usuario, envío una alerta
      swal('Usuario creado', usuario.email, 'success');
      return response.usuario;

    });
  }


  // =================================================================================
  // Función para iniciar sesión con un usuario (Login)
  // =================================================================================
  login(usuario: Usuario, recuerdame: boolean = false) {

    // Si recuérdame viene a true (se ha marcado el checkbox)
    if (recuerdame) {
      localStorage.setItem('email', usuario.email); // Guardamos el email en el localStorage
    } else {
      localStorage.removeItem('email'); // Eliminamos el email del localStorage
    }

    const url = URL_SERVICIO + '/login'; // Url para la petición

    // Hacemos la petición a la API para hacer el login y guardamos la respuesta en el LocalStorage
    return this.http.post(url, usuario).map( (response: any) => {

      // Guardamos en el localStorage
      localStorage.setItem('id', response.id);
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario', JSON.stringify(response.usuario)); // Parseamos el objeto a JSON válido

      return true;
    });
  }

}

