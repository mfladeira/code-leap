import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const isBrowser = typeof window !== 'undefined';

interface AuthState {
  user: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: isBrowser ? localStorage.getItem('user') ?? '' : '',
  isAuthenticated: isBrowser && localStorage.getItem('isAuthenticated') === 'true' ? true : false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.user = action.payload;
      state.isAuthenticated = true;

      if (isBrowser) {
        localStorage.setItem('user', action.payload);
        localStorage.setItem('isAuthenticated', 'true');
      }
    },
    logout(state) {
      state.user = '';
      state.isAuthenticated = false;

      if (isBrowser) {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    },
  },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
