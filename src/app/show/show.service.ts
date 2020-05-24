import { Injectable } from '@angular/core';
import { Show, Season, Ep, FeaturedShow } from '../video-player/show.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as Video from '../video-player/video.actions';
import { Subscription } from 'rxjs';
import { UiService } from '../shared/ui/ui.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
export class ShowService {
  constructor(
    private store: Store<fromRoot.State>,
    private uiService: UiService,
    private http: HttpClient,
  ) { }

  fetchSeasonSub: Subscription;
  fetchEpSub: Subscription;
  fetchActiveShowSub: Subscription;

  private _showWithBannerImg: Map<string, string>;

  initShowService(): void {
    this._showWithBannerImg = new Map<string, string>();
    this.store.select(fromRoot.getLatestShows).subscribe((shows) => {
      shows
        .filter((show) => show.bannerImgUrl)
        .map((show) => {
          this._showWithBannerImg[show.id] = show.bannerImgUrl
        });
    });
  }

  fetchActiveShow(showId: string): void {
    if (this.fetchActiveShowSub) this.fetchActiveShowSub.unsubscribe();

    this.fetchActiveShowSub = this.http.get(`/api/show/shows/${showId}`).subscribe((result: Object) => {
      let show = convertObjectKeyToCamel(result) as Show;
      show.bannerImgUrl = environment.staticUrl + show.bannerImgUrl;
      show.thumImgUrl = environment.staticUrl + show.thumImgUrl;
      this.store.dispatch(new Video.SetActiveShow(show));
    })
  }

  fetchSeasons(showId: string): void {
    if (this.fetchSeasonSub) this.fetchSeasonSub.unsubscribe();
    this.fetchSeasonSub = this.http.get(`/api/show/seasons?show=${showId}`).subscribe((result: Object[]) => {
      let convertedSeasons = result.map(season => {
        let convertedSeason = convertObjectKeyToCamel(season);
        convertedSeason['showId'] = convertedSeason['show'];
        return convertedSeason;
      }) as Season[];
      this.store.dispatch(new Video.SetFetchedSeasons(convertedSeasons));

    })
  }

  fetchEps(showId: string): void {
    if (this.fetchEpSub) this.fetchEpSub.unsubscribe();

    this.fetchEpSub = this.http.get(`/api/show/eps?show=${showId}`).subscribe((result: Object[]) => {
      let convertedEps = result.map(ep => {
        let convertedEp = convertObjectKeyToCamel(ep);
        convertedEp['showId'] = convertedEp['show'];
        convertedEp['seasonId'] = convertedEp['season'];
        return convertedEp;
      }) as Ep[];
      this.store.dispatch(new Video.SetFetchedEps(convertedEps));

    })
  }



  fetchFeaturedShow(): void {
    this.http.get("/api/show/featuredShows").subscribe((result: Object[]) => {
      const shows: FeaturedShow[] = result.map(show => {
        let convertedShow = convertObjectKeyToCamel(show);
        convertedShow['showId'] = convertedShow['show'];
        return convertedShow;
      }) as FeaturedShow[];
      this.store.dispatch(new Video.SetFeaturedShows(shows));
    });
  }

  fetchLatestShow(): void {
    this.uiService.startLoading();
    this.http.get("/api/show/shows").subscribe((result: Object[]) => {
      let shows: Show[] = result.map(show => convertObjectKeyToCamel(show)) as Show[];
      shows = shows.map(show => {
        show.bannerImgUrl = environment.staticUrl + show.bannerImgUrl;
        show.thumImgUrl = environment.staticUrl + show.thumImgUrl;
        return show;
      })
      this.store.dispatch(new Video.SetLatestShows(shows));
      this.uiService.stopLoading();
    });
  }

  getShowBannerImg(showId: string): string {
    return this._showWithBannerImg[showId];
  }
}
