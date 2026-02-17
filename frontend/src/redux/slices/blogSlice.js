import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// readBlogs
export const readBlogs = createAsyncThunk(
  "blog/readBlogs",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/api/all-blogs");

      // console.log("response.data-------", response.data);

      // console.log("response.data.data-------", response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "something went Wrong",
      );
    }
  },
);

// createBlogs
export const createBlogs = createAsyncThunk(
  "blog/createBlogs",
  async (blogData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:3000/api/create-blog",
        blogData,
        config,
      );

      console.log("response.data-------", response.data);

      console.log("response.data.data-------", response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "something went Wrong",
      );
    }
  },
);

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
      // readBlogs
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
      })

      // createBlogs
      .addCase(createBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogs.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
