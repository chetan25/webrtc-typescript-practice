import { AlertActions, AlertState, AlertActionType } from "store/store-type";

export const AlertInitialState: AlertState = {
  showAlertMessage: false,
  alertMessageContent: null,
};

const reducer = (state = AlertInitialState, action: AlertActionType) => {
  switch (action.type) {
    case AlertActions.OPEN_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: true,
        alertMessageContent: action.content,
      };
    case AlertActions.CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: false,
        alertMessageContent: null,
      };
    default:
      return state;
  }
};

export default reducer;
