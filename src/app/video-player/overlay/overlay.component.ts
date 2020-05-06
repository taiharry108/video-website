import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import {
  state,
  trigger,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    trigger('inAndOut', [
      state('in', style({ display: 'none' })),
      state('out', style({ display: 'none' })),
      transition('in => out', [
        animate(
          '0.5s',
          keyframes([
            style({
              opacity: 0,
              width: '50px',
              height: '50px',
              fontSize: '45px',
              display: 'flex',
            }),
            style({
              opacity: 0.3,
              fontSize: '54px',
              width: '60px',
              height: '60px',
              display: 'flex',
            }),
            style({
              opacity: 0,
              fontSize: '72px',
              width: '80px',
              height: '80px',
              display: 'flex',
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class OverlayComponent implements OnInit, OnDestroy {
  constructor(public elRef: ElementRef, private store: Store<fromRoot.State>) {}
  playingSub: Subscription;
  isIn: boolean;

  ngOnInit(): void {
    this.playingSub = this.store
      .select(fromRoot.getIsPlaying)
      .subscribe((isPlaying: boolean) => {
        this.isIn = isPlaying;
      });
  }

  ngOnDestroy(): void {
    this.playingSub.unsubscribe();
  }
}
