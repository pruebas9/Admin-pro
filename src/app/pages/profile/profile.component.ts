import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File; // Propiedad para la subida de imagenes del usuario

  constructor(
    public _usuarioService: UsuarioService
  ) {
    // Cargamos de inicio la información del usuario del servicio
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {

  }

  // =======================================================================================
  // Función para guardar cambios del perfil. Recibe un objeto usuario con nombre y email
  // =======================================================================================
  guardar(usuario: Usuario) {
    // console.log(usuario);

    // Seteo las propiedades con los valores vienen del formulario
    this.usuario.nombre = usuario.nombre;

    // Si el usuario es de Google no permitimos editar email
    if (!this.usuario.google) {
      this.usuario.email = usuario.email; // Si no es de Google, cambiar correo
    }


    // Llamo a la función del servicio de usuarios que hace la petición a la API
    this._usuarioService.actualizarUsuario(this.usuario).subscribe(); // No hace falta hacer nada en el subscribe
  }


  // ========================================================================================
  // Función para detectar cuando un usuario ha seleccionado una imagen a subir en el input
  // Parametros: El archivo a subir (el $evento.target.file[0] que es el archivo)
  // ========================================================================================
  seleccionImagen( archivo: File) {

    // Si no existe el archivo seteamos la propiedad a null y no hacemos nada
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    // Seteamos en la propiedad el fichero que nos pasan
    this.imagenSubir = archivo;

  }


  // ========================================================================================
  // Función para modificar la imagen a subir en el formulario (preview de la imagen)
  // Parametros: Ninguno
  // ========================================================================================
  cambiarImagen() {

    // Llamamos al método con el mismo nombre del usuario.service
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);

  }
}
