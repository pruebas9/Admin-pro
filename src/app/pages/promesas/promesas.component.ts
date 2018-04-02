import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    // Llamamos a la función de la promesa: then-catch (como un try-catch)
    this.contarSegundos(4).then(
      // () => console.log('Terminó!')
      mensaje => console.log(mensaje) // Viene del resolve
    )
    .catch( error => console.error('Error en la promesa', error));
  }

  ngOnInit() {
  }


  // Función para llamar a la Promesa
  contarSegundos(segundos) {

    const promesa = new Promise( (resolve, reject) => {

      let contador = 0;

      const intervalo = setInterval( () => {
        contador += 1;
        console.log(contador);

        if (contador === segundos) {
          // resolve();
          resolve('Todo ha ido bien!!');
          // reject('Simplemente ocurrión un error...');
          clearInterval(intervalo); // Cerramos el intervalo
        }
      }, 1000 );
    });

    // Retornamos la promesa
    return promesa;
  }

}
