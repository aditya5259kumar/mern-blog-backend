import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readBlogs } from "../redux/slices/blogSlice";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router";
import { HiOutlineCalendar } from "react-icons/hi";

const Home = () => {
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readBlogs());
  }, [dispatch]);

  const mainHeroBlog = blogs[blogs.length - 1];

  // console.log("mainHeroBlog", mainHeroBlog);

  const createdDate = mainHeroBlog?.createdAt;

  const date = new Date(createdDate);

  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");

  return (
    <div className="py-20">
      <div className="container px-8 md:px-20 mx-auto">
        <div>
          <h1 className="leading-tight mb-8 text-4xl md:text-6xl font-bold text-gray-800 text-center">
            Stories That Shape the <br></br> Modern World
          </h1>
          <p className="text-gray-500 text-center px-4 md:px-6 lg:px-30 xl:px-70 mb-10">
            Dive into powerful insights across technology, business, science,
            lifestyle, culture, and beyond. We bring together ideas, trends, and
            perspectives that inform, inspire, and challenge the way you
            think.{" "}
          </p>
          <div className="font-medium mb-20 flex space-x-4 items-center justify-center">
            <Link
              to="blog"
              className="px-6 md:px-8  rounded-md py-2 md:py-3 text-white border-2 border-gray-800 bg-gray-800"
            >
              All Blogs
            </Link>
            <Link
              to="category"
              className="font-medium px-6 md:px-8  rounded-md py-2 md:py-3 text-gray-800 border-2 border-gray-800 bg-transparent"
            >
              Explore Categories
            </Link>
          </div>
        </div>

        <div className="mb-12 xl:w-4xl mx-auto group">
          <Link to={`/blog/${mainHeroBlog?._id}`}>
            <div className="overflow-hidden rounded-md md:rounded-lg">
              <img
                src={`http://localhost:3000${mainHeroBlog?.images[0]}`}
                alt={mainHeroBlog?.title}
                className="h-50 md:h-100 group-hover:scale-110 transition-all w-4xl object-cover"
              />
            </div>

            <div className=" p-2 xl:w-4xl ">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600 md:text-lg font-semibold">
                  @{mainHeroBlog?.author?.userName}
                </p>

                <div className="flex items-center space-x-2">
                  <HiOutlineCalendar className="text-lg" />
                  <span className="text-gray-600">{formattedDate}</span>
                </div>
              </div>
              <h4 className="text-start text-lg md:text-2xl font-medium">
                {mainHeroBlog?.title}
              </h4>
            </div>
          </Link>
        </div>

        <h5 className="text-3xl font-semibold border-b border-t border-gray-300 mb-12 py-4">
          Trending Blogs
        </h5>
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {blogs.slice(0, 3).map((item) => (
            <Link to={`/blog/${item._id}`} key={item._id}>
              <BlogCard item={item} />
            </Link>
          ))}
        </div>

        <h5 className="text-3xl font-semibold border-b border-t border-gray-300 my-12 py-4">
          Latest Blogs
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {blogs.slice(blogs.length - 3, blogs.length - 1).map((item) => (
            <Link to={`/blog/${item._id}`} key={item._id}>
              <BlogCard item={item} />
            </Link>
          ))}
        </div>

        <div className=" bg-gray-100 lg:mx-40 lg:py-20 md:py-12 py-8 px-10 md:px-20  rounded-xl mt-14">
          <h5 className="font-bold text-3xl mb-4 text-center text-gray-800">
            Subscribe to our newsletters
          </h5>
          <div className="flex flex-col space-y-2 text-sm">
            <p className="leading-7 mb-6 text-base md:text-lg text-gray-600 text-center">
              Subscribe our blog with unlimited access to all the post we offer.
            </p>
            <form action="">
              <div className="shadow-md bg-white flex justify-between items-center rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="focus:outline-none  px-3 md:p-4 w-full"
                />
                <button className="py-3 md:py-4.5 px-4 md:px-7 font-semibold bg-gray-800 text-white cursor-pointer">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
