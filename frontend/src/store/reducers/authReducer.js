import api from "./../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const user_login = createAsyncThunk(
  "auth/user_login",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", info);
      localStorage.setItem("token", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const user_register = createAsyncThunk(
  "auth/user_register",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/register", info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = null;
      localStorage.removeItem("token");
    },
    clearMessage: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(user_login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(user_login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = payload;
    });
    builder.addCase(user_login.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });

    builder.addCase(user_register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(user_register.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = payload;
    });
    builder.addCase(user_register.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });

    builder.addCase(get_user_info.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(get_user_info.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.success = true;
    });
    builder.addCase(get_user_info.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
  },
});

export const { logout, clearMessage } = authReducer.actions;
export default authReducer.reducer;
