import { VideoActions, START_LOADING, STOP_LOADING, SET_AVAILABLE_SHOWS } from './video.actions';
import { Show } from './show.model';

export interface State {
  isLoading: boolean;
  latestShows: Show[];
}

const initialState: State = {
  isLoading: false,
  latestShows: [
    // {
    //   lastUpdate: new Date(),
    //   name: '銀魂',
    //   id: '1',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/gintama.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '鬼滅',
    //   id: '2',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/kitsume-no-yaiba.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '銀魂',
    //   id: '1',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/gintama.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '鬼滅',
    //   id: '2',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/kitsume-no-yaiba.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '銀魂',
    //   id: '1',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/gintama.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '鬼滅',
    //   id: '2',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/kitsume-no-yaiba.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '銀魂',
    //   id: '1',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/gintama.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '鬼滅',
    //   id: '2',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/kitsume-no-yaiba.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '銀魂',
    //   id: '1',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/gintama.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '鬼滅',
    //   id: '2',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/kitsume-no-yaiba.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '銀魂',
    //   id: '1',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/gintama.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '鬼滅',
    //   id: '2',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/kitsume-no-yaiba.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '銀魂',
    //   id: '1',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/gintama.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '鬼滅',
    //   id: '2',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/kitsume-no-yaiba.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '銀魂',
    //   id: '1',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/gintama.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '鬼滅',
    //   id: '2',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/kitsume-no-yaiba.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '銀魂',
    //   id: '1',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/gintama.jpg',
    //   state: 'finished',
    // },
    // {
    //   lastUpdate: new Date(),
    //   name: '鬼滅',
    //   id: '2',
    //   numSeasons: 1,
    //   numEps: 10,
    //   thumImgUrl: 'assets/kitsume-no-yaiba.jpg',
    //   state: 'finished',
    // },
  ],
};

export function videoReducer(
  state: State = initialState,
  action: VideoActions
): State {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SET_AVAILABLE_SHOWS:
      return {
        ...state,
        latestShows: action.payload
      }
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
export const getLatestShows = (state: State) => state.latestShows;