import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {


  // Definimos propiedad para los ajustes de tipo de la interfaz definida
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  // Injectamos el Documento para tener acceso a todo el DOM
  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes(); // Cargamos ajustes nada más cargar la clase
  }

    // Guardamos los ajustes en el localStorage
    guardarAjustes() {
      // console.log('Guardado en el localStorage');
      localStorage.setItem('ajustes', JSON.stringify(this.ajustes)); // parseamos a JSON string
    }

    // Sacamos los ajustes del localStorage
    cargarAjustes() {

      // Comprobamos que haya algo en el localStorage
      if (localStorage.getItem('ajustes')) {
        this.ajustes = JSON.parse(localStorage.getItem('ajustes')); // parseamos
        // console.log('Cargando del localStorage: ', this.ajustes.tema);

        this.aplicarTema(this.ajustes.tema); // Aplicamos el tema
      } else {
        // console.log('Usando valores por defecto: ', this.ajustes.tema);
        this.aplicarTema(this.ajustes.tema); // Aplicamos el tema por defecto
      }
    }

    aplicarTema( tema: string ) {
      // Variable con la url del index.html con la importación del tema
      const url: string = `assets/css/colors/${ tema }.css`;
      // Seteamos el atributo en el index con la url con el tema elegido
      this._document.getElementById('tema').setAttribute('href', url);

      this.ajustes.tema = tema; // Guardamos en la propiedad
      this.ajustes.temaUrl = url; // Guardamos en la propiedad

      this.guardarAjustes(); // Guardamos en el localStorage
    }


}

// Definimos una interfaz con unas propiedades
interface Ajustes {
  temaUrl: string;
  tema: string;
}
