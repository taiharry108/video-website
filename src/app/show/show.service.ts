import { Injectable } from '@angular/core';
import { Show, Season, Ep, FeaturedShow } from '../video-player/show.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as Video from '../video-player/video.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { mockShows } from './mock-show';
import { Subscription } from 'rxjs';
import { UiService } from '../shared/ui/ui.service';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  constructor(
    private store: Store<fromRoot.State>,
    private db: AngularFirestore,
    private uiService: UiService
  ) {}

  fetchSeasonSub: Subscription;
  fetchEpSub: Subscription;
  fetchActiveShowSub: Subscription;

  private _showWithBannerImg: Map<string, string>;

  initShowService(): void {
    this._showWithBannerImg = new Map<string, string>();
    this.store.select(fromRoot.getLatestShows).subscribe((shows) => {
      shows
        .filter((show) => show.bannerImgUrl)
        .map((show) => (this._showWithBannerImg[show.id] = show.bannerImgUrl));
    });
  }

  updateShows() {
    let obj = JSON.parse(
      '[ { "id": "sMyvTo65Or8m1w8fb2Fa", "lastUpdate": "2018-11-01T07:00:00.000Z", "bannerImgUrl": "assets/banner/gintama.jpg", "numSeasons": 2, "state": "finished", "name": "Gintama", "numEps": 5, "thumImgUrl": "assets/gintama.jpg", "meta": { "Author": "Hideaki Sorachi", "Studio": "Sunrise" }, "rating": 7 }, { "id": "ofnAwua9uqiBAJykbp0w", "lastUpdate": "2018-11-02T07:00:00.000Z", "bannerImgUrl": "assets/banner/kaguyasama.jpg", "numSeasons": 1, "state": "onGoing", "name": "Kaguya-sama: Love Is War", "numEps": 1, "thumImgUrl": "assets/kaguyasama.jpg", "meta": { "Author": "Aka Akasaka", "Studio": "A-1 Pictures" }, "rating": 7 }, { "id": "zZ1fDU15yqeo9Ev3CI8G", "lastUpdate": "2018-11-07T07:00:00.000Z", "numEps": 4, "thumImgUrl": "assets/steins-gate.jpg", "numSeasons": 1, "state": "finished", "name": "Steins;Gate", "meta": { "Author": "5pb. (MAGES.)／Nitroplus", "Studio": "White Fox" }, "rating": 8 }, { "id": "tKO4T5013p99TwpxLP5w", "lastUpdate": "2018-11-04T07:00:00.000Z", "state": "onGoing", "name": "Kitsume No Yaiba", "numEps": 2, "thumImgUrl": "assets/kitsume-no-yaiba.jpg", "numSeasons": 2, "meta": { "Author": "Koyoharu Gotōge", "Studio": "Ufotable" }, "rating": 8 }, { "id": "3otx64IVQEPIiJXBMWeb", "lastUpdate": "2018-11-03T07:00:00.000Z", "numSeasons": 1, "state": "finished", "name": "Kill La Kill", "numEps": 4, "thumImgUrl": "assets/kill-la-kill.jpg", "meta": { "Author": "Hiroyuki Imaishi/Kazuki Nakashima", "Studio": "Trigger" }, "rating": 9 }, { "id": "4wrhpzU1ChlUJjnq76pR", "lastUpdate": "2018-11-06T07:00:00.000Z", "thumImgUrl": "assets/sao.jpg", "numSeasons": 1, "state": "onGoing", "name": "Sword Art Online", "numEps": 2, "meta": { "Author": "Reki Kawahara", "Studio": "A-1 Pictures" }, "rating": 8 }, { "id": "kNTeexreAdeDKEorQY6m", "lastUpdate": "2018-11-05T07:00:00.000Z", "numEps": 7, "thumImgUrl": "assets/re-zero.jpg", "numSeasons": 2, "state": "onGoing", "name": "Re:Zero − Starting Life in Another World", "meta": { "Author": "Tappei Nagatsuki", "Studio": "White Fox" }, "rating": 7 }, { "id": "JAXZ2gBnRgLNcWREKBgi", "lastUpdate": "2018-11-08T07:00:00.000Z", "name": "The Promised Neverland", "numEps": 2, "thumImgUrl": "assets/the-promised-neverland.jpg", "numSeasons": 1, "state": "finished", "meta": { "Author": "Kaiu Shirai", "Studio": "CloverWorks" }, "rating": 5 } ]'
    );
    const shows: Show[] = obj.map((show) => {
      return { ...show, lastUpdate: new Date(show.lastUpdate) };
    });

    // shows.map((show) => this.db.collection('shows').add(show));
  }

  addShowsToDB() {
    const shows = mockShows.map((show) => {
      return {
        ...show,
        id: this.db.createId(),
        numSeasons: Math.ceil(Math.random() * 2),
      };
    });
    const seasons = shows
      .map((show) => {
        const numSeasons = show.numSeasons;
        const seasons = Array.from(Array(numSeasons).keys()).map((i) => {
          const season: Season = {
            name: `Season ${i + 1}`,
            id: this.db.createId(),
            numEps: Math.ceil(Math.random() * 5),
            showId: show.id,
            lastUpdate: show.lastUpdate,
          };
          return season;
        });
        show.numEps = seasons.reduce(
          (prevVal, currentVal) => prevVal + currentVal.numEps,
          0
        );
        return seasons;
      })
      .reduce((prev, current) => prev.concat(current));

    const eps = seasons
      .map((season) => {
        const numEps = season.numEps;
        return Array.from(Array(numEps).keys()).map((idx) => {
          return {
            id: this.db.createId(),
            name: `Episode ${idx + 1}`,
            showId: season.showId,
            seasonId: season.id,
            lastUpdate: season.lastUpdate,
            idx: idx,
          };
        });
      })
      .reduce((prev, current) => prev.concat(current));

    shows.map((show) => this.db.collection('shows').add(show));
    eps.map((ep) => this.db.collection('eps').add(ep));
    seasons.map((season) => this.db.collection('seasons').add(season));
  }

  fetchActiveShow(showId: string): void {
    if (this.fetchActiveShowSub) this.fetchActiveShowSub.unsubscribe();

    this.fetchActiveShowSub = this.db
      .collection('shows', (ref) => ref.where('id', '==', showId))
      .valueChanges()
      .subscribe((shows: Show[]) => {
        if (shows.length == 1)
          this.store.dispatch(new Video.SetActiveShow(shows[0]));
      });
  }

  fetchSeasons(showId: string): void {
    if (this.fetchSeasonSub) this.fetchSeasonSub.unsubscribe();
    this.fetchSeasonSub = this.db
      .collection('seasons', (ref) => ref.where('showId', '==', showId))
      .valueChanges()
      .subscribe((seasons: Season[]) => {
        this.store.dispatch(new Video.SetFetchedSeasons(seasons));
      });
  }

  fetchEps(showId: string): void {
    if (this.fetchEpSub) this.fetchEpSub.unsubscribe();
    this.fetchEpSub = this.db
      .collection('eps', (ref) =>
        ref.where('showId', '==', showId).orderBy('idx')
      )
      .valueChanges()
      .subscribe((eps: Ep[]) => {
        this.store.dispatch(new Video.SetFetchedEps(eps));
      });
  }

  fetchFeaturedShow(): void {
    this.db
      .collection('featuredShows')
      .valueChanges()
      .subscribe((shows: FeaturedShow[]) =>
        this.store.dispatch(new Video.SetFeaturedShows(shows))
      );
  }

  fetchLatestShow(): void {
    this.uiService.startLoading();
    this.db
      .collection('shows')
      .snapshotChanges()
      .pipe(
        map((docArray) =>
          docArray.map((doc) => {
            let tmpShow = {
              id: doc.payload.doc.id as string,
              lastUpdate: null,
              ...(doc.payload.doc.data() as object),
            };
            tmpShow.lastUpdate = tmpShow.lastUpdate.toDate();
            return tmpShow;
          })
        )
      )
      .subscribe((shows: Show[]) => {
        this.store.dispatch(new Video.SetLatestShows(shows));
        this.uiService.stopLoading();
      });
  }

  getShowBannerImg(showId: string): string {
    return this._showWithBannerImg[showId];
  }
}
