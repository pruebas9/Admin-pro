import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  // Variable para controlar el subscribe
  subscription: Subscription;

  constructor() {

    // Nos suscribimos al observable. Tiene 3 callbacks: el next, el error y el de cuando termina
    this.subscription = this.regresaObservable()
      .subscribe(
        numero => console.log('Subscribe', numero),
        error => console.error('Ocurrió un error en el observable', error),
        () => console.log('El observable terminó')
      );
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Quitamos el subscribe cuando cambiemos de página (de componente)
    this.subscription.unsubscribe();

  }


  // Función que crea y retorna un observable
  regresaObservable(): Observable<any> {

    return new Observable( observer => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 30) {
        //   clearInterval(intervalo);
        //   observer.complete(); // Paramos el observable
        // }

        // Metemos un error para ver cómo sale por el error el obseravable
        // if (contador === 2) {
        //   observer.error('El observable se paró en 2!!');
        // }

      }, 500);

    })
    .retry(2)
    .map( (response: any)  => {

      return response.valor;
    })
    .filter( (valor, index) => {

      if ( (valor % 2) === 1 ) {
        return true;
      } else {
        return false;
      }
      // console.log('Filter', valor, index);
    });
  }
}
