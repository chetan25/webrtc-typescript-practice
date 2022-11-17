import { AuthActions, AuthState, AuthActionType } from "store/store-type";

export const AuthInitialState: AuthState = {
  userDetails: null,
};

const reducer = (state = AuthInitialState, action: AuthActionType) => {
  switch (action.type) {
    case AuthActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    default:
      return state;
  }
};

export default reducer;
