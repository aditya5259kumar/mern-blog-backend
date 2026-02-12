import React from "react";
import { Editor } from "primereact/editor";

const CreateBlog = () => {
  return (
    <div className="py-20 container px-8 md:px-20 mx-auto">
      <h1 className="text-6xl text-gray-800 font-semibold text-center mb-6">
        Create Blogs
      </h1>
      <p className="text-gray-700 text-center px-4 md:px-6 lg:px-20 mb-15">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
        exercitationem porro? Ipsam debitis laboriosam quas, sint eveniet
        dignissimos alias at perferendis facere placeat quisquam?
      </p>
      <div className="">
        <div className="border ">
          <input
            type="text"
            placeholder="Blog Title"
            className="full border focus:focus-within:none"
          />
        </div>
        <Editor
          value=""
          onTextChange=""
          style={{ height: "320px" }}
          className="shadow-2xl"
        />
      </div>
    </div>
  );
};

export default CreateBlog;
