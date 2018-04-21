import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class ModalUploadService {

  public tipo: string; // Para poder saber el tipo de archivo a subir desde cualquier página
  public id: string; // id del tipo de archivo que quiero subir

  public oculto: string = 'oculto'; // Para controlar si está habilitado u oculto el modal

  // Para Controlar si se ha subido o no la imagen. La API devolverá un objeto respuesta (de ahí el tipo 'any')
  public notificacion = new EventEmitter<any>();

  constructor() { }

  // ========================================================================================
  // Función ocultar el modal.
  // Parametros: ninguno
  // ========================================================================================
  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }


  // ========================================================================================
  // Función mostrar el modal.
  // Parametros: Tipo (usuario, hospital o médico) y el id del sujeto
  // ========================================================================================
  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }

}
