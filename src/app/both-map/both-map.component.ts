import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { startWith, throttleTime, map } from 'rxjs/operators';


@Component({
  selector: 'app-both-map',
  templateUrl: './both-map.component.html',
  styleUrls: ['./both-map.component.scss']
})
export class BothMapComponent implements OnInit {

  public mobile: any = document.body.offsetWidth < 1024;

  constructor() { }

  async ngOnInit() {
    const checkScreenSize = () => document.body.offsetWidth < 1024;

    // Create observable from window resize event throttled so only fires every 500ms
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(throttleTime(500), map(checkScreenSize));

    // Start off with the initial value use the isScreenSmall$ | async in the
    // view to get both the original value and the new value after resize.
    screenSizeChanged$.subscribe((result) => {
      this.mobile = result;
    });
  }

}
