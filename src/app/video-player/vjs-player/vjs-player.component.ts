// vjs-player.component.ts
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ViewContainerRef,
} from '@angular/core';
import videojs from 'video.js';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as Video from '../video.actions';

@Component({
  selector: 'app-vjs-player',
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;
  @ViewChild('target', { read: ViewContainerRef }) target2: ViewContainerRef;
  @Input() options: {
    fluid: boolean;
    aspectRatio: string;
    autoplay: boolean;
    sources: {
      src: string;
      type: string;
    }[];
  };
  player: videojs.Player;

  isIn: boolean;
  componentRef: any;
  toggle(): void {
    this.isIn = !this.isIn;
  }

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isIn = true;
    let self = this;
    // instantiate Video.js
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this);
        this.on('play', () => self.store.dispatch(new Video.StartPlaying()));
        this.on('pause', () => self.store.dispatch(new Video.StopPlaying()));
      }
    );
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
