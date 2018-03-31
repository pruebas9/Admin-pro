import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {


  // Inyectamos los servicios que vamos a usar, en este caso el SettingsService
  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    // Llamamos a la función para guardar el check
    this.guardarCheck();
  }


  cambiarColor( tema: string, link: any ) {

    this.aplicarCheck( link ); // Ponemos el check

    this._ajustes.aplicarTema( tema ); // Aplicamos el tema seleccionado
  }

  /*########################################################################
   Método para aplicar la clase 'working' y marcar el tema seleccionado
  #########################################################################*/
  aplicarCheck( link: any ) {

    // Recogemos todos los selectores
    const selectores: any = document.getElementsByClassName('selector');
    // Los recorremos y borramos la clase 'working' de todos los selectores
    for ( const ref of selectores ) {
      ref.classList.remove('working');
    }

    // Agregamos la clase 'working' al selector seleccionado
    link.classList.add('working');
  }

  /*########################################################################
   Método para guardar la clase 'working' en el localStorage
  #########################################################################*/
  guardarCheck() {
    // Recogemos todos los selectores
    const selectores: any = document.getElementsByClassName('selector');
    // Guardamos el variable la propiedad tema
    const tema = this._ajustes.ajustes.tema;

    // Recorremos los selectores
    for ( const ref of selectores ) {
      // Comprobamos que el atributo 'data-theme' sea igual al tema seleccionado
      if (ref.getAttribute('data-theme') === tema) {
        // Agregamos la clase 'working' al selector seleccionado
        ref.classList.add('working');
        break; // Salimos del bucle
      }
    }
  }


}
