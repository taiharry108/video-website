import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const DISPLAY_VERFICIATION_EMAIL_SENT =
  '[Auth] Display Verification Email Sent';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class DisplayVerificationEmailSent implements Action {
  readonly type = DISPLAY_VERFICIATION_EMAIL_SENT;
  constructor(public payload: boolean) {}
}

export type AuthActions =
  | SetAuthenticated
  | SetUnauthenticated
  | DisplayVerificationEmailSent;
