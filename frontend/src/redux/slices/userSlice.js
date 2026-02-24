import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// my profile
export const myProfile = createAsyncThunk(
  "user/myProfile",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:3000/api/my-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

// update profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:3000/api/profile-update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    blogs: [],
    totalBlogs: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // my profile
      .addCase(myProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(myProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.blogs = action.payload.blogs;
        state.totalBlogs = action.payload.totalBlogs;
      })
      .addCase(myProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
