
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string }>) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
