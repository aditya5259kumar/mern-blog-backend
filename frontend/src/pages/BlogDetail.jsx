import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { blogDetail, deleteBlog } from "../redux/slices/blogSlice";
import { toast } from "react-toastify";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    currentBlog,
    loading,
    error: authError,
  } = useSelector((state) => state.blog);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogDetail(id));
  }, [dispatch, id]);

  console.log("currentBlog=====", currentBlog);

  if (!currentBlog) return <p>No blog found</p>;

  const createdDate = currentBlog.createdAt;

  const date = new Date(createdDate);

  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");

  // console.log(formattedDate);

  // console.log("  currentLoggedInUser----",  user._id)
  // console.log("  current blog author id",  currentBlog.author._id)

  // if (currentBlog.author._id === user._id) {
  //   console.log("my blog=============================================");
  // }

  function blogDeleteHandler() {
    dispatch(deleteBlog(id));
    navigate("/blog");
    toast.success("blog deleted successfully.");
  }

  return (
    <div className="my-20">
      <div className="container px-8 md:px-20 mx-auto">
        {loading && <p className="text-center">Loading...</p>}
        <span className="block text-center font-medium mb-4">
          {formattedDate}
        </span>
        <h1 className="text-center text-3xl font-semibold">
          {currentBlog.title}
        </h1>
        <div className="my-8">
          <img
            src={`http://localhost:3000${currentBlog.images[0]}`}
            alt={currentBlog.title}
            className="w-full h-50 md:h-100 px-8 md:px-20 object-cover"
          />
        </div>
        <h4 className="text-center mb-8 font-semibold text-xl">
          Author - {currentBlog.author.userName}
        </h4>
        <div className="mb-6">{currentBlog.content}</div>
        {currentBlog.author._id === user._id && (
          <div className="flex justify-center gap-6 items-center">
            <button
              onClick={blogDeleteHandler}
              className="bg-red-700 py-3 px-5 rounded-lg text-white"
            >
              Delete Blog
            </button>
            <button className="bg-gray-700 py-3 px-5 rounded-lg text-white">
              Edit Blog
            </button>
          </div>
        )}
        {authError && (
          <p className="text-sm text-center text-red-700 mb-4">{authError}</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
