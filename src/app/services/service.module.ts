import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Para hacer petición http a la API

// Importamos los servicios
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService
  ],
  declarations: []
})

export class ServiceModule { }
