import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { getActions } from "store/actions/alertActions";
import { AppState } from "store/store-type";

const AlertNotification = () => {
  const dispatch = useDispatch();
  const { closeAlertMessage } = getActions(dispatch);

  const { showAlertMessage, alertMessageContent } = useSelector(
    (state: AppState) => state.alert
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      autoHideDuration={6000}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
  );
};

export default AlertNotification;
