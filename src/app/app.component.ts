import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

class CounterdownOptions {
  time: number;
  speed = 1000;
  onStart = () => {};
  onEachCount = () => {};
  onEnd = () => {};
  debug: boolean = false;
}

interface ICounterdownOptions {
  /**
   * The initial number from it will be counting down
   * @example 10
   */
  time: number;
  /**
   * Speed in miliseconds
   * @example ```js
   * { time: 10 }
   * ```
   */
  speed?: number;
  /**
   * Emit a method a the begining of the counting down
   * @example ```
   * { time: 10, speed: 1000 // means 1 secons }
   * ```
   */
  onStart?: () => void;
  /**
   * Emit a method on each counting down step
   * @example ```
   * { time: 10, onStart: () => console.log('Cowndown has started!') }
   * ```
   */
  onEachCount?: () => void;
  /**
   * Emit a method a the end of the counting down
   * @example ```
   * { time: 10, onStart: () => console.log('Cowndown step!') }
   * ```
   */
  onEnd?: () => void;
  /**
   * Show debug data in console
   * @example ```
   * { time: 10, debug: true | false }
   * ```
   */
  debug?: boolean;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Contador';

  ngOnInit() { 
    this.countdownTimer({time: 5}); 
  }


  /**
   * Countdown timer
   * -----------
   * @description
   * This is a counterdown helper
   * 
   * @example
   * ```ts
   * countdownTimer({time: 5, debug: true})
   * ```
   * // TODO: Return a value
   */
  countdownTimer(options: ICounterdownOptions) {

    const timerOptions = new CounterdownOptions();

    timerOptions.time = options.time;
    timerOptions.speed = options.speed || timerOptions.speed;
    timerOptions.onStart = options.onStart || timerOptions.onStart;
    timerOptions.onEachCount = options.onEachCount || timerOptions.onEachCount;
    timerOptions.onEnd = options.onEnd || timerOptions.onEnd;
    timerOptions.debug = options.debug || timerOptions.debug;

    let { time, speed, onStart, onEachCount, onEnd, debug } = timerOptions;

    if (debug) { console.log('[DEBUG Timer!]', timerOptions)} // if debug: true
    
    onStart();

    const timer$ = interval(speed);
    timer$.pipe(
      take(time),
      map(v => (time - 1) - v),
    ).subscribe(v => {

      onEachCount();

      if (debug) { console.log('[DEBUG Timer!]', 'left', v) } // if debug: true

      if ( v === 0 ) {
        if (debug) { console.log('[DEBUG Timer!]', 'Counter has finished!')} // if debug: true
        onEnd();
      }

    })
  }
}

