import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  // Dejamos como valores de retorno Promise o booleano
  canActivate(): Promise<boolean> | boolean {

    console.log('Token guard');

    const token = this._usuarioService.token; // Para guardar el token y validarlo

    // Recuperamos la información del token (payload)
    // Parseo a JSON y decodifico con 'atob'lo que viene en base64, troceamos por el '.'
    const payload = JSON.parse( atob( token.split('.')[1] ));

    // Llamo a la función que verifica si ha expirado y paso la fecha de expiración (que viene en segundos)
    const expirado = this.expirado( payload.exp );

    // Si el token ha expirado...
    if ( expirado ) {
      this.router.navigate(['/login']); // Sacamos al usuario al login
      return false;                     // No puede entrar
    }


    return this.verificaRenueva( payload.exp );
  }


  // =================================================================================
  // Función para ver si hay que renovar el token (si está próximo a expirar)
  // Parametros: Fecha de expiración del token, que hemos sacado del propio token
  // =================================================================================
  verificaRenueva( fechaExp: number ): Promise<boolean>  {

    // Importante el return de la promesa
    return new Promise( (resolve, reject) => {

      // Pasamos la fecha de expiración a milisegundos
      const tokenExp = new Date( fechaExp * 1000 );

      // Creamos la fecha actual en milisegundos
      const ahora = new Date();

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) ); // Aumentamos en 1 hora (en milisengundos)

      // console.log( tokenExp ); // expiración actual
      // console.log( ahora );    // expiración aumentada 1 hora

      // Si la fecha actual es mayor que la aumentada 1 hora...
      if ( tokenExp.getTime() > ahora.getTime() ) {

        resolve(true); // No renovamos token porque aún no está próximo a expirar

      } else {

        // Llamo a la función de renovar token del servicio
        this._usuarioService.renuevaToken().subscribe( () => {

                resolve(true); // Lo hace correctamente

              }, () => {

                this.router.navigate(['/login']); // Sacamos al usuario al login
                reject(false);  // No lo hace correctamente y sacamos al usuario
              });
      }

    });

  }

  // =================================================================================
  // Función para ver si el token ha expirado
  // Parametros: Fecha de expiración del token, que hemos sacado del propio token
  // =================================================================================
  expirado( fechaExp: number ) {

    // Creamos una instancia de la hora del sistema
    const ahora = new Date().getTime() / 1000; // Dividimos por 1000 para pasarlo a segundos

    // Si la fecha del token es mayor que ahora...
    if ( fechaExp < ahora ) {
      return true; // Ha expirado
    } else {
      return false;
    }

  }

}
