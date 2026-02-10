import React from "react";
import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
