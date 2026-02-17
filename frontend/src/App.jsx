import React from "react";
import { Route, Routes, Navigate } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/blog" element={<Blog />} />

        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/blog" replace />}
        />

        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/blog" replace />}
        />

        <Route
          path="/create-blog"
          element={token ? <CreateBlog /> : <Navigate to="/login" replace />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
