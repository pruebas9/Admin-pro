import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model'; // Cargamos el modelo de Usuario
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})

export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = []; // Variable array para guardar usuarios y listarlos
  desde: number = 0; // Variable para controlar la paginación (mostrar desde)
  totalRegistros: number = 0; // Para la paginación, controla el total de registros arrojados desde la API

  cargando: boolean = true; // Para controlar el spinner de cargando

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService // Para controlar el modal de subir imágenes
  ) { }

  ngOnInit() {
    // Llamo a la función al cargar todo
    this.cargarUsuarios();
    // Nos suscribimos al evento EventEmitter del servicio del modal
    this._modalUploadService.notificacion.subscribe( response => {

      // Cargamos los usuario sin más
      this.cargarUsuarios();

    });
  }


  // =================================================================================
  // Función para hacer la llamada al método del servicio (del mismo nombre) que hace la llamada a la API
  // Parametros: ninguno
  // =================================================================================
  cargarUsuarios() {

    this.cargando = true; // Ponemos la variable a cargar...

    // Llamo a la función que hace la petición a la API para listar los usuarios
    this._usuarioService.cargarUsuarios(this.desde).subscribe( (response: any) => {

      this.totalRegistros = response.total; // Seteo la propiedad con el total de registros
      this.usuarios = response.usuarios; // Seteo la propiedad array con el array que viene de la API

      this.cargando = false; // Quitamos la variable de cargando...

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


  // =================================================================================
  // Función para buscar usuarios
  // Parametros: término de búsqueda (string). Es el 'input.value' del input de búsqueda
  // =================================================================================
  buscarUsuario(termino: string) {


    // Si la longitud del término menor o igual a 0 (no haya término)
    if (termino.length <= 0) {
      this.cargarUsuarios(); // Mostramos todos los usuarios
      return;
    }

    this.cargando = true; // Mostramos cargando...

    // Llamamos al método del servicio. En el subscribe recibimos un array de usuarios
    this._usuarioService.buscarUsuarios(termino).subscribe( (usuarios: Usuario[]) => {

      // Seteamos la propiedad con los valores que nos vienen en el array
      this.usuarios = usuarios;

      this.cargando = false; // Quitamos el cargando...

    });

  }


  // =================================================================================
  // Función para borrar usuarios
  // Parametros: usuario en el que hacemos click
  // =================================================================================
  borrarUsuario( usuario: Usuario) {

      // Usuario no puede borrarse a sí mismo
      if ( usuario._id === this._usuarioService.usuario._id) {
        swal('No puede borrar este usuario', 'No se puede borrar a sí mismo', 'error');
        return;
      }

      // Pop up de confirmación para eliminar el usuario
      swal({
        title: 'Está seguro?',
        text: 'Está a punto de borrar a ' +  usuario.nombre,
        icon: 'warning',
        dangerMode: true,
      })
      .then(borrar => {

        // Si recibo un true llamo al método del servicio usuario que hace petición a la API para borrar
        if (borrar) {
          this._usuarioService.borrarUsuario(usuario._id).subscribe( (borrado: boolean) => {

            // Llamamos a la función que lista los usuarios de nuevo
            this.cargarUsuarios();

            // TODO: hacer que al eliminar el usuario vuelva a la página 1

          });
        }
      });
  }


  // =================================================================================
  // Función para actualizar los datos del usuario
  // Parametros: usuario en el que hacemos click
  // =================================================================================
  guardarUsuario(usuario: Usuario) {

    // Llamo a la función del servicio de usuario que hace la petición de actualizar usuario
    this._usuarioService.actualizarUsuario(usuario).subscribe(); // No necesito controlar nada en la respuesta
  }



  // =================================================================================
  // Función para mostrar el modal de subir imagen al hacer click en la imagen del usuario
  // Parametros: El id del usuario en el que hemos hecho click
  // =================================================================================
  mostrarModal(id: string) {

    // Llamo a la función del servicio que muestra modal, le paso el tipo 'usuarios' y el id
    this._modalUploadService.mostrarModal('usuarios', id);
  }


}

