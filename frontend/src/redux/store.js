import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import blogReducer from "./slices/blogSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    user: userReducer,
  },
});

export default store;
