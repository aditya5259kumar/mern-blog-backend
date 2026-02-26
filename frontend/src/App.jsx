import { Route, Routes, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";

const Signup = lazy(() => import("./pages/Signup"));
const Navbar = lazy(() => import("./components/Navbar"));
const Login = lazy(() => import("./pages/Login"));
const Footer = lazy(() => import("./components/Footer"));
const Blog = lazy(() => import("./pages/Blog"));
const CreateBlog = lazy(() => import("./pages/createBlog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Author = lazy(() => import("./pages/Author"));
const AuthorDetail = lazy(() => import("./pages/AuthorDetail"));
const Profile = lazy(() => import("./pages/profile"));
const Home = lazy(() => import("./pages/Home"));
const Category = lazy(() => import("./pages/Category"));

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
