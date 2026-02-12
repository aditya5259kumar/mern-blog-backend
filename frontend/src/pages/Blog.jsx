import React from "react";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  return (
    <div className="py-20">
      <div className="container px-8 md:px-20 py-4 mx-auto">
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
