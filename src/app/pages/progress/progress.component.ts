import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progressAzul: number = 20;
  progressVerde: number = 30;

  constructor() { }

  ngOnInit() {
  }

  // Función para el evento emitido cambioValor
  actualizarAzul(event: number) {
    // console.log('Evento: ', event);
    this.progressAzul = event;
  }

  // Función para el evento emitido cambioValor
  actualizarVerde(event: number) {
    // console.log('Evento: ', event);
    this.progressVerde = event;
  }

}
