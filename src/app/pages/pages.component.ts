import { Component, OnInit } from '@angular/core';

// Llamamos a la función que hemos creado dentro de /assets/js/custom.js
// para que se inicialicen los plugins externos
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    init_plugins(); // Llamamos a la función que inicializa los plugins
  }

}
