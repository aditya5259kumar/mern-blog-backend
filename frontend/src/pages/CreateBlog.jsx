import "../data/blogTextEditor.css";
import { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { AVAILABLE_CATEGORIES } from "../data/data";
import { HiX, HiOutlinePlusSm } from "react-icons/hi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { HiTrash } from "react-icons/hi";
import { HiLightBulb } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog, blogDetail, createBlogs } from "../redux/slices/blogSlice";
import { useNavigate, useParams } from "react-router";
import { IoSendSharp } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    category: [],
    image: [],
    content: "",
  });

  const [error, setError] = useState({});
  const MAX_IMAGES = 3;
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const { loading, error: authError } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const editMode = Boolean(id);
  const { currentBlog } = useSelector((state) => state.blog);

  // console.log(editMode);

  useEffect(() => {
    if (id) {
      dispatch(blogDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (editMode && currentBlog) {
      setBlogData({
        title: currentBlog.title,
        category: currentBlog.category,
        image: [],
        content: currentBlog.content,
      });
    }
  }, [editMode, currentBlog]);

  function handlerOnChnage(e) {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const newError = {};

    if (!blogData.title) {
      newError.title = "blog title is required";
    } else if (blogData.title.length > 120) {
      newError.title = "title can not be more than 120 characters!";
    }

    if (blogData.category.length === 0) {
      newError.category = "At least one category is required!";
    }

    if (!editMode && blogData.image.length === 0) {
      newError.image = "At least one image is required!";
    }

    if (!blogData.content) {
      newError.content = "Content is required!";
    } else if (blogData.content.length < 80) {
      newError.content = "Content must be at least 50 characters long!";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    if (!confirm("Ready to publish this blog?")) return;

    const formData = new FormData();

    formData.append("title", blogData.title);
    formData.append("content", blogData.content);

    blogData.category.forEach((cat) => {
      formData.append("category", cat);
    });

    blogData.image.forEach((file) => {
      formData.append("image", file);
    });

    if (editMode) {
      const result = await dispatch(updateBlog({ id, blogData: formData }));

      if (!result.error) {
        toast.success("Blog updated successfully");
        navigate("/blog");
      } else {
        toast.error("Update failed");
      }
    } else {
      const result = await dispatch(createBlogs(formData));

      if (!result.error) {
        toast.success("Blog created successfully");
        navigate("/");
      } else {
        toast.error("Creation failed");
      }
    }
  }

  function toggleCategory(category) {
    setBlogData((prev) => {
      const exists = prev.category.includes(category);

      if (!exists && prev.category.length >= 3) {
        setError((prev) => ({
          ...prev,
          category: "Maximum 3 categories allowed!",
        }));
        return prev;
      }

      return {
        ...prev,
        category: exists
          ? prev.category.filter((c) => c !== category)
          : [...prev.category, category],
      };
    });
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const existingImages = blogData.image;
    let imageErrors = [];
    let validNewImages = [];

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    for (let file of files) {
      if (existingImages.length + validNewImages.length >= MAX_IMAGES) {
        imageErrors.push(`You can upload maximum ${MAX_IMAGES} images.`);
        break;
      }

      if (!allowedTypes.includes(file.type)) {
        imageErrors.push(
          `${file.name} format not supported. Allowed: JPEG, PNG, WEBP.`,
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        imageErrors.push(`${file.name} exceeds 2MB size limit.`);
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

  function resetForm() {
    if (!confirm("Are you sure you want to reset blog?")) return;
    setBlogData({
      title: "",
      category: [],
      image: [],
      content: "",
    });
  }

  return (
    <div className="">
      <div className="bg-linear-to-r from-gray-900 to-gray-500 py-10 md:py-20">
        <h1 className="text-4xl md:text-5xl text-white font-semibold text-center mb-6">
          {editMode ? "# Edit Blog" : "# Create New Blog"}
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
          Fill in the information below to {editMode ? "Update" : "create"} your
          blog post
        </p>

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

        <div className="my-8">
          <h5 className="text-sm mb-1">
            Blog Category <span className="text-red-700">*</span>
          </h5>
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

        <div className="my-8">
          <h5 className="text-sm mb-1">
            Blog Images ( Max 3 )<span className="text-red-700">*</span>
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
              accept="image/jpeg,image/png,image/webp"
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
                    className="text-red-600 p-1 cursor-pointer"
                  >
                    <HiTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="my-8">
          <h5 className="text-sm mb-1">
            Blog Content <span className="text-red-700">*</span>
          </h5>
          {error.content && (
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

                  <span className="ql-formats">
                    <select className="ql-align">
                      <option defaultValue></option>
                      <option value="center"></option>
                      <option value="right"></option>
                      <option value="justify"></option>
                    </select>
                  </span>

                  <button className="ql-link" />
                  <button className="ql-blockquote" />
                  <button className="ql-code-block" />
                  <button className="ql-clean" />
                </span>
              }
              style={{ height: "360px" }}
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
            {authError && (
              <p className="text-sm mb-5 text-center text-red-700">
                {authError || "** Something Went Wrong! **"}
              </p>
            )}
            <span
              onClick={resetForm}
              className="px-6 mr-4 md:mr-10 py-3 rounded-md bg-gray-100 border border-gray-300 text-gray-600"
            >
              Reset
            </span>
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-gray-800 text-white"
            >
              {loading ? (
                "loading..."
              ) : editMode ? (
                <span className="flex items-center gap-2">
                  Update
                  <GrUpdate className="text-base" />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Publish
                  <IoSendSharp />
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
