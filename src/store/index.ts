import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
// Add more reducers here as needed

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware:any) =>
    getDefaultMiddleware({
      serializableCheck: false, // helpful in RN for things like Dates or Navigation
    }),
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
