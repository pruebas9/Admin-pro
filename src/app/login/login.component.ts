import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

// Llamamos a la función que hemos creado dentro de /assets/js/custom.js
// para que se inicialicen los plugins externos
declare function init_plugins();
declare const gapi: any; // importamos la librería 'gapi'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false; // Damos un valor por defecto a la variable
  auth2: any; // Más info: https://developers.google.com/identity/sign-in/web/listeners

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
   ) { }

  ngOnInit() {

    init_plugins();
    this.googleInit(); // llamamos a la función que controla el signIn de Google

    // Recogemos el valor del email del localStorage, si lo hay, si no existe ponemos una cadena vacía.
    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recuerdame = true; // Si el email tiene algo, ponemos el check a true
    }
  }

  // =================================================================================
  // Función para el login normal
  // =================================================================================
  ingresar(formLogin: NgForm) {

    if (!formLogin.valid) {
      return;
    }

    // Creo objeto usuario y mando en el constructor los valores que vienen del formulario (el nombre no lo sé, será null)
    const usuario = new Usuario( null, formLogin.value.email, formLogin.value.password);

    // Llamamos al servicio para hacer la petición a la API y hacer el login
    this._usuarioService.login(usuario, formLogin.value.recuerdame).subscribe(response => {

      // Si el método de la API nos retorna un 'true', redireccionamos al dashboard
      this.router.navigate(['/dashboard']);
    });
  }


  // =================================================================================
  // Función para el Sign In de Google
  // =================================================================================
  googleInit() {

    // Sacado de aquí: https://developers.google.com/identity/sign-in/web/listeners
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:  '811317691209-kk44sgbvmg7gkbd52llq6s0ahhb5gk57.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      // Llamamos a la función que controla el clic en el botón de sign In de Google
      this.pulsarSignIn( document.getElementById('btn-google')); // Pasamos el id del elemento html donde hacemos clic
    });
  }

  // =================================================================================
  // Función para controlar el clic el botón de sign in de Google. Pasamos elementoHtml (que es el botón donde haremos clic)
  // =================================================================================
  pulsarSignIn( elementoHtml) {

    this.auth2.attachClickHandler( elementoHtml, {}, (googleUser)  => {

      // const profile = googleUser.getBasicProfile(); // Obtenemos el perfil de la cuenta de Google
      const token = googleUser.getAuthResponse().id_token; // Obtenemos el token para poder trabajar con él

      // Llamamos al método del servicio UsuarioService que hace la petición a la API y le pasamos el token
      this._usuarioService.loginGoogle(token).subscribe( () => {
        // La API nos retorna los datos del usuario y un token nuestro interno de nuestra aplicación
        // console.log(token);
        window.location.href = '#/dashboard'; // Redireccionamos 'a mano' al dashboard por problemas con el router.navigate
      });

    });

  }
}
