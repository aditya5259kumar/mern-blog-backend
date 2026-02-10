import React from "react";
import blogCard from "../assets/blogCard.jpg";
import { HiOutlineCalendar } from "react-icons/hi";

const BlogCard = () => {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl">
        <img src={blogCard} alt="" className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="flex items-center space-x-6 my-5">
          <button className="px-3 py-1 bg-gray-600 rounded-sm text-white text-sm">
            Technology
          </button>
          <p className="text-gray-600">
            <span className="mr-2">By</span>
            Mary R. Edward
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">
            20 Wonderful Blog. Number 16 is Absolutely Stunning
          </h4>
          <div className="flex items-center space-x-2">
            <HiOutlineCalendar text-lg />
            <span className="text-gray-600">April 10, 2022</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
