import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// readBlogs
export const readBlogs = createAsyncThunk("blog", async (_, thunkAPI) => {
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
});

// readBlogs by category
export const blogCategory = createAsyncThunk(
  "blogCategory",
  async (category, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/category/${category}`,
      );

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

// read single blog
export const blogDetail = createAsyncThunk(
  "blog-detail",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/blog/${id}`);

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
  "createBlogs",
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

// deleteBlogs
export const deleteBlog = createAsyncThunk(
  "deleteBlog",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:3000/api/delete-blog/${id}`,
        config,
      );

      console.log("response.data-------", response.data);

      console.log("response.data.data-------", response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to delete blog",
      );
    }
  },
);

//update blog
export const updateBlog = createAsyncThunk(
  "updateBlog",
  async ({ id, blogData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:3000/api/update-blog/${id}`,
        blogData,
        config,
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to update blog",
      );
    }
  },
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    blogsWithSameCategory: [],
    currentBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // readBlogs---------
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

      // blogs with same category---------
      .addCase(blogCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(blogCategory.fulfilled, (state, action) => {
        state.blogsWithSameCategory = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(blogCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // read single blog--------------
      .addCase(blogDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(blogDetail.fulfilled, (state, action) => {
        state.currentBlog = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(blogDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createBlogs-------------
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
      })

      // deleteBlogs-------------
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const deletedId = action.payload;
        state.blogs = state.blogs.filter((blog) => blog._id !== deletedId);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateBlogs-------------
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedBlog = action.payload;

        state.blogs = state.blogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog,
        );

        state.currentBlog = updatedBlog;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
