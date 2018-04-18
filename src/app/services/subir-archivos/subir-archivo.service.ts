import { Injectable } from '@angular/core';
import { URL_SERVICIO } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }


  // =================================================================================
  // Función para subir imagenes (vale para cualquier tipo de archivo).
  // Parametros: archivo, el tipo de imagen (usuario, medico, hospital) y el id
  // =================================================================================
  subirArchivo(archivo: File, tipo_archivo: string, id: string) {

    // Creamos una Promise para esta acción
    return new Promise ( (resolve, reject) => {

      // Creamos una variable para el formData, que es lo que vamos a subir por AJAX
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      // Añadimos el nombre del campo, el archivo y el nombre del archivo
      formData.append('imagen', archivo, archivo.name);

      // Hacemos la petición AJAX
      xhr.onreadystatechange = function() {

        // En el estado 4 (proceso finalizado)
        if ( xhr.readyState === 4) {
          // Status de éxito
          if (xhr.status === 200) {
            console.log('Imagen subida');
            // Si se sube bien, llamamos a la función resolve
            resolve(JSON.parse(xhr.response)); // Enviamos la respuesta de la petición AJAX parseada a objeto
          } else {
            console.log('Falló la subida de la imagen');
            // Si algo falla, llamamos al reject
            reject(xhr.response); // Enviamos la respuesta de la petición AJAX parseada a objeto
          }
        }
      };

      // Creamos la url a la que vamos a hacer la petición de subida
      const url = URL_SERVICIO + '/upload/' + tipo_archivo + '/' + id;

      // Hacemos la petición por PUT
      xhr.open('PUT', url, true); // Abrimos la petición
      xhr.send(formData); // Enviamos los datos

    });

  }

}
