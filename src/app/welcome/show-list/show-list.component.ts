import { Component, OnInit, OnDestroy } from '@angular/core';
import { Show } from '../../video-player/show.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Router } from '@angular/router';
import {
  style,
  state,
  trigger,
  transition,
  animate,
} from '@angular/animations';
import { UiService } from '../../shared/ui/ui.service';

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
      transition('* => *', animate('0.3s')),
    ]),
    trigger('bgFilter', [
      state('no-filter', style({ opacity: 0 })),
      state('filter', style({ opacity: 0.5 })),
      transition('* => *', animate('0.3s')),
    ]),
    trigger('out2In', [
      transition('out => in', [
        style({ transform: 'translateY(0)' }),
        animate('0.3s ease-in-out', style({ transform: 'translateY(-100%)' })),
      ]),
      transition('in => out', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.3s ease-in-out', style({ transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('containerOut2In', [
      state('out', style({ transform: 'translateY(100%)' })),
      state('in', style({ transform: 'translateY(0)' })),
      transition('* => *', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class ShowListComponent implements OnInit, OnDestroy {
  loadingSub: Subscription;
  isAuthSub: Subscription;
  isLoading: boolean;
  shows$: Observable<Show[]>;
  displayIdx: number;
  isLtMd: boolean;
  isAuthenticated: boolean;

  bPObSub: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private uiServie: UiService
  ) {}

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
    this.bPObSub.unsubscribe();
    this.isAuthSub.unsubscribe();
  }

  ngOnInit(): void {
    this.shows$ = this.store.select(fromRoot.getLatestShows);
    this.isLoading = true;
    this.loadingSub = this.store
      .select(fromRoot.getIsLoading)
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.bPObSub = this.uiServie.bpObserveLtMd().subscribe((result) => {
      this.isLtMd = result.matches;
    });
    this.isAuthSub = this.store.select(fromRoot.getIsAuth).subscribe(isAuth => this.isAuthenticated = isAuth);
  }

  showDetails(i: number): void {
    this.displayIdx = i;
  }

  getImgStyle(i: number) {
    if (i == this.displayIdx) return { filter: 'blur(3px)' };
    else return {};
  }

  goto(showId: string): void {
    if (this.isAuthenticated)
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
