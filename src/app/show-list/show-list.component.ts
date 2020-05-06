import { Component, OnInit } from '@angular/core';
import { Show } from '../video-player/show.model';
import { Observable } from 'rxjs';
import { ShowService } from '../show/show.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Router } from '@angular/router';
import {
  style,
  state,
  trigger,
  transition,
  animate,
  query,
  group,
} from '@angular/animations';

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
  animations: [
    trigger('bgBlur', [
      state('no-blur', style({ filter: 'blur(0)' })),
      state('blur', style({ filter: 'blur(2px)' })),
      transition('* => *', animate('0.5s')),
    ]),
    trigger('bgFilter', [
      state('no-filter', style({ opacity: 0 })),
      state('filter', style({ opacity: 0.3 })),
      transition('* => *', animate('0.5s')),
    ]),
    trigger('out2In', [
      transition('out => in', [
        style({ transform: 'translateY(-50%)' }),
        animate('0.5s', style({ transform: 'translateY(-100%)' })),
      ]),
      transition('in => out', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s', style({ transform: 'translateY(-50%)' })),
      ]),
    ]),
  ],
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
    if (i == this.displayIdx) return { filter: 'blur(3px)' };
    else return {};
  }

  goto(showId: string): void {
    this.router.navigate([`show/${showId}`]);
  }

  animationDone() {
    console.log('in done');
  }

  getBgStyle(thumImgUrl: string) {
    let style = {
      background: `url(${thumImgUrl})`,
      'background-repeat': 'no-repeat',
      'background-position': '50%',
      'background-size': '100%',
    };
    return style;
  }
}
