import { AxiosError } from "axios";
import { apiClient } from "@/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: null | { email: string; token: string; role: "user" | "admin" };
  loading: boolean;
  error: null | string;
  success: boolean;
}

interface ErrorPayload {
  status: string;
  message: string;
  errors: { msg: string }[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  success: false,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    signupData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post("/auth/signup", signupData);
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

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/user/me");
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
    resetSuccess(state) {
      state.success = false;
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
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        const paylod = action.payload as ErrorPayload;

        state.loading = false;
        state.error =
          paylod?.errors?.[0].msg || paylod.message || "Login failed";
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signup.rejected, (state, action) => {
        const paylod = action.payload as ErrorPayload;

        state.loading = false;
        state.error =
          paylod?.errors?.[0].msg || paylod.message || "Signup failed";
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as ErrorPayload).message || "Failed to fetch user";
      });
  },
});

export const { logout, resetError, resetSuccess } = authSlice.actions;

export default authSlice.reducer;
