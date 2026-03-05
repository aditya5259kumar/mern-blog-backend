import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  blogDetail,
  deleteBlog,
  toggleLikeBlog,
  viewBlog,
} from "../redux/slices/blogSlice";
import { toast } from "react-toastify";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiDotsVertical,
} from "react-icons/hi";
import defaultUser from "../assets/defaultUser.jpg";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import { FaRegEye } from "react-icons/fa6";

import DOMPurify from "dompurify";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogSetting, setBlogSetting] = useState(false);

  function blogSettingHandler() {
    setBlogSetting((prev) => !prev);
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
    dispatch(viewBlog(id));
  }, [dispatch, id]);

  // console.log("currentBlog=====", currentBlog);

  if (loading || isLoading) {
    return <p>loading...</p>;
  }

  if (!currentBlog) {
    return <p>No blog found</p>;
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

  const isAuthor =
    currentBlog &&
    user &&
    currentBlog.author &&
    currentBlog.author._id === user._id;

  function likeHandler() {
    if (loading) return;
    dispatch(toggleLikeBlog(id));
  }

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

        <div className="flex flex-wrap gap-2 mt-4 mb-5  items-center justify-between">
          <Link
            to={`/author/${currentBlog.author?._id}`}
            className="py-2 px-4 rounded-2xl transition-all flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
          >
            <img
              src={
                currentBlog?.author?.profilePhoto
                  ? `http://localhost:3000${currentBlog?.author?.profilePhoto}`
                  : defaultUser
              }
              alt=""
              className="w-10 h-10 object-cover rounded-full"
            />
            <h4 className=" text-center font-semibold text-lg">
              @{currentBlog.author.userName}
            </h4>
          </Link>
          <span className="block text-gray-500 lg:text-lg font-medium">
            ( Updated On: {formattedUpdatedDate} )
          </span>
        </div>

        {/* --------------------------------------- */}

        <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper mb-4 overflow-hidden rounded-2xl shadow-xl"
        >
          {currentBlog?.images.map((item) => (
            <SwiperSlide key={item}>
              <img
                src={`http://localhost:3000${item}`}
                className="w-full h-70 md:h-100 object-cover"
                alt={currentBlog.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --------------------------------------- */}

        {/* <div className="mb-4 overflow-hidden rounded-2xl shadow-xl">
          <img
            src={`http://localhost:3000${currentBlog.images[0]}`}
            alt={currentBlog.title}
            className="w-full h-70 md:h-100 object-cover "
          />
        </div> */}

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
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(currentBlog.content, {
              ALLOWED_TAGS: [
                "p",
                "b",
                "i",
                "em",
                "strong",
                "h1",
                "h2",
                "h3",
                "ul",
                "ol",
                "li",
                "blockquote",
                "code",
                "a",
                "br",
                // "span",
              ],
              ALLOWED_ATTR: ["href", "target", "rel"],
            }),
          }}
        />

        <div className="block md:flex justify-between items-center border-t pt-6 border-gray-300">

          <div className="flex items-center border-none md:border-b border-gray-300 pb-6 mb-4 gap-6">
            <div
              onClick={likeHandler}
              className="flex items-center gap-1 cursor-pointer"
            >
              <span className="text-2xl">
                {currentBlog.isLiked ? (
                  <IoHeartSharp className="text-red-700" />
                ) : (
                  <IoHeartOutline className="text-gray-800" />
                )}
              </span>
              <p className="font-semibold">{currentBlog.likesCount}</p>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xl">
                <FaRegEye className="text-gray-800 transition-all" />
              </span>
              <p className="font-semibold">{currentBlog.views}</p>
            </div>
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
