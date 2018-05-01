import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SidebarService {

  // Creamos una propiedad para el menú. Esto se ha movido al backend y nos vienen de allí las secciones
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'Progress', url: '/progress' },
  //       { titulo: 'Gráficas', url: '/graficas1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'RxJs', url: '/rxjs' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Médicos', url: '/medicos' },
  //     ]
  //   }
  // ];

  menu: any = [];

  constructor(
    public _usuarioService: UsuarioService  // Para acceder a las propiedades del usuario (opciones del menú)
  ) { }


  // =================================================================================
  // Función para setear las opciones del menú que nos viene del backend y cargarlas
  // Parametros: ninguno
  // =================================================================================
  cargarMenu() {
    this.menu = this._usuarioService.menu;  // Guardo el menú que viene del usuarioService
  }

}
