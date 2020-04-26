import { Action } from '@ngrx/store';
import { Show } from './show.model';

export const START_LOADING = '[Video] Start Loading';
export const STOP_LOADING = '[Video] Stop Loading';
export const SET_AVAILABLE_SHOWS = '[Video] Set Available Shows';

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export class SetLatestShows implements Action {
  readonly type = SET_AVAILABLE_SHOWS;
  constructor(public payload: Show[]) {}
}

export type VideoActions = StartLoading | StopLoading | SetLatestShows;
