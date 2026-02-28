import React, { useEffect, useState } from "react";
import { AVAILABLE_CATEGORIES } from "../data/data";
import { blogCategory } from "../redux/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router";

const Category = () => {
  let defaultBlogCategory = "Technology";
  const [categoryName, setCategoryName] = useState(defaultBlogCategory);

  const { token } = useSelector((state) => state.auth);
  const { blogsWithSameCategory, loading } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogCategory(defaultBlogCategory));
  }, [dispatch]);

  function handleCategory(category) {
    console.log(category);
    dispatch(blogCategory(category));
    setCategoryName(category);
    // console.log("blogsWithSameCategory---------", blogsWithSameCategory);
  }

  return (
    <div className="py-15 md:py-20">
      <div className="container px-8 md:px-20 mx-auto">
        <h2 className="text-5xl md:text-6xl text-gray-800 font-bold text-center mb-8">
          Explore Topics
        </h2>
        <p className="text-gray-700 text-center px-4 md:px-6 lg:px-20 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          exercitationem porro? Ipsam debitis laboriosam quas, sint eveniet
          dignissimos alias at perferendis facere placeat quisquam unde fugiat
          totam pariatur ullam aspernatur! Error soluta magni esse ducimus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ducimus!
        </p>
        <div className="flex flex-wrap items-center justify-center space-x-2 md:space-x-4 space-y-3">
          {AVAILABLE_CATEGORIES.map((item) => (
            <button
              onClick={() => {
                handleCategory(item);
              }}
              key={item}
              className={`text-sm md:text-base cursor-pointer md:px-5 md:py-2 px-4 py-1.5 rounded-lg transition-all duration-200 
    ${
      item === categoryName
        ? "bg-gray-800 text-white border-gray-800"
        : " text-gray-800 bg-gray-100"
    }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div>
          <h5 className="text-3xl font-semibold border-b border-gray-300 my-12 pb-2">
            Blog Category : {categoryName}
          </h5>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : blogsWithSameCategory.length === 0 ? (
            <p className="text-center w-full text-gray-500 text-lg">
              Blog with this category did not exist.
            </p>
          ) : (
            <div className="container  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-12 gap-y-16">
              {blogsWithSameCategory.map((item) => (
                <Link
                  to={token ? `/blog/${item._id}` : "/login"}
                  key={item._id}
                >
                  <BlogCard item={item} />
                </Link>
              ))}
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Category;
