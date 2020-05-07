import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  DISPLAY_VERFICIATION_EMAIL_SENT
} from './auth.actions';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';

export interface State {
  isAuthenticated: boolean;
  displayVerificationEmailSent: boolean;
}
const initialState: State = {
  isAuthenticated: false,
  displayVerificationEmailSent: false
};

export function authReducer(
  state: State = initialState,
  action: AuthActions
): State {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
      };
    case DISPLAY_VERFICIATION_EMAIL_SENT:
      return {
        ...state,
        displayVerificationEmailSent: action.payload,
      };
    default:
      return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getDisplayVEmailSent = (state: State) => state.displayVerificationEmailSent;
