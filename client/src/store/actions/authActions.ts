import * as api from "@/api";
import { openAlertMessage } from "./alertActions";
import { AppDispatch } from "store/store";
import { UserDetails } from "store/store-type";
import { NavigateFunction } from "react-router-dom";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch: AppDispatch) => {
  return {
    login: (userDetails: UserDetails, history: NavigateFunction) =>
      dispatch(login(userDetails, history)),
    register: (userDetails: UserDetails, history: NavigateFunction) =>
      dispatch(register(userDetails, history)),
    setUserDetails: (userDetails: UserDetails) =>
      dispatch(setUserDetails(userDetails)),
  };
};

const setUserDetails = (userDetails: UserDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (userDetails: UserDetails, history: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    const response = await api.login(userDetails);
    console.log({ history });
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response.data!));
    } else {
      const { user } = response?.data!;
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUserDetails(userDetails));
      history("/dashboard");
    }
  };
};

const register = (userDetails: UserDetails, history: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    const response = await api.register(userDetails);
    console.log(response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response.data!));
    } else {
      const { user } = response?.data!;
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUserDetails(userDetails));
      history("/dashboard");
    }
  };
};
