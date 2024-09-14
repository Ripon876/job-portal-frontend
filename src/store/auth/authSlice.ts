import { AxiosError } from "axios";
import { apiClient } from "@/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: null | { email: string; token: string };
  loading: boolean;
  error: null | string;
}

interface ErrorPayload {
  status: string;
  message: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    loginData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post("/auth/login", loginData);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }

        return rejectWithValue(error.response.data);
      } else {
        throw error;
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as ErrorPayload).message || "Login failed";
      });
  },
});

export const { logout, resetError } = authSlice.actions;

export default authSlice.reducer;
