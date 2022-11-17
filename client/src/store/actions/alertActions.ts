import { AppDispatch } from "store/store";
import { AlertActions } from "store/store-type";

// const alertActions = {
//   OPEN_ALERT_MESSAGE: "ALERT.OPEN_ALERT_MESSAGE",
//   CLOSE_ALERT_MESSAGE: "ALERT.CLOSE_ALERT_MESSAGE",
// };

export const getActions = (dispatch: AppDispatch) => {
  return {
    openAlertMessage: (content: string) => dispatch(openAlertMessage(content)),
    closeAlertMessage: () => dispatch(closeAlertMessage()),
  };
};

export const openAlertMessage = (content: string) => {
  return {
    type: AlertActions.OPEN_ALERT_MESSAGE,
    content,
  };
};

export const closeAlertMessage = () => {
  return {
    type: AlertActions.CLOSE_ALERT_MESSAGE,
  };
};

// export default alertActions;
