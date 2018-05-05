import { Component, OnInit } from '@angular/core';


// Llamamos a la función que hemos creado dentro de /assets/js/custom.js
// para que se inicialicen los plugins externos
declare function init_plugins();


@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  year: number = new Date().getFullYear();  // Para sacar el año en curso

  constructor() { }

  ngOnInit() {

    init_plugins(); // Llamamos a la función que inicializa los plugins
  }

}
