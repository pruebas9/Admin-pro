import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model'; // Cargamos el modelo de Usuario
import { UsuarioService } from '../../services/service.index';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})

export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = []; // Variable array para guardar usuarios y listarlos
  desde: number = 0; // Variable para controlar la paginación (mostrar desde)
  totalRegistros: number = 0; // Para la paginación, controla el total de registros arrojados desde la API

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    // Llamo a la función al cargar todo
    this.cargarUsuarios();
  }


  // =================================================================================
  // Función para hacer la llamada al método del servicio (del mismo nombre) que hace la llamada a la API
  // Parametros: ninguno
  // =================================================================================
  cargarUsuarios() {

    // Llamo a la función que hace la petición a la API para listar los usuarios
    this._usuarioService.cargarUsuarios(this.desde).subscribe( (response: any) => {

      this.totalRegistros = response.total; // Seteo la propiedad con el total de registros
      this.usuarios = response.usuarios; // Seteo la propiedad array con el array que viene de la API

    });
  }


  // =================================================================================
  // Función para manejar la paginación, pasamos valor '-5' ó '5' para página 'ant' o 'sig'
  // Parametros: valor (número de registro a partir del cual mostramos)
  // =================================================================================
  cambiarDesde(valor: number) {

    const nuevoDesde = this.desde + valor; // Cogemos el valor de nuestro registro y sumanos lo que nos viene

    // Controlo que el 'desde' no sea mayor que el total de registros
    if (nuevoDesde >= this.totalRegistros) {
      return;
    }

    // Controlo que el 'desde' no sea menor que 0
    if (nuevoDesde < 0) {
      return;
    }

    this.desde += valor; // Incremento por el valor que venga

    // Llammo a la función para que arroje más registros
    this.cargarUsuarios();
  }


}

