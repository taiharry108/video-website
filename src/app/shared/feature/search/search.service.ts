import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as Video from '../../../video-player/video.actions';
import { Show } from 'src/app/video-player/show.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

const snakeCaseToCamelCase = input =>
  input
    .split("_")
    .reduce(
      (res, word, i) =>
        i === 0
          ? word.toLowerCase()
          : `${res}${word.charAt(0).toUpperCase()}${word
            .substr(1)
            .toLowerCase()}`,
      ""
    );

const convertObjectKeyToCamel = o => {
  let result = {};
  Object.keys(o).map(key => {
    result[snakeCaseToCamelCase(key)] = o[key];
  });
  return result;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchSub: Subscription;
  constructor(
    private store: Store<fromRoot.State>,
    private http: HttpClient,
  ) { }


  searchShow(searchValue: string): void {
    this.http.get(`/api/show/shows?search=${searchValue}`).subscribe((result: Object[]) => {
      let shows = result.map(show => convertObjectKeyToCamel(show)) as Show[];
      this.store.dispatch(new Video.SetFilteredShows(shows));
    })
  }
}
