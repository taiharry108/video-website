import * as fromVideo from './video-player/video.reducer';
import * as fromUI from './ui/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface State {
  video: fromVideo.State;
  ui: fromUI.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  video: fromVideo.videoReducer,
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(
  getAuthState,
  fromAuth.getIsAuth
);

export const getDisplayVEmailSent = createSelector(
         getAuthState,
         fromAuth.getDisplayVEmailSent
       );

export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(
  getUIState,
  fromUI.getIsLoading
);
export const getVideoState = createFeatureSelector<fromVideo.State>('video');
export const getLatestShows = createSelector(
  getVideoState,
  fromVideo.getLatestShows
);

export const getFilteredShows = createSelector(
  getVideoState,
  fromVideo.getFilteredShows
);

export const getFeaturedShows = createSelector(
  getVideoState,
  fromVideo.getFeaturedShows
);

export const getFetchedSeasons = createSelector(
  getVideoState,
  fromVideo.getFetchedSeasons
);

export const getActiveShow = createSelector(
  getVideoState,
  fromVideo.getActiveShow
);
export const getActiveEp = createSelector(getVideoState, fromVideo.getActiveEp);
export const getFetchedEps = createSelector(
  getVideoState,
  fromVideo.getFetchedEps
);

export const getIsPlaying = createSelector(
  getVideoState,
  fromVideo.getIsPlaying
);
