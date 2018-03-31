import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Cargamos el servicio SettingsService en el constructor para que se dispare el servicio
  constructor( public _ajustes: SettingsService ) {

  }
}
