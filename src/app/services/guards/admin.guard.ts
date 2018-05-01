import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()

export class AdminGuard implements CanActivate {


  constructor(
    public _usuarioService: UsuarioService,  // Para verificar el role del usuario
  ) { }

  canActivate() {

    // Compruebo el role del usuario
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true; // Podremos pasar
    } else {
      console.log('Bloqueado por el ADMIN GUARD');
      this._usuarioService.logout();    // Si no es autorizado le hago logout y se le redirige al login
      return false;  // No podrá pasar
    }
  }

}
