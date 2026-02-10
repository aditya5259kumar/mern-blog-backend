import React from "react";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  return (
    <div className="my-10">
      <div className="container px-8 py-4 mx-auto">
        <div className="container  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
