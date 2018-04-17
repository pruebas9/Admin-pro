import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIO } from '../config/config';

@Pipe({
  name: 'imagen'
})

export class ImagenPipe implements PipeTransform {


  // Recibimos la imagen y el tipo de imagen que por defecto será 'usuario'
  transform(imagen: string, tipo_archivo: string = 'usuario'): any {

    // Si en la url viene un 'https' es que la imagen es de un usuario de Google
    if (imagen.indexOf('https') >= 0) {
      // Retornamos esa misma imagen porque ya tiene url formada en los servidores de Google
      return imagen;
    }

    // Variable para construir la ruta de la imagen (la ruta del servidor)
    let url = URL_SERVICIO + '/imagen';

    // Si no viene la imagen mostramos la imagen por defecto
    if (!imagen) {
      return url + '/usuarios/imagen_default';
    }

    // Si no viene 'https' pueden ser 3 tipos de imagen
    switch ( tipo_archivo ) {
      case 'usuario':
        url += '/usuarios/' + imagen; // Concatenamos url para usuarios
      break;

      case 'medico':
        url += '/medicos/' + imagen; // Concatenamos url para médicos
      break;

      case 'hospital':
        url += '/hospitales/' + imagen; // Concatenamos url para hospitales
      break;

      default:
        console.log('No existe ese tipo de imagen, sólo: usuarios, médicos u hospitales');
        url += '/usuarios/imagen_default';

    }

    console.log(url);

  return url; // Retornamos la ruta de la imagen

  }

}
