import { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { readBlogs } from "../redux/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

const Blog = () => {
  const {
    blogs,
    loading,
    error: authError,
  } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readBlogs());
  }, [dispatch]);

  return (
    <div className="py-20">
      <div className="container px-8 md:px-20 mx-auto">
        <h1 className="text-5xl md:text-6xl text-gray-800 font-bold text-center mb-6">
          Our Blogs
        </h1>
        <p className="text-gray-700 text-center px-4 md:px-6 lg:px-20 mb-15">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          exercitationem porro? Ipsam debitis laboriosam quas, sint eveniet
          dignissimos alias at perferendis facere placeat quisquam unde fugiat
          totam pariatur ullam aspernatur! Error soluta magni esse ducimus?
        </p>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="container  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-12 gap-y-16">
            {blogs.map((item) => (
              <Link to={`/blog/${item._id}`} key={item._id}>
                <BlogCard item={item} />
              </Link>
            ))}
          </div>
        )}
        {authError && (
          <p className="text-sm text-center text-red-700 mb-4">{authError}</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
