import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Subscription, Observable } from 'rxjs';
import { Show } from '../video-player/show.model';
import { StartLoading } from '../video-player/video.actions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  // latestShowsSub: Subscription;
  latestShows$: Observable<Show[]>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.latestShows$ = this.store
      .select(fromRoot.getLatestShows);
  }

  ngOnDestroy(): void {
    // this.latestShowsSub.unsubscribe();
  }
}
