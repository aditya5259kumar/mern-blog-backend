import { Route, Routes, Navigate } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/createBlog";
import { useSelector } from "react-redux";
import BlogDetail from "./pages/BlogDetail";
import ContactUs from "./pages/ContactUs";
import Author from "./pages/Author";
import AuthorDetail from "./pages/AuthorDetail";
import Profile from "./pages/profile";
import Home from "./pages/Home";
import Category from "./pages/Category";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/category" element={<Category />} />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        <Route path="/author" element={<Author />} />
        <Route path="/author/:id" element={<AuthorDetail />} />

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

        <Route
          path="/edit-blog/:id"
          element={token ? <CreateBlog /> : <Navigate to="/login" replace />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
