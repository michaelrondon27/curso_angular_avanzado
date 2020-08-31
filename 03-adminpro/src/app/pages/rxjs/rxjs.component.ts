import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs:', valor),
    //   error => console.warn('Error:', error),
    //   () => console.info('Obs terminado')
    // );

    this.retornaInterval().subscribe(console.log);

  }

  retornaInterval(): Observable<number> {

    return interval(500).pipe(
      take(10),
      map( valor => valor + 1),
      filter( valor => ( valor % 2 === 0 ) ? true : false ),
    );

  }

  retornaObservable(): Observable<number> {

    let i = -1;

    return new Observable<number>( observer => {

      const intervalo = setInterval( () => {

        i++;
        observer.next(i);

        if ( i === 4 ) {
          clearInterval(intervalo);
          observer.complete();
        }

        if ( i === 2 ) {
          observer.error('i llego al valor de 2');
        }

      }, 1000);

    });

  }

}
