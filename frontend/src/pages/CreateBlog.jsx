// import React, { useState, useEffect } from "react";

// import { Editor } from "primereact/editor";
// import { AVAILABLE_CATEGORIES } from "../data/data";

// const CreateBlog = () => {
//   const [blogData, setBlogData] = useState({
//     title: "",
//     category: [],
//     image: [],
//     content: "",
//   });
//   const [error, setError] = useState({});
//   const MAX_IMAGES = 5;
//   const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

//   function handlerOnChnage(e) {
//     setBlogData({ ...blogData, [e.target.name]: e.target.value });
//     setError({ ...error, [e.target.name]: "" });
//   }

//   function submitHandler(e) {
//     e.preventDefault();
//     const newError = {};

//     if (!blogData.title) {
//       newError.title = "blog title is required";
//     } else if (blogData.title.length > 120) {
//       newError.title = "title can not be more then 120 characters!.";
//     }

//     if (blogData.category.length === 0) {
//       newError.category = "At least one category is required!";
//     } else if (blogData.category.length > 4) {
//       newError.category = "more than 4 category can not be selected!";
//     }

//     if (blogData.image.length === 0) {
//       newError.image = "At least one image is required!";
//     }

//     if (!blogData.content) {
//       newError.content = "content is required!";
//     } else if (blogData.content.length < 50) {
//       newError.content = "Content must be at least 50 characters long!";
//     }

//     if (Object.keys(newError).length > 0) {
//       setError(newError);
//       return;
//     }
//     setError({});
//     console.log("form submitted", blogData);
//   }

//   function toggleCategory(category) {
//     setBlogData((prev) => {
//       const exists = prev.category.includes(category);

//       return {
//         ...prev,
//         category: exists
//           ? prev.category.filter((c) => c !== category) // remove
//           : [...prev.category, category], // add
//       };
//     });

//     setError((prev) => ({ ...prev, category: "" }));
//   }

//   function handleImageChange(e) {
//     const files = Array.from(e.target.files);
//     if (!files.length) return;

//     const existingImages = blogData.image;
//     let imageErrors = [];
//     let validNewImages = [];

//     for (let file of files) {
//       // Max count validation
//       if (existingImages.length + validNewImages.length >= MAX_IMAGES) {
//         imageErrors.push(`You can upload maximum ${MAX_IMAGES} images.`);
//         break;
//       }

//       // Type validation
//       const allowedTypes = [
//         "image/jpeg",
//         "image/png",
//         "image/webp",
//         "image/gif",
//         "image/bmp",
//       ];

//       if (!allowedTypes.includes(file.type)) {
//         imageErrors.push(
//           `${file.name} format not supported. Allowed: JPEG, PNG, WEBP, GIF, BMP.`,
//         );
//         continue;
//       }

//       // Size validation
//       if (file.size > MAX_FILE_SIZE) {
//         imageErrors.push(`${file.name} exceeds 2MB size limit.`);
//         continue;
//       }

//       // Duplicate validation
//       const duplicate = existingImages.some(
//         (img) =>
//           img.file.name === file.name &&
//           img.file.size === file.size &&
//           img.file.lastModified === file.lastModified,
//       );

//       if (duplicate) {
//         imageErrors.push(`${file.name} is already uploaded.`);
//         continue;
//       }

//       // ✅ Create preview ONCE
//       validNewImages.push({
//         file,
//         preview: URL.createObjectURL(file),
//       });
//     }

//     if (validNewImages.length > 0) {
//       setBlogData((prev) => ({
//         ...prev,
//         image: [...prev.image, ...validNewImages],
//       }));
//     }

//     if (imageErrors.length > 0) {
//       setError((prev) => ({
//         ...prev,
//         image: imageErrors.join(" "),
//       }));
//     } else {
//       setError((prev) => ({
//         ...prev,
//         image: "",
//       }));
//     }

//     e.target.value = "";
//   }

//   function removeImage(index) {
//     setBlogData((prev) => {
//       const imageToRemove = prev.image[index];

//       // revoke only the removed one
//       URL.revokeObjectURL(imageToRemove.preview);

//       return {
//         ...prev,
//         image: prev.image.filter((_, i) => i !== index),
//       };
//     });

//     setError((prev) => ({
//       ...prev,
//       image: "",
//     }));
//   }

//   useEffect(() => {
//     return () => {
//       blogData.image.forEach((img) => {
//         URL.revokeObjectURL(img.preview);
//       });
//     };
//   }, []);

//   return (
//     <div className="py-20 container px-8 md:px-20 mx-auto">
//       <h1 className="text-5xl text-gray-800 font-semibold text-center mb-6">
//         Create New Blog
//       </h1>
//       <p className="text-gray-700 text-center px-4 md:px-6 lg:px-20 mb-15">
//         Share your thoughts, ideas, and stories with the world
//       </p>

//       <form className="" onSubmit={submitHandler}>
//         {/* <h4>Blog Details</h4>
//         <p>Fill in the information below to create your blog post</p> */}

//         <div className="my-8">
//           <h5>blog title</h5>
//           {error.title && (
//             <p className="pl-1 text-xs text-red-700 pt-1">{error.title}</p>
//           )}
//           <div className="relative border border-gray-300">
//             <input
//               type="text"
//               placeholder="title"
//               name="title"
//               value={blogData.title}
//               onChange={handlerOnChnage}
//               className="w-full text-lg  px-4 focus:outline-none focus:border-none py-2"
//             />
//             <span
//               className={`absolute right-1 -bottom-2 text-xs px-1 bg-white ${blogData.title.length > 120 ? "text-red-700" : "text-gray0400"} `}
//             >
//               {blogData.title.length}/120
//             </span>
//           </div>
//         </div>

//         <div className="my-8">
//           <h5>blog category</h5>
//           {error.category && (
//             <p className="pl-1 text-xs text-red-700 pt-1">{error.category}</p>
//           )}
//           <div className="flex">
//             <div className="flex flex-wrap gap-3 mt-4 border border-gray-300 p-2">
//               {AVAILABLE_CATEGORIES.map((val) => {
//                 const selected = blogData.category.includes(val);

//                 return (
//                   <span
//                     key={val}
//                     onClick={() => toggleCategory(val)}
//                     className={`px-3 py-1 border rounded cursor-pointer transition
//           ${
//             selected
//               ? "bg-gray-800 text-white border-gray-800"
//               : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//           }
//         `}
//                   >
//                     {val}
//                   </span>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         <div className="my-8">
//           <h5>Add Images</h5>
//           {error.image && (
//             <p className="pl-1 text-xs text-red-700 pt-1">{error.image}</p>
//           )}
//           {/* Upload Box */}
//           <label
//             className="border bg-gray-200 border-dashed border-gray-500
//                hover:bg-gray-300 transition
//                flex items-center justify-center
//                cursor-pointer py-10"
//           >
//             + Click to Upload Images
//             <input
//               type="file"
//               multiple
//               accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
//               className="hidden"
//               onChange={handleImageChange}
//             />
//           </label>

//           {/* Preview Section */}
//           {blogData.image.length > 0 && (
//             <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
//               {blogData.image.map((img, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={img.preview}
//                     alt="preview"
//                     className="h-40 w-full object-cover rounded"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-2 right-2
//                        bg-black bg-opacity-70
//                        text-white px-2 py-1
//                        text-xs rounded"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="">
//           <h5>blog content</h5>
//           {error.content && (
//             <p className="pl-1 text-xs text-red-700 pt-1">{error.content}</p>
//           )}

//           <Editor
//             value={blogData.content}
//             onTextChange={(e) => {
//               setBlogData({
//                 ...blogData,
//                 content: e.htmlValue,
//               });
//               setError({ ...error, content: "" });
//             }}
//             headerTemplate={
//               <span className="ql-formats">
//                 <select className="ql-font" defaultValue="">
//                   <option value="sans-serif" />
//                   <option value="serif" />
//                   <option value="monospace" />
//                 </select>

//                 <select className="ql-header" defaultValue="">
//                   <option value="1" />
//                   <option value="2" />
//                   <option value="3" />
//                   <option value="" />
//                 </select>

//                 <button className="ql-bold" />
//                 <button className="ql-italic" />
//                 <button className="ql-underline" />

//                 <button className="ql-list" value="ordered" />
//                 <button className="ql-list" value="bullet" />

//                 <select className="ql-align" />

//                 <button className="ql-link" />
//               </span>
//             }
//             style={{ height: "320px" }}
//             className="shadow-2xl"
//           />
//         </div>

//         <div className=" mt-10 flex gap-6 items-center justify-end">
//           <span className="px-6 py-3 rounded-md border-2 border-gray-300 text-gray-800">
//             cancel
//           </span>
//           <button
//             type="submit"
//             className="px-6 py-3 rounded-md bg-gray-800 text-white"
//           >
//             publish
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateBlog;

import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { AVAILABLE_CATEGORIES } from "../data/data";
import { HiX, HiOutlinePlusSm } from "react-icons/hi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { HiTrash } from "react-icons/hi";
import { HiLightBulb } from "react-icons/hi";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    category: [],
    image: [],
    content: "",
  });

  const [error, setError] = useState({});
  const MAX_IMAGES = 5;
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  function handlerOnChnage(e) {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  function submitHandler(e) {
    e.preventDefault();
    const newError = {};

    if (!blogData.title) {
      newError.title = "blog title is required";
    } else if (blogData.title.length > 120) {
      newError.title = "title can not be more than 120 characters!";
    }

    if (blogData.category.length === 0) {
      newError.category = "At least one category is required!";
    } else if (blogData.category.length > 4) {
      newError.category = "More than 4 categories cannot be selected!";
    }

    if (blogData.image.length === 0) {
      newError.image = "At least one image is required!";
    }

    if (!blogData.content) {
      newError.content = "Content is required!";
    } else if (blogData.content.length < 50) {
      newError.content = "Content must be at least 50 characters long!";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    setError({});
    console.log("Form submitted:", blogData);
  }

  function toggleCategory(category) {
    setBlogData((prev) => {
      const exists = prev.category.includes(category);

      return {
        ...prev,
        category: exists
          ? prev.category.filter((c) => c !== category)
          : [...prev.category, category],
      };
    });

    setError((prev) => ({ ...prev, category: "" }));
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const existingImages = blogData.image;
    let imageErrors = [];
    let validNewImages = [];

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/bmp",
    ];

    for (let file of files) {
      if (existingImages.length + validNewImages.length >= MAX_IMAGES) {
        imageErrors.push(`You can upload maximum ${MAX_IMAGES} images.`);
        break;
      }

      if (!allowedTypes.includes(file.type)) {
        imageErrors.push(
          `${file.name} format not supported. Allowed: JPEG, PNG, WEBP, GIF, BMP.`,
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        imageErrors.push(`${file.name} exceeds 2MB size limit.`);
        continue;
      }

      const duplicate = existingImages.some(
        (img) =>
          img.name === file.name &&
          img.size === file.size &&
          img.lastModified === file.lastModified,
      );

      if (duplicate) {
        imageErrors.push(`${file.name} is already uploaded.`);
        continue;
      }

      validNewImages.push(file);
    }

    if (validNewImages.length > 0) {
      setBlogData((prev) => ({
        ...prev,
        image: [...prev.image, ...validNewImages],
      }));
    }

    setError((prev) => ({
      ...prev,
      image: imageErrors.length ? imageErrors.join(" ") : "",
    }));

    e.target.value = "";
  }

  function removeImage(index) {
    setBlogData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));

    setError((prev) => ({
      ...prev,
      image: "",
    }));
  }

  return (
    <div className="">
      <div className="bg-linear-to-r from-gray-900 to-gray-500 py-10 md:py-20">
        <h1 className="text-4xl md:text-5xl text-white font-semibold text-center mb-6">
          # Create New Blog
        </h1>
        <p className="text-center text-sm md:text-lg text-white px-20 md:px-8 ">
          Share your thoughts, ideas, and stories with the world
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        className="py-20 container px-8 md:px-20 mx-auto"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 ">
          Blog Details
        </h3>
        <p className="font-semibold text-sm md:text-[16px] text-gray-700 pb-2 mb-8 border-b border-gray-500">
          Fill in the information below to create your blog post
        </p>

        {/* Title */}
        <div className="my-8">
          <h5 className="text-sm mb-1">
            Blog Title <span className="text-red-700 mb-1">*</span>
          </h5>
          {error.title && (
            <p className="text-xs text-red-700 mb-1">{error.title}</p>
          )}
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={blogData.title}
            onChange={handlerOnChnage}
            className={`w-full text-xl capitalize border border-gray-300 rounded-lg focus:border-gray-600 focus:outline-none px-4 py-3`}
          />
        </div>

        {/* Categories */}
        <div className="my-8">
          <h5 className="text-sm mb-1">
            Blog Category <span className="text-red-700">*</span>
          </h5>
          {error.title && (
            <p className="text-xs text-red-700">{error.category}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-4">
            {AVAILABLE_CATEGORIES.map((val) => {
              const selected = blogData.category.includes(val);

              return (
                <span
                  key={val}
                  onClick={() => toggleCategory(val)}
                  className={`flex items-center text-sm px-3 py-1 rounded cursor-pointer ${
                    selected
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {!selected && (
                    <HiOutlinePlusSm className="text-sm font-bold mt-0.5 mr-2" />
                  )}
                  {val}
                  {selected && (
                    <HiX className="text-sm font-bold mt-0.5 ml-2" />
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Images */}
        <div className="my-8">
          <h5 className="text-sm mb-1">
            Blog Images <span className="text-red-700">*</span>
          </h5>
          {error.image && (
            <p className="text-xs text-red-700 mb-3">{error.image}</p>
          )}

          <label className="transition-all rounded-lg border-2 border-gray-300 bg-gray-100 border-dashed hover:border-gray-600 flex flex-col gap-4 items-center justify-center cursor-pointer py-5">
            <HiOutlinePhotograph className="text-4xl text-gray-500" />
            <div>
              <p className=" text-gray-600 text-sm font-medium">
                Click to upload images
              </p>
              <p className="text-xs text-center mt-1 text-gray-400">
                (Max 2MB each)
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {blogData.image.length > 0 && (
            <div className="mt-6 space-y-2">
              {blogData.image.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border border-gray-500 p-2 rounded"
                >
                  <span className="text-sm text-gray-600 truncate">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-red-600 p-1 cursor-pointer hover:bg-red-200 transition-all rounded"
                  >
                    <HiTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="my-8">
          <h5 className="text-sm mb-1">
            Blog Content <span className="text-red-700">*</span>
          </h5>
          {error.title && (
            <p className="text-xs text-red-700 mb-3">{error.content}</p>
          )}

          <div
            className={`rounded-lg overflow-hidden border ${
              error.content ? "border-red-500" : "border-gray-300"
            }`}
          >
            <Editor
              value={blogData.content}
              onTextChange={(e) => {
                setBlogData({
                  ...blogData,
                  content: e.htmlValue,
                });
                setError({ ...error, content: "" });
              }}
              placeholder="Start writing your amazing blog content here..."
              className="shadow-xl overflow-hidden"
              headerTemplate={
                <span className="ql-formats">
                  <select className="ql-header" defaultValue="">
                    <option value="1">Heading</option>
                    <option value="2">Subheading</option>
                    <option value="">Normal</option>
                  </select>

                  <button className="ql-bold" />
                  <button className="ql-italic" />
                  <button className="ql-underline" />
                  <button className="ql-strike" />

                  <select className="ql-color" />
                  <select className="ql-background" />

                  <button className="ql-list" value="ordered" />
                  <button className="ql-list" value="bullet" />

                  <button className="ql-link" />
                  <button className="ql-blockquote" />
                  <button className="ql-code-block" />
                  <button className="ql-clean" />
                </span>
              }
              style={{ height: "320px" }}
            />
          </div>
        </div>

        <div className="md:flex block items-start justify-between">
          <div className=" my-6 md:my-0 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <HiLightBulb className="text-xl text-yellow-500" /> Tips for a
              Great Blog
            </h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li>Write a catchy title that captures readers attention</li>
              <li>
                Select relevant categories to help readers discover your content
              </li>
              <li>
                Include high-quality images to make your blog visually appealing
              </li>
              <li>
                Write engaging content with proper formatting using the editor
                tools
              </li>
            </ul>
          </div>

          <div className="">
            {/* <p className="text-sm mb-5 text-center text-red-700">
              ** Something Went Wrong! **
            </p> */}
            <span
              onClick={() =>
                setBlogData({
                  title: "",
                  category: [],
                  image: [],
                  content: "",
                })
              }
              className="px-6 mr-4 md:mr-10 py-3 rounded-md bg-gray-100 border border-gray-300 text-gray-600"
            >
              Reset
            </span>
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-gray-800 text-white"
            >
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
