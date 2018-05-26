import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Para hacer petición http a la API
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

// Importamos los servicios
import {
  LoginGuardGuard,
  AdminGuard,
  VerificaTokenGuard,
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  SubirArchivoService,
  HospitalService,
  MedicoService
} from './service.index';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})

export class ServiceModule { }
