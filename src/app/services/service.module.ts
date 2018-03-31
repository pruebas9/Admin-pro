import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importamos los servicios
import { SettingsService, SidebarService, SharedService } from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService
  ],
  declarations: []
})

export class ServiceModule { }
