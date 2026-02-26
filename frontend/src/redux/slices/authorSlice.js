import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// all authors
export const allAuthors = createAsyncThunk(
  "allAuthors",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/api/all-authors");
      //   console.log("response.data---------->", response.data);
      return response.data.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.data.message || "failed to fetch authors");
    }
  },
);

// authors detail
export const authorDetail = createAsyncThunk(
  "authorDetail",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/author/${id}`,
      );
      // console.log("response.data---------->", response.data);
      return response.data.data;
    } catch (error) {
      thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to fetch authors",
      );
    }
  },
);

//search author
export const searchAuthor = createAsyncThunk(
  "searchAuthor",
  async (search, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/search-author?search=${search}`,
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to search author",
      );
    }
  },
);

const authorSlice = createSlice({
  name: "author",
  initialState: {
    authors: [],
    singleAuthor: {
      author: null,
      blogs: [],
      totalBlogs: null,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // all authors
    builder
      .addCase(allAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(allAuthors.fulfilled, (state, action) => {
        state.authors = action.payload;
        state.loading = false;
      })
      .addCase(allAuthors.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // authors detail
    builder
      .addCase(authorDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(authorDetail.fulfilled, (state, action) => {
        state.singleAuthor = action.payload;
        state.loading = false;
      })
      .addCase(authorDetail.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // search blogs-------------
      .addCase(searchAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAuthor.fulfilled, (state, action) => {
        state.authors = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(searchAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authorSlice.reducer;
