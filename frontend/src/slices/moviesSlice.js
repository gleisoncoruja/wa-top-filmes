import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moviesService from "../services/moviesService";

const initialState = {
  movies: [],
  error: null,
  success: false,
  loading: false,
  message: null,
};

export const getAllMovies = createAsyncThunk(
  "movies/listmovies",
  async (page, thunkAPI) => {
    const data = await moviesService.getAllMovies(page);
    return data;
  }
);

export const updateDataBase = createAsyncThunk(
  "movies/updatemovies",
  async (_, thunkAPI) => {
    const data = await moviesService.updateDataBase();

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.movies = action.payload;
      })
      .addCase(updateDataBase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDataBase.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Base de dados atualizada com sucesso!";
        state.movies = action.payload;
      })
      .addCase(updateDataBase.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      });
  },
});

export const { reset } = moviesSlice.actions;
export default moviesSlice.reducer;
