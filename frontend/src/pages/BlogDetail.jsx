import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { blogDetail } from "../redux/slices/blogSlice";

const BlogDetail = () => {
  const { id } = useParams();

  const {
    currentBlog,
    loading,
    error: authError,
  } = useSelector((state) => state.blog);
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

  console.log(formattedDate);


  return (
    <div className="my-20">
      <div className="container px-8 md:px-20 mx-auto">
        {loading && <p className="text-center">Loading...</p>}

        <span className="block text-center font-medium mb-4">{formattedDate}</span>
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

        <div>{currentBlog.content}</div>

        {authError && (
          <p className="text-sm text-center text-red-700 mb-4">{authError}</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
