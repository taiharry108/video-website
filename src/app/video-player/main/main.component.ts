import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ShowService } from 'src/app/show/show.service';
import { Show } from '../show.model';

import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  showId: string;
  paramMapSub: Subscription;
  show$: Observable<Show>;
  constructor(
    private route: ActivatedRoute,
    private showService: ShowService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.show$ = this.store.select(fromRoot.getActiveShow);
    this.paramMapSub = this.route.paramMap.subscribe((params) => {
      this.showId = params.get('showId');
      this.showService.fetchSeasons(this.showId);
      this.showService.fetchEps(this.showId);
      this.showService.fetchActiveShow(this.showId);
    });
  }

  ngOnDestroy(): void {
    this.paramMapSub.unsubscribe();
  }
}
