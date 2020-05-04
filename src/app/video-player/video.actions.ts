import { Action } from '@ngrx/store';
import { Show } from './show.model';

export const START_LOADING = '[Video] Start Loading';
export const STOP_LOADING = '[Video] Stop Loading';
export const SET_LATEST_SHOWS = '[Video] Set Latest Shows';
export const SET_FILTERED_SHOWS = '[Video] Set Filtered Shows';
export const SET_FEATURED_SHOWS = '[Video] Set Featured Shows';
export const TOGGLE_PLAY = '[Video] Toggle Play';
export const START_PLAYING = '[Video] Start Playing';
export const STOP_PLAYING = '[Video] Stop Playing';


export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export class SetLatestShows implements Action {
  readonly type = SET_LATEST_SHOWS;
  constructor(public payload: Show[]) {}
}

export class SetFilteredShows implements Action {
  readonly type = SET_FILTERED_SHOWS;
  constructor(public payload: Show[]) {}
}

export class SetFeaturedShows implements Action {
  readonly type = SET_FEATURED_SHOWS;
  constructor(public payload: Show[]) {}
}

export class TogglePlay implements Action {
  readonly type = TOGGLE_PLAY;
}

export class StartPlaying implements Action {
  readonly type = START_PLAYING;
}

export class StopPlaying implements Action {
  readonly type = STOP_PLAYING;
}

export type VideoActions =
  | StartLoading
  | StopLoading
  | SetLatestShows
  | SetFilteredShows
  | TogglePlay
  | StartPlaying
  | StopPlaying
  | SetFeaturedShows;
