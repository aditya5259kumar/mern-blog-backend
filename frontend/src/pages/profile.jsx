import React from "react";
import authorImg from "../assets/author.jpg";

const profile = () => {
  return (
    <div className="py-20">
      <div className="container px-8 md:px-20 mx-auto">

        <div className="flex flex-col items-center">
          <div>
            <img src={authorImg} alt="" className="h-50 w-full" />
          </div>
          <div>
            profile details
          </div>
        </div>

      </div>
    </div>
  );
};

export default profile;
