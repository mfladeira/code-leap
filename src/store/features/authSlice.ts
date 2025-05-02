import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: string;
}

const initialState: AuthState = {
  user: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = '';
    },
  },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
