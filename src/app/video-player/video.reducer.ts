import {
  VideoActions,
  START_LOADING,
  STOP_LOADING,
  SET_LATEST_SHOWS,
  SET_FILTERED_SHOWS,
  SET_FEATURED_SHOWS,
  TOGGLE_PLAY,
  START_PLAYING,
  STOP_PLAYING,
} from './video.actions';
import { Show } from './show.model';

export interface State {
  isLoading: boolean;
  latestShows: Show[];
  filteredShows: Show[];
  isPlaying: boolean;
  featuredShows: Show[];
}

const initialState: State = {
  isLoading: false,
  latestShows: [],
  filteredShows: [],
  featuredShows: [],
  isPlaying: null,
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
export const getIsPlaying = (state: State) => state.isPlaying;
