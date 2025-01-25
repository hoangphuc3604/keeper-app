import api from "../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const get_ideas = createAsyncThunk(
  "ideas/get_ideas",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/ideas", {
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

export const add_idea = createAsyncThunk(
  "ideas/add_idea",
  async (idea, { fulfillWithValue, rejectWithValue }) => {
    console.log(idea);
    try {
      const { data } = await api.post("/ideas", idea, {
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

export const delete_idea = createAsyncThunk(
  "ideas/delete_idea",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    console.log(id);
    try {
      const { data } = api.delete(`/ideas/${id}`, {
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

export const ideaReducer = createSlice({
  name: "ideas",
  initialState: {
    ideas: [],
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    clearIdeaMessage: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_ideas.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_ideas.fulfilled, (state, action) => {
        state.loading = false;
        state.ideas = action.payload;
        state.success = action.payload;
      })
      .addCase(get_ideas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(add_idea.pending, (state) => {
        state.loading = true;
      })
      .addCase(add_idea.fulfilled, (state, action) => {
        state.loading = false;
        state.ideas.push(action.payload);
        state.success = action.payload;
      })
      .addCase(add_idea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete_idea.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete_idea.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(delete_idea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearIdeaMessage } = ideaReducer.actions;
export default ideaReducer.reducer;
