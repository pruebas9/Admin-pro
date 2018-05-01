import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _sidebarService: SidebarService,
    public _usuarioService: UsuarioService,
  ) { }

  ngOnInit() {

    // Sacamos los datos del usuario del servicio de usuario
    this.usuario = this._usuarioService.usuario;

    this._sidebarService.cargarMenu(); // Llamo a la función del servicio que carga el menú
  }

}
