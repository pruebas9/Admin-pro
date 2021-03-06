import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model'; // Modelo de Usuario
import { HttpClient } from '@angular/common/http'; // Para hacer petición http a la API
import { URL_SERVICIO } from '../../config/config'; // Llamo al fichero config de constantes
import { Router } from '@angular/router'; // Para trabajar con redirecciones
import { SubirArchivoService } from '../subir-archivos/subir-archivo.service';


// Imports de los observables
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UsuarioService {

  // Variables para controlar si existe el usuario o el token
  usuario: Usuario;
  token: string;

  menu: any = [];   // Para controlar el menú que verá el usuario

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    // Llamamos a la función que carga el localStorage
    this.cargarStorage();

    // console.log(this.menu);
   }


  // =================================================================================
  // Función para crear un usuario (Registro)
  // =================================================================================
  crearUsuario( usuario: Usuario ) {

    const url = URL_SERVICIO + '/usuario'; // Url de la petición

    // Hacemos la petición a la API para crear el usuario
    return this.http.post(url, usuario)
                .map( (response: any) => {

                  // Si la respuesta es correcta, tengo el usuario, envío una alerta
                  swal('Usuario creado', usuario.email, 'success');
                  return response.usuario;

                })
                .catch (error => {  // Manejo de errores

                  // console.log(error.error.mensaje);
                  swal(error.error.mensaje, error.error.errors.message, 'error');
                  return Observable.throw( error );
                });
  }


  // =================================================================================
  // Función para actualizar usuario
  // =================================================================================
  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIO + '/usuario/' + usuario._id; // Url de la petición con el id del usuario
    url += '?token=' +  this.token; // Concatenamos el token en la url porque la petición lo requiere

    // Hacemos la petición a la API para actualizar el usuario
    return this.http.put(url, usuario)
              .map( (response: any) => {

                // Solo guardo en localStorage si el usuario soy yo mismo
                if (usuario._id === this.usuario._id) {

                  // Guardo en variable local la respuesta de la API (actualizada)
                  const usuarioDB: Usuario = response.usuario;

                  // Guardo la respuesta actualizada en el localStorage
                  this.guardarEnLocalStorage(usuarioDB._id, this.token, usuarioDB, response.menu);
                }


                // Si la respuesta es correcta, tengo el usuario actualizado, envío una alerta
                swal('Usuario actualizado', usuario.nombre, 'success');

                return true;

              })
              .catch (error => {  // Manejo de errores

                // console.log(error.error.mensaje);
                swal(error.error.mensaje, error.error.errors.message, 'error');
                return Observable.throw( error );
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
    return this.http.post(url, usuario)
              .map( (response: any) => {

                this.menu = response.menu; // Guardo el menú del usuario que me viene del backend

                // Guardamos en el localStorage los datos del usuario que nos response la API
                this.guardarEnLocalStorage( response.id, response.token, response.usuario, response.menu);

                return true;
              })
              .catch (error => {  // Manejo de errores

                // console.log(error.error.mensaje);
                swal('Error en el login', error.error.mensaje, 'error');
                return Observable.throw( error );
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
      this.guardarEnLocalStorage( response.id, response.token, response.usuario, response.menu);

      return true; // Retornamos un true si todo sale bien
    });
  }


  // =================================================================================
  // Función para guardar datos del usuario en localStorage
  // =================================================================================
  guardarEnLocalStorage(id: string, token: string, usuario: Usuario, menu: any) {

    // Guardamos en el localStorage
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario)); // Parseamos el objeto a JSON válido
    localStorage.setItem('menu', JSON.stringify(menu)); // Parseamos el objeto a JSON válido

    // Seteamos los valores usuario, token y menú en las propiedades
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
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
      this.menu = JSON.parse(localStorage.getItem('menu'));       // Parseamos a objeto

    } else {  // Si no existe el token destruimos las propiedades

      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  // =================================================================================
  // Función para saber si el usuario está logueado
  // =================================================================================
  estaLogueado() {

    return (this.token.length > 5) ? true : false; // Si hay token (mayor de 5 caracteres) devuelvo true
  }

  // =================================================================================
  // Función para el logout
  // =================================================================================
  logout() {

    // Reseteamos las propiedades token y usuario
    this.token = null;
    this.usuario = null;

    // Vaciamos token, ususario y menú del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']); // Redireccionamos al login
  }


  // =================================================================================
  // Función para cambiar imágenes en el formulario de perfil (preview de la imagen)
  // Parametros: archivo en cuestión, el id del usuario
  // =================================================================================
  cambiarImagen( archivo: File, id: string) {

    // Llamamos al método subirArchivo del servicio subir-archivo.service
    // Como retorna una Promise, hacemos un then y un catch para controlar los errores
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
            .then((response: any) => {
              // Seteamos en la propiedad img del usuario lo que viene en la respuesta
              this.usuario.img = response.usuario.img;

              // Guardamos en el localStorage y mostramos sweetAlert
              this.guardarEnLocalStorage(id, this.token, this.usuario, this.menu);
              swal('Imagen actualizada', this.usuario.nombre, 'success');
            })
            .catch( response => {
              console.log(response);
            });
  }


  // =================================================================================
  // Función para cargar y listar los usuarios paginados
  // Parametros: desde: number, para saber desde qué registro voy a mostrar, por defecto será 0. (Paginación)
  // =================================================================================
  cargarUsuarios(desde: number = 0) {

    const url = URL_SERVICIO + '/usuario?desde=' + desde; // Url para la petición

    // Hago la petición al método de la API
    return this.http.get(url);

  }

  // =================================================================================
  // Función para hacer la petición al método de búsqueda de usuarios de la API
  // Parametros: termino a buscar (string)
  // =================================================================================
  buscarUsuarios (termino: string) {

    const url = URL_SERVICIO + '/buscar/coleccion/usuarios/' + termino; // Url para la petición

    // Hago la petición al método de la API
    return this.http.get(url).map((response: any) => response.coleccion); // Envío la respuesta con el array que me devuelve la API

  }

  // =================================================================================
  // Función para hacer la petición al método de borrar usuarios de la API
  // Parametros: el id del usuario a borrar
  // =================================================================================
  borrarUsuario (id: string) {

    const url = URL_SERVICIO + '/usuario/' + id + '?token=' + this.token; // Url para la petición

    // Hago la petición al método de la API
    return this.http.delete(url).map( response => {

      swal('Eliminado!', 'El usuario ha sido eliminado correctamente', 'success');
      return true;
    });

  }


  // =================================================================================
  // Función para renovar el token del usuario
  // Parámetros: ninguno
  // =================================================================================
  renuevaToken() {

    const url = URL_SERVICIO + '/login/renuevatoken?token=' + this.token; // Generamos la url


    // Llamamos al método de la API para renovar el token
    return this.http.get(url)
              .map ( (response: any) => {

                // Actualizamos el token por el que nos viene
                this.token = response.token;

                // Guardo el token en el localStorage
                localStorage.setItem('token', this.token);
                console.log('Token renovado');

                return true; // Retornamos que todo ha salido bien
              })
              .catch (error => {  // Manejo de errores

                // console.log(error.error.mensaje);
                swal('No se pudo renovar el token', 'No fue posible renovar el token', 'error');

                // Sacamos al usuario fuera y lo redirigimos al login
                this.router.navigate(['/login']);

                return Observable.throw( error );
              });
  }

}

