import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Season, Ep } from '../show.model';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  @Input() showId: string;
  seasonSub: Subscription;
  epSub: Subscription;
  seasons: Season[];
  eps: Map<string, Ep[]>;

  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    // this.eps = new Map<string, Ep[]>();
    // let self = this;
    // this.seasonSub = this.db
    //   .collection('seasons', (ref) => ref.where('showId', '==', this.showId))
    //   .valueChanges()
    //   .subscribe((seasons: Season[]) => {
    //     this.seasons = seasons;
    //   });
    // this.epSub = this.db
    //   .collection('eps', (ref) => ref.where('showId', '==', this.showId))
    //   .valueChanges()
    //   .subscribe((eps: Ep[]) => {
    //     eps.map((ep) => {
    //       const key = ep.seasonId;
    //       if (!self.eps.has(key)) self.eps.set(key, new Array<Ep>());
    //       self.eps.get(key).push(ep);
    //     });
    //     console.log(self.eps);
    //   });
  }

  ngOnDestroy(): void {
    // this.seasonSub.unsubscribe();
    // this.epSub.unsubscribe();
  }
}
