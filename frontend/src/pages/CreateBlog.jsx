import React from "react";
import { Editor } from "primereact/editor";

const CreateBlog = () => {
  return (
    <div className="py-20 container px-8 md:px-20 mx-auto">
      <h1 className="text-center text-5xl font-bold mb-10">Cretae Blog</h1>
      <p className="text-center mb-20 lg:px-20 md:px-10">
        Lorem ipsum dolor , maxime voluptates tempora? Culpa architecto saepe
        voluptatibus provident eius rem. Optio quaerat aliquam placeat eveniet
        molestiae, id ut quidem eligendi eum soluta modi, maiores rem illum
        earum dolorem ratione maxime perferendis neque, labore voluptate
        suscipit libero quam.
      </p>
      <div className="">
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
