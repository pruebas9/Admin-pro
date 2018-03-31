import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Llamamos a la función que hemos creado dentro de /assets/js/custom.js
// para que se inicialicen los plugins externos
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router ) { }

  ngOnInit() {

    init_plugins();
  }


  ingresar() {
    // Redireccionamos al dashboard
    this.router.navigate([ '/dashboard' ]);

  }

}
