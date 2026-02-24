import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import blogReducer from "./slices/blogSlice";
import userReducer from "./slices/userSlice";
import authorReducer from "./slices/authorSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    user: userReducer,
    author: authorReducer,
  },
});

export default store;
