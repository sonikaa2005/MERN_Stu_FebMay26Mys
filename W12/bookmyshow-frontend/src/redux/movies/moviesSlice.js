/*
=========================================================
SPRINT 3 – MOVIES REDUX SLICE


TOPICS COVERED:


✓ Redux Toolkit
✓ createSlice
✓ createAsyncThunk
✓ Async State


WHY THIS FILE?


Movie discovery is shared state.


Many components may need:


✓ Movies
✓ Pagination
✓ Filters
✓ Loading Status


=========================================================
*/


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import { getMovies } from "../../api/movie.api";


/*
=========================================================
ASYNC THUNK


Dispatch
↓
Pending
↓
Fulfilled / Rejected


=========================================================
*/


export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (filters, thunkAPI) => {
    try {
      return await getMovies(filters);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch movies",
      );
    }
  },
);


const initialState = {
  movies: [],


  pagination: {
    page: 1,
    limit: 5,
    total: 0,
  },


  loading: false,


  error: null,
};


const moviesSlice = createSlice({
  name: "movies",


  initialState,


  reducers: {},


  extraReducers: (builder) => {
    builder


      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })


      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;


        state.movies = action.payload.data.movies;


        state.pagination = action.payload.data.pagination;
      })


      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;


        state.error = action.payload;
      });
  },
});


export default moviesSlice.reducer;
