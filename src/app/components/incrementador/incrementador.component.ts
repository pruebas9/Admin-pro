import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

// Para hacer referencia a un elemento concreto
@ViewChild('txtProgress') txtProgress: ElementRef;

// Insertamos 'algo' (datos o lo que sea) en nuestro componente
@Input('nombre') leyenda: string = 'Leyenda';
@Input('progress')  progress: number = 20;

// Emitimos un número como un evento a las barras de progreso
@Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Constructor: ', 'Leyenda', this.leyenda);
    // console.log('progress', this.progress);
  }

  ngOnInit() {
    // console.log('ngInit: ', 'Leyenda', this.leyenda);
    // console.log('progress', this.progress);
  }

  cambiarValor(valor) {

    this.progress = this.progress + valor;

    if (this.progress >= 100) {
      this.progress = 100;
    }

    if (this.progress <= 0 ) {
      this.progress = 0;
    }

    // Emito el valor a la barra de progreso
    this.cambioValor.emit(this.progress);

  }

  onChange(valor: number) {

    // Cojo el elemento [0] del array de elementos con name 'progress'
    // const elemHTML: any = document.getElementsByName('progress')[0];

    if (valor >= 100) {
      this.progress = 100;
    } else if (valor <= 0) {
      this.progress = 0;
    } else {
      this.progress = valor;
    }

    // elemHTML.value = this.progress;
    this.txtProgress.nativeElement.value = this.progress; // Uso el @ViewChild

    // Emito el valor a la barra de progreso
    this.cambioValor.emit(this.progress);

    // Ponemos el foco en el elemento
    this.txtProgress.nativeElement.focus();
  }

}
