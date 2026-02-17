import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const readBlogs = createAsyncThunk("readBlogs", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:3000/api/all-blogs");

    console.log("response.data-------", response.data);

    console.log("response.data.data-------", response.data.data);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "something went Wrong",
    );
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(readBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(readBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(readBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
