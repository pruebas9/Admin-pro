import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];     // Guardamos usuarios
  medicos: Medico[] = [];       // Guardamos médicos
  hospitales: Hospital[] = [];  // Guardamos hospitales


  constructor(
    public activatedRoute: ActivatedRoute,  // Para manejar los parámetros
    public http: HttpClient                 // Para las peticiones http
  ) {

    // Cogemos lo que nos viene en los parámetros del input de buscar de header.component
    activatedRoute.params.subscribe( params => {

      const termino = params.termino; // Guardo el término
      this.buscar(termino);           // Llamo a la función y le paso el término

    });

   }

  ngOnInit() {
  }


  // =================================================================================
  // Función para buscar en todas las colecciones por un término
  // Parametros: el término a buscar
  // =================================================================================
  buscar(termino: string) {

    const url = URL_SERVICIO + '/buscar/todo/' + termino; // Construyo la url

    // Hago la petición al método de la API.
    this.http.get(url).subscribe((response: any) => {

      // Guardamos la información que nos viene en el array que corresponda
      this.usuarios = response.usuarios;
      this.medicos = response.medicos;
      this.hospitales = response.hospitales;

    });

  }

}
