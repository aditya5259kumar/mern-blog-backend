import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { blogDetail, deleteBlog } from "../redux/slices/blogSlice";
import { toast } from "react-toastify";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiDotsVertical,
} from "react-icons/hi";
import pfp from "../assets/defaultUser.jpg";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogSetting, setBlogSetting] = useState(false);

  function blogSettingHandler() {
    setBlogSetting((prev) => !prev);
  }

  const [likeIcon, setLikeIcon] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  function likeHandler() {
    if (likeIcon) {
      setLikeIcon(false);
      setLikeCount(likeCount - 1);
    } else if (!likeIcon) {
      setLikeIcon(true);
      setLikeCount(likeCount + 1);
    }
  }

  const {
    currentBlog,
    loading,
    error: authError,
  } = useSelector((state) => state.blog);

  const { user, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogDetail(id));
  }, [dispatch, id]);

  // console.log("currentBlog=====", currentBlog);

  if (!currentBlog) return <p>No blog found</p>;

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (loading) {
    return <p>loading...</p>;
  }

const formatDate = (dateString) => {
  return new Date(dateString)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");
};

const formattedCreatedDate = formatDate(currentBlog.createdAt);
const formattedUpdatedDate = formatDate(currentBlog.updatedAt);

  // console.log("  currentLoggedInUser----",  user._id)
  // console.log("  current blog author id",  currentBlog.author._id)

  // if (currentBlog.author._id === user._id) {
  //   console.log("my blog=============================================");
  // }

  const isAuthor =
    currentBlog &&
    user &&
    currentBlog.author &&
    currentBlog.author._id === user._id;

  function blogDeleteHandler() {
    if (!confirm("Are you sure you want to delete this blog??")) return;
    dispatch(deleteBlog(id));
    navigate("/blog");
    toast.success("blog deleted successfully.");
  }

  function blogEditHandler() {
    if (!confirm("Are you sure you want to edit this blog?")) return;
    navigate(`/edit-blog/${currentBlog._id}`);
  }

  return (
    <div className=" my-15">
      <div className="container px-8 xl:px-60 lg:px-40 mx-auto">
        {loading && <p className="text-center">Loading...</p>}

        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200">
          <span className="text-lg font-medium text-gray-500">
            {formattedCreatedDate}
          </span>

          {isAuthor && (
            <div className="relative">
              <button
                onClick={blogSettingHandler}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <HiDotsVertical className="text-gray-600 text-2xl" />
              </button>

              {blogSetting && (
                <div className="absolute right-5 top-10 w-36 bg-gray-50 rounded-lg  shadow-xl z-8">
                  <button
                    onClick={blogDeleteHandler}
                    className="cursor-pointer w-full px-4 py-2.5 text-sm border-b font-medium border-gray-200 text-red-700 transition-all flex items-center justify-between gap-2"
                  >
                    Delete <HiOutlineTrash className="text-lg" />
                  </button>
                  <button
                    onClick={blogEditHandler}
                    className="cursor-pointer w-full px-4 py-2.5 text-sm font-medium text-zinc-700 transition-all flex items-center justify-between gap-2 border-t border-gray-100"
                  >
                    Edit <HiOutlinePencil className="text-lg" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <h1 className="text-4xl text-gray-800 md:text-5xl font-bold leading-snug">
          {currentBlog.title}
        </h1>

        <div className="flex flex-wrap gap-2 mt-6 mb-7  items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={pfp} alt="" className="w-10 h-10 rounded-full" />
            <h4 className=" text-center font-semibold text-lg">
              @{currentBlog.author.userName}
            </h4>
          </div>
          <span className="block text-gray-500 lg:text-lg font-medium">
            ( Updated On: {formattedUpdatedDate} )
          </span>
        </div>

        <div className="mb-4 overflow-hidden rounded-2xl shadow-xl">
          <img
            src={`http://localhost:3000${currentBlog.images[0]}`}
            alt={currentBlog.title}
            className="w-full h-70 md:h-100 object-cover "
          />
        </div>

        <div className="mt-6 mb-5 flex flex-wrap gap-x-4 gap-y-2">
          {currentBlog.category.map((val) => (
            <button
              key={val}
              className="px-4 py-2 bg-gray-600 rounded-md text-white text-sm"
            >
              {val}
            </button>
          ))}
        </div>

        <div
          className="blog-content mb-6"
          dangerouslySetInnerHTML={{ __html: currentBlog.content }}
        />

        <div className="flex justify-between items-center border-t pt-6 border-gray-300">
          <div
            onClick={likeHandler}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-2xl">
              {likeIcon ? (
                <GoHeartFill className="text-red-700 group-hover:scale-110 transition-all" />
              ) : (
                <GoHeart className="group-hover:scale-110 transition-all" />
              )}
            </span>
            <p className="font-semibold">{likeCount}</p>
          </div>

          <div className="flex items-center gap-1 sm:gap-4 font-bold">
            <span className="text-lg font-bold"> Share blog:</span>
            <div className="flex space-x-2 items-center text-lg">
              <span className="p-1 text-xl text-gray-900 rounded-md hover:-translate-y-1 transition-all ease-in-out duration-200">
                <FaFacebookF />
              </span>
              <span className="p-1 text-xl text-gray-900 rounded-md hover:-translate-y-1 transition-all ease-in-out duration-200">
                <FaInstagram />
              </span>
              <span className="p-1 text-xl text-gray-900 rounded-md hover:-translate-y-1 transition-all ease-in-out duration-200">
                <FaXTwitter />
              </span>

              <span className="p-1 text-xl text-gray-900 rounded-md hover:-translate-y-1 transition-all ease-in-out duration-200">
                <FaLinkedinIn />
              </span>
            </div>
          </div>
        </div>

        {authError && (
          <p className="text-sm text-center text-red-700 mb-4">{authError}</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
