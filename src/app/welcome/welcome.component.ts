import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Subscription, Observable } from 'rxjs';
import { Show } from '../video-player/show.model';
import * as Video from '../video-player/video.actions';
import { AngularFirestore } from '@angular/fire/firestore';

// const eps = [
//   {
//     name: 'EP 01',
//     idx: 0,
//     showId: 'NzmFkxItdCOYwshy5SlM',
//     lastUpdate: new Date(2019, 1, 2),
//     seasonId: 'hJd8CfHdEVrmOU54VaZz',
//   },
//   {
//     name: 'EP 02',
//     idx: 1,
//     showId: 'NzmFkxItdCOYwshy5SlM',
//     lastUpdate: new Date(2019, 1, 3),
//     seasonId: 'hJd8CfHdEVrmOU54VaZz',
//   },
//   {
//     name: 'EP 01',
//     idx: 0,
//     showId: 'NzmFkxItdCOYwshy5SlM',
//     lastUpdate: new Date(2019, 1, 4),
//     seasonId: '3GPqJ3eGsHbegeNWhIrf',
//   },
// ];

// const seasons = [
//   {
//     name: 'Season 1',
//     numEps: 2,
//     showId: 'NzmFkxItdCOYwshy5SlM',
//     lastUpdate: new Date(2019, 1, 3),
//   },
//   {
//     name: 'Season 2',
//     numEps: 1,
//     showId: 'NzmFkxItdCOYwshy5SlM',
//     lastUpdate: new Date(2019, 1, 4),
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
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    
    // eps.map((ep) => 
    //   this.db
    //     .collection('eps')
    //     .add({
    //       ...ep,
    //       id: this.db.createId()
    //     })
    //     .then((result) => console.log(result))
    // );

    // this.filteredShows$ = this.store.select(fromRoot.getFilteredShows);
    // this.latestShows$ = this.store.select(fromRoot.getLatestShows);

    // this.store.select(fromRoot.getFilteredShows).subscribe((result) => {
    //   if (result.length != 0) this.selectedIndex = 1;
    // });    
  }

  ngOnDestroy(): void {
    this.latestShowsSub.unsubscribe();
  }
}
