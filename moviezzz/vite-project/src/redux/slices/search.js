import { createSlice } from '@reduxjs/toolkit';

import { fetchMoviesByFilters } from '../thunks/moviesThunks.js';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    ids: [],
    lastSearch: { name: '', year: '', genre: '' },
    status: 'idle',
    error: null,
  },

  reducers: {
    removeAll: (state) => {
      state.ids = [];
      state.lastSearch = { name: '', year: '', genre: '' };
      state.status = 'idle';
      state.error = null;
    },

    setLastSearch: (state, action) => {
      const newFilters = action.payload;
      state.lastSearch = { ...state.lastSearch, ...newFilters };
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByFilters.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMoviesByFilters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const ids = action.payload.map(movie => movie.id);
        state.ids = ids;
      })
      .addCase(fetchMoviesByFilters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectSearchIds = (state) => state.search.ids;
export const selectSearchStatus = (state) => state.search.status;
export const selectSearcherror = (state) => state.search.error;

export const selectLastSearch = (state) => state.search.lastSearch;

export const { removeAll, setLastSearch } = searchSlice.actions;
export default searchSlice.reducer;
  