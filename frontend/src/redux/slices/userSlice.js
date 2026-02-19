import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const myProfile = createAsyncThunk("myProfile", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "http://localhost:3000/api/my-profile",
      config,
    );
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "failed to fetch!",
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(myProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(myProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
