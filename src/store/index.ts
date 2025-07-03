import { configureStore } from '@reduxjs/toolkit';


import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware:any) =>
    getDefaultMiddleware({
      serializableCheck: false, // helpful in RN for things like Dates or Navigation
    }),
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
