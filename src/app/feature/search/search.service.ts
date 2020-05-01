import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import * as fromRoot from '../../app.reducer';
import * as Video from '../../video-player/video.actions';
import { Show } from 'src/app/video-player/show.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private store: Store<fromRoot.State>,
    private db: AngularFirestore
  ) {}


  searchShow(searchValue: string): void {    
    this.db
      .collection('shows', (ref) =>
        ref
          .orderBy('name')
          .startAt(searchValue.toLowerCase())
          .endAt(searchValue.toLowerCase() + '\uf8ff')
          .limit(10)
      )
      .valueChanges()
      .subscribe(
        (shows: Show[]) => {
          console.log('going to dispatch');
          this.store.dispatch(new Video.SetFilteredShows(shows));
        },
        (error) => console.error(error),
        () => console.log('completed')
      );
  }
}
