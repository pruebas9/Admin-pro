import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File; // Propiedad para la subida de imagenes del usuario
  imagenPreview: string; // Propiedad para la preview de la imagen a mostrar antes de subir

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  // ========================================================================================
  // Función para cerrar el modal y resetear las propiedades
  // Parametros: ninguno
  // ========================================================================================
  cerrarModal() {
    this.imagenPreview = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }


  // ========================================================================================
  // Función para detectar cuando un usuario ha seleccionado una imagen a subir en el input del modal
  // Parametros: El archivo a subir (el $evento.target.file[0] que es el archivo)
  // ========================================================================================
  seleccionImagen( archivo: File) {

    // Si no existe el archivo seteamos la propiedad a null y no hacemos nada
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    // Controlamos que el archivo contenga en su atributo 'type' la palabra 'image' (sea una imagen)
    // Si NO es una imagen...
    if (archivo.type.indexOf('image') < 0) {
      swal('Sólo están permitidas imágenes', 'El archivo seleccionando no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    // Seteamos en la propiedad el fichero que nos pasan
    this.imagenSubir = archivo;

    // Vamos a mostrar la imagen con su url temporal. con JS nativo
    const  reader = new FileReader();
    const urlImagenPreview = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenPreview = reader.result;
    };

  }


  // ========================================================================================
  // Función para subir la imagen seleccionada por el usuario.
  // Parametros: Ninguno
  // ========================================================================================
  subirImagen() {
    // Llamo a la función del servico y le paso los parámetros: fichero a subir, el tipo (usuario, medico u hospital) y el id
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
              .then( response => {
                // Llamo a la propiedad 'EventEmitter' del servicio y a su método 'emit'
                this._modalUploadService.notificacion.emit(response);
                // Llamo al método para ocultar el modal
                this.cerrarModal();
              })
              .catch( error => {
                console.log('Error en la carga...');
              });
  }

}
