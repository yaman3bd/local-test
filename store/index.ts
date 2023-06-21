import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";


import { apiSlice } from "./slices/api/apiSlice";

export const store = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware);
    }
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const storeWrapper = createWrapper<AppStore>(store, { debug: false });
export default store;
