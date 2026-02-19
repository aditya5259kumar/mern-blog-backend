import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// login api fetch-------------
export const loginUser = createAsyncThunk(
  "loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        userData,
      );

      toast.success("loggedIn successfully", { position: "top-center" });

      console.log("response.data---------", response.data);

      const token = response.data.data;

      console.log("token---------", token);

      localStorage.setItem("token", token);

      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

// signup api fetch-------------
export const signupUser = createAsyncThunk(
  "signupUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        userData,
      );

      toast.success("signeUp successfully", { position: "top-center" });

      console.log("response.data---------", response.data);

      const token = response.data.data;

      console.log("token---------", token);

      localStorage.setItem("token", token);

      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed",
      );
    }
  },
  );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      //login--------------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //signup----------
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
