import { Component, OnInit } from '@angular/core';
import { Show } from 'src/app/video-player/show.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../app.reducer';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  filteredShows$: Observable<Show[]>;
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.filteredShows$ = this.store.select(fromRoot.getFilteredShows);
  }

}
