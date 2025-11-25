import { createAsyncThunk } from "@reduxjs/toolkit";

import { getGenres } from "../../api/genresAPI.js";

export const fetchGenres = createAsyncThunk(
    "genres/fetchAll",
    async () => {
        const genres = await getGenres();        
        return genres;
    }
);