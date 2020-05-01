import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Subscription, Observable } from 'rxjs';
import { Show } from '../video-player/show.model';
import * as Video from '../video-player/video.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

// const shows = [
//   {
//     lastUpdate: new Date(2018, 10, 1),
//     name: 'Steins;Gate',
//     numSeasons: 2,
//     numEps: 48,
//     state: 'finished',
//     thumImgUrl: 'assets/steins-gate.jpg',
//   },
// ];

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  latestShowsSub: Subscription;
  latestShows$: Observable<Show[]>;
  filteredShows$: Observable<Show[]>;
  selectedIndex: number;

  constructor(
    private store: Store<fromRoot.State>,
    private db: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.filteredShows$ = this.store.select(fromRoot.getFilteredShows);
    this.latestShows$ = this.store.select(fromRoot.getLatestShows);

    this.store.select(fromRoot.getFilteredShows).subscribe((result) => {
      if (result.length != 0) this.selectedIndex = 1;
    });

    this.latestShowsSub = this.db
      .collection('shows')
      .snapshotChanges()
      .pipe(
        map((docArray) =>
          docArray.map((doc) => {
            let tmpShow = {
              id: doc.payload.doc.id as string,
              lastUpdate: null,
              ...(doc.payload.doc.data() as object),
            };
            tmpShow.lastUpdate = tmpShow.lastUpdate.toDate();
            return tmpShow;
          })
        )
      )
      .subscribe((shows: Show[]) => {
        this.store.dispatch(new Video.SetLatestShows(shows));
      });

    this.store.select(fromRoot.getFilteredShows).subscribe((shows: Show[]) => {
      // console.log(shows);
    });
  }

  ngOnDestroy(): void {
    this.latestShowsSub.unsubscribe();
  }
}
