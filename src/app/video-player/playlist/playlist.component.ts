import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Season, Ep, Show } from '../show.model';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  @Input() showId: string;
  seasonSub: Subscription;
  showSub: Subscription;
  epSub: Subscription;
  seasons$: Observable<Season[]>;

  eps: Map<string, Ep[]>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.eps = new Map<string, Ep[]>();
    this.seasons$ = this.store.select(fromRoot.getFetchedSeasons);
    this.epSub = this.store
      .select(fromRoot.getFetchedEps)
      .subscribe((eps: Ep[]) => {        
        eps.map((ep) => {
          const key = ep.seasonId;
          if (!(key in this.eps)) this.eps[key] = new Array<Ep>();
          this.eps[key].push(ep);
        });
      });
  }

  ngOnDestroy(): void {
    this.epSub.unsubscribe();
  }
}
