/*
=========================================================
SPRINT 3 – REDUX STORE


TOPICS COVERED:


✓ configureStore
✓ Reducer Registration


WHY THIS FILE?


Single source of truth.


=========================================================
*/


import { configureStore } from "@reduxjs/toolkit";


import moviesReducer from "./movies/moviesSlice";


export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
