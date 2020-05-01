import * as fromVideo from './video-player/video.reducer';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface State {
  video: fromVideo.State;
}

export const reducers: ActionReducerMap<State> = {
  video: fromVideo.videoReducer,
};

export const getVideoState = createFeatureSelector<fromVideo.State>('video');
export const getIsLoading = createSelector(
  getVideoState,
  fromVideo.getIsLoading
);
export const getLatestShows = createSelector(
  getVideoState,
  fromVideo.getLatestShows
);

export const getFilteredShows = createSelector(
  getVideoState,
  fromVideo.getFilteredShows
);

export const getIsPlaying = createSelector(
  getVideoState,
  fromVideo.getIsPlaying
)
