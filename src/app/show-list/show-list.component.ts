import { Component, OnInit, Input } from '@angular/core';
import { Show } from '../video-player/show.model';
import { Observable } from 'rxjs';
import { ShowService } from '../show/show.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Router } from '@angular/router';

const fakeShows = [
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
  {
    name: 'Gintama',
    numEps: 10,
    numSeasons: 2,
    thumImgUrl: 'assets/gintama.jpg',
  },
];

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
})
export class ShowListComponent implements OnInit {
  // @Input() shows: Show[];
  shows;
  shows$: Observable<Show[]>;
  displayIdx: number;

  constructor(
    private showService: ShowService,
    private store: Store<fromRoot.State>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showService.fetchLatestShow();    
    this.shows$ = this.store.select(fromRoot.getLatestShows);
  }

  showDetails(i: number): void {
    this.displayIdx = i;
  }

  getImgStyle(i: number) {
    if (i == this.displayIdx) return { filter: "blur(3px)" };
    else return {};
  }

  goto(showId: string): void {
    this.router.navigate([`show/${showId}`]);
  }
}
