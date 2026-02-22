import React from "react";
import authorImg from "../assets/author.jpg";
import { MdArrowOutward } from "react-icons/md";

const AuthorCard = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="overflow-hidden flex-1 rounded-lg">
        <img
          src={authorImg}
          alt=""
          className="h-40 w-full aspect-square object-cover "
        />
      </div>
      <div className="sm:flex-2 flex-1 ml-4 md:ml-8">
        <span className="font-bold text-lg">@aditya</span>
        <p className="line-clamp-3 sm:my-2.5 my-3.5 text-sm sm:text-base  text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus a
          iure assumenda cumque illo inventore nostrum ipsum aspernatur est.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
          laboriosam.
        </p>
        <button className="shadow-md group flex items-center gap-1 text-sm border border-gray-500 md:px-4 md:py-2 px-3 py-1.5 rounded-lg cursor-pointer text-gray-800 font-medium">
          View Profile
          <MdArrowOutward className="text-lg group-hover:rotate-45  transition-all duration-200 ease-in-out" />
        </button>
      </div>
    </div>
  );
};

export default AuthorCard;
