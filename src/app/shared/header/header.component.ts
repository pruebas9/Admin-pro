import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario; // Referencia local para guardar los datos del usuario

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {

    // Sacamos los datos del usuario del servicio de usuario
    this.usuario = this._usuarioService.usuario;
  }




  // =================================================================================
  // Función para las búsquedas, redireccionamos al 'busqueda.component'
  // Parametros: pasamos el parámetro a buscar desde el input.value
  // =================================================================================
  buscar(termino: string) {

    // Redireccionamos al componente de búsquedas y pasamos el término a buscar
    this.router.navigate(['/busqueda', termino]);
  }

}
