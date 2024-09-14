import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import jobReducer from "./job/jobSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
