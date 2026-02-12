import React from "react";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  return (
    <div className="py-20">
      <div className="container px-8 md:px-20 mx-auto">
        <h1 className="text-6xl text-gray-800 font-semibold text-center mb-6">
          Our Blogs
        </h1>
        <p className="text-gray-700 text-center px-4 md:px-6 lg:px-20 mb-15">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          exercitationem porro? Ipsam debitis laboriosam quas, sint eveniet
          dignissimos alias at perferendis facere placeat quisquam unde fugiat
          totam pariatur ullam aspernatur! Error soluta magni esse ducimus?
        </p>
        <div className="container  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-10 gap-y-16">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default Blog;
