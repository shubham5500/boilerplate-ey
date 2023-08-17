import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import logger from "redux-logger";
import clientOnboardingSlice from "../features/clientOnboarding/clientOnboardingSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    clientOnboarding: clientOnboardingSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
