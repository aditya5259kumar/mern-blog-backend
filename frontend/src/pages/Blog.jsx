import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { readBlogs } from "../redux/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { searchBlog } from "../redux/slices/blogSlice";
import SkeletonCard from "../components/SkeletonCard";

const Blog = () => {
  const [searchText, setSearchText] = useState("");

  const { token } = useSelector((state) => state.auth);

  const {
    blogs,
    loading,
    error: authError,
  } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readBlogs());
  }, [dispatch]);

  function handleSearch(e) {
    e.preventDefault();
    // console.log("handleSearch-----------------",searchText );
    dispatch(searchBlog(searchText));
  }

  return (
    <div className="py-20">
      <div className="container px-8 md:px-20 mx-auto">
        <h1 className="text-5xl md:text-6xl text-gray-800 font-bold text-center mb-6">
          Our Blogs
        </h1>
        <p className="text-gray-600 text-center px-4 md:px-6 lg:px-20 mb-10 md:mb-15">
          Discover insights, stories, and ideas across multiple categories.
          Browse the latest posts from our community and explore content that
          matches your interests. Sign in to read full articles and engage with
          detailed blog content.
        </p>

        <form className="mb-20 md:my-20 lg:mx-40  border border-gray-300 shadow-md bg-white flex justify-center items-center rounded-xl md:rounded-2xl overflow-hidden">
          <input
            type="text"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Search Blogs"
            className="focus:outline-none  px-3 md:p-4 w-full"
          />
          <button
            onClick={handleSearch}
            className="py-3 md:py-4.5 px-4 md:px-7 font-semibold bg-gray-800 text-white cursor-pointer"
          >
            Search
          </button>
        </form>

        {!loading && blogs.length === 0 && (
          <p className="text-gray-400 mb-4 text-lg text-center border-t border-gray-300 pt-8">
            Blog with this title does not exist!
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : blogs.map((item) => (
                <Link
                  to={token ? `/blog/${item._id}` : "/login"}
                  key={item._id}
                >
                  <BlogCard item={item} />
                </Link>
              ))}
        </div>

        {authError && (
          <p className="text-sm text-center text-red-700 mb-4">{authError}</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
