import {
  VideoActions,
  START_LOADING,
  STOP_LOADING,
  SET_LATEST_SHOWS,
  SET_FILTERED_SHOWS,
  SET_FEATURED_SHOWS,
  SET_FETCHED_SEASONS,
  SET_FETCHED_EPS,
  SET_ACTIVE_SHOW,
  SET_ACTIVE_EP,
  TOGGLE_PLAY,
  START_PLAYING,
  STOP_PLAYING,
} from './video.actions';
import { Show, Season, Ep, FeaturedShow } from './show.model';

export interface State {
  isLoading: boolean;
  latestShows: Show[];
  filteredShows: Show[];
  isPlaying: boolean;
  featuredShows: FeaturedShow[];
  fetchedSeasons: Season[];
  fetchedEps: Ep[];
  activeShow: Show;
  activeEp: Ep;
}

const initialState: State = {
  isLoading: false,
  latestShows: [],
  filteredShows: [],
  featuredShows: [],
  isPlaying: null,
  fetchedSeasons: [],
  fetchedEps: [],
  activeShow: null,
  activeEp: null,
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
    case SET_LATEST_SHOWS:
      return {
        ...state,
        latestShows: action.payload,
      };
    case SET_FILTERED_SHOWS:
      return {
        ...state,
        filteredShows: action.payload,
      };
    case SET_FEATURED_SHOWS:
      return {
        ...state,
        featuredShows: action.payload,
      };
    case SET_FETCHED_SEASONS:
      return {
        ...state,
        fetchedSeasons: action.payload,
      };
    case SET_FETCHED_EPS:
      return {
        ...state,
        fetchedEps: action.payload,
      };
    case SET_ACTIVE_SHOW:
      return {
        ...state,
        activeShow: action.payload,
      };
    case SET_ACTIVE_EP:
      return {
        ...state,
        activeEp: action.payload,
      };
    case TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case START_PLAYING:
      return {
        ...state,
        isPlaying: true,
      };
    case STOP_PLAYING:
      return {
        ...state,
        isPlaying: false,
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
export const getLatestShows = (state: State) => state.latestShows;
export const getFilteredShows = (state: State) => state.filteredShows;
export const getFeaturedShows = (state: State) => state.featuredShows;
export const getFetchedSeasons = (state: State) => state.fetchedSeasons;
export const getFetchedEps = (state: State) => state.fetchedEps;
export const getActiveShow = (state: State) => state.activeShow;
export const getActiveEp = (state: State) => state.activeEp;
export const getIsPlaying = (state: State) => state.isPlaying;
