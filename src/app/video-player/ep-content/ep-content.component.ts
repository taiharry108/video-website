import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Show } from '../show.model';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ep-content',
  templateUrl: './ep-content.component.html',
  styleUrls: ['./ep-content.component.scss'],
})
export class EpContentComponent implements OnInit, OnDestroy {
  lastUpdate: Date;
  constructor(private store: Store<fromRoot.State>) {}
  show: Show;
  activeShowSub: Subscription;
  metaKeys: string[];

  ngOnInit(): void {
    this.lastUpdate = new Date();
    this.activeShowSub = this.store
      .select(fromRoot.getActiveShow)
      .subscribe((show) => {
        this.show = { ...show };
        if (this.show.meta) this.metaKeys = Object.keys(this.show.meta);
      });
  }

  ngOnDestroy(): void {
    this.activeShowSub.unsubscribe()
  }
}
