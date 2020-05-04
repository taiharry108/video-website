import { Injectable } from '@angular/core';
import { Show } from '../video-player/show.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as Video from '../video-player/video.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

const shows: Show[] = [
  {
    lastUpdate: new Date(2018, 10, 1),
    name: 'Gintama',
    numSeasons: 2,
    numEps: 48,
    state: 'finished',
    thumImgUrl: 'assets/gintama.jpg',
    bannerImgUrl: 'assets/banner/gintama.jpg',
    id: '1',
  },
  {
    lastUpdate: new Date(2018, 10, 1),
    name: 'Kaguya-sama: Love Is War',
    numSeasons: 2,
    numEps: 15,
    state: 'onGoing',
    thumImgUrl: 'assets/kaguyasama.jpg',
    bannerImgUrl: 'assets/banner/kaguyasama.jpg',
    id: '2',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  constructor(
    private store: Store<fromRoot.State>,
    private db: AngularFirestore
  ) {}

  fetchFeaturedShow(): void {
    this.store.dispatch(new Video.SetFeaturedShows(shows));
  }

  fetchLatestShow(): void {
    this.db
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
  }
}
