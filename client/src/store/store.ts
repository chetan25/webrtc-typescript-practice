// import { composeWithDevTools } from "redux-devtools-extension";
// import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthInitialState } from "./reducers/authReducer";
import alertReducer, { AlertInitialState } from "./reducers/alertReducer";
import friendReducer, { FriendsInitialState } from "./reducers/friends";
import chatReducer, { ChatInitialState } from "./reducers/chat";
import roomReducer, { RoomInitialState } from "./reducers/room";
import { AppState } from "store/store-type";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     alert: alertReducer,
//     friends: friendReducer,
//     chat: chatReducer,
//     room: roomReducer,
//   },
//   middleware: [composeWithDevTools, thunk],
// });

// const rootReducer = combineReducers({
//   auth: authReducer,
//   alert: alertReducer,
//   friends: friendReducer,
//   chat: chatReducer,
//   room: roomReducer,
// });

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

const initialState: AppState = {
  auth: AuthInitialState,
  alert: AlertInitialState,
  friends: FriendsInitialState,
  chat: ChatInitialState,
  room: RoomInitialState,
};

export const configureAppStore = (preloadedState: AppState = initialState) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      alert: alertReducer,
      friends: friendReducer,
      chat: chatReducer,
      room: roomReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });

  return store;
};

const store = configureAppStore();
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
