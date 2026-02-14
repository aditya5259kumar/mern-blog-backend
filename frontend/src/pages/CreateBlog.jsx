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
    <div className="py-20 container px-8 md:px-20 mx-auto">
      <h1 className="text-5xl text-gray-800 font-semibold text-center mb-6">
        Create New Blog
      </h1>

      <form onSubmit={submitHandler}>
        {/* Title */}
        <div className="my-8">
          <h5>Blog Title</h5>
          {error.title && <p className="text-xs text-red-700">{error.title}</p>}
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handlerOnChnage}
            className="w-full border px-4 py-2"
          />
        </div>

        {/* Categories */}
        <div className="my-8">
          <h5>Blog Category</h5>
          {error.category && (
            <p className="text-xs text-red-700">{error.category}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-4">
            {AVAILABLE_CATEGORIES.map((val) => {
              const selected = blogData.category.includes(val);

              return (
                <span
                  key={val}
                  onClick={() => toggleCategory(val)}
                  className={`px-3 py-1 border rounded cursor-pointer ${
                    selected
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {val}
                </span>
              );
            })}
          </div>
        </div>

        {/* Images */}
        <div className="my-8">
          <h5>Add Images</h5>
          {error.image && <p className="text-xs text-red-700">{error.image}</p>}

          <label className="border bg-gray-200 border-dashed border-gray-500 flex items-center justify-center cursor-pointer py-10">
            + Click to Upload Images
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
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <span className="text-sm text-gray-700 truncate">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-red-600 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="my-8">
          <h5>Blog Content</h5>
          {error.content && (
            <p className="text-xs text-red-700">{error.content}</p>
          )}

          <Editor
            value={blogData.content}
            onTextChange={(e) => {
              setBlogData({
                ...blogData,
                content: e.htmlValue,
              });
              setError({ ...error, content: "" });
            }}
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

        <button
          type="submit"
          className="px-6 py-3 rounded-md bg-gray-800 text-white"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
