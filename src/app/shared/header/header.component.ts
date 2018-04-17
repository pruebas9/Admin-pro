import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario; // Referencia local para guardar los datos del usuario

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    // Sacamos los datos del usuario del servicio de usuario
    this.usuario = this._usuarioService.usuario;
  }

}
