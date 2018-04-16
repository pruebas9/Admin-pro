import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model'; // Modelo de Usuario
import { HttpClient } from '@angular/common/http'; // Para hacer petición http a la API
import { URL_SERVICIO } from '../../config/config'; // Llamo al fichero config de constantes

// Imports de los observables
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  // Variables para controlar si existe el usuario o el token
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient
  ) {
    // Llamamos a la función que carga el localStorage
    this.cargarStorage();
   }


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
  // Función para iniciar sesión con un usuario (Login normal) 
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

      // Guardamos en el localStorage los datos del usuario que nos response la API
      this.guardarEnLocalStorage( response.id, response.token, response.usuario);

      return true;
    });
  }


  // =================================================================================
  // Función para el Login de Google (pasamos el token)
  // =================================================================================
  loginGoogle(token: string) {

    const url = URL_SERVICIO + '/login/google'; // Url para la petición

    // Llamamos al método de la API para el login de Google. Pasamos el token como un objeto
    return this.http.post(url, { token: token } ).map((response: any) => {

      // Guardamos en el localStorage los datos del usuario
      this.guardarEnLocalStorage( response.id, response.token, response.usuario);

      return true; // Retornamos un true si todo sale bien
    });
  }


  // =================================================================================
  // Función para guardar datos del usuario en localStorage
  // =================================================================================
  guardarEnLocalStorage(id: string, token: string, usuario: Usuario) {

    // Guardamos en el localStorage
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario)); // Parseamos el objeto a JSON válido

    // Seteamos los valores usuario y token en las propiedades
    this.usuario = usuario;
    this.token = token;
  }

  // =================================================================================
  // Función para cargar el localStorage e inicializar el token y el usuario (si existen)
  // =================================================================================
  cargarStorage() {

    // Si existe el token en el localStorage
    if (localStorage.getItem('token')) {

      // Inicializamos las variables con el valor del localStorage para que nunca sean undefined
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario')); // Parseamos a objeto
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  // =================================================================================
  // Función para saber si el usuario está logueado
  // =================================================================================
  estaLogueado() {

    return (this.token.length > 5) ? true : false; // Si hay token (mayor de 5 caracteres) devuelvo true
  }
}

