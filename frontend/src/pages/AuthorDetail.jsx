import { useEffect } from "react";
import { GoHeartFill } from "react-icons/go";
// import { HiOutlineCalendar } from "react-icons/hi";
import defaultUser from "../assets/defaultUser.jpg";
// import imgsci from "../assets/demo.jpg";
import { Link, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authorDetail } from "../redux/slices/authorSlice";
import BlogCard from "../components/BlogCard";

const AuthorDetail = () => {
  const { id } = useParams();

  const {
    singleAuthor,
    loading,
    // error: authError,
  } = useSelector((state) => state.author);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authorDetail(id));
  }, [dispatch, id]);

  // console.log("singleAuthor==========>", singleAuthor);

  if (loading) return <p>Loading...</p>;

  if (!singleAuthor.author) return <p>Author not found</p>;

  const formatDate = (dateString) => {
    return new Date(dateString)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", "");
  };

  const joinedDate = formatDate(singleAuthor.author.createdAt);

  // console.log("singleAuthor.blogs-------------", singleAuthor.blogs);

  return (
    <div className="py-20 bg-gray-50">
      <div className="container px-8 xl:px-60 lg:px-40 mx-auto">
        <div className="pb-14 flex gap-12 flex-col items-center text-center md:flex-row md:items-center md:text-left md:justify-between">
          <div className="flex gap-12 flex-col items-center text-center md:flex-row md:items-start md:text-left">
            <img
              src={
                singleAuthor?.author?.profilePhoto
                  ? `http://localhost:3000${singleAuthor?.author?.profilePhoto}`
                  : defaultUser
              }
              alt=""
              className="w-50 h-50 md:h-70 md:w-70 rounded-2xl object-cover"
            />

            <div>
              <div>
                <h4 className="text-4xl my-2 font-semibold text-gray-800 capitalize">
                  {!singleAuthor?.author?.name ||
                  singleAuthor.author.name === "null"
                    ? singleAuthor.author.userName
                    : singleAuthor.author.name}
                </h4>
                <p className="text-gray-400 text-xl font-semibold">
                  @{singleAuthor.author.userName}
                </p>
              </div>

              <p className="text-gray-500 mt-2 leading-relaxed max-w-3xl">
                {!singleAuthor?.author?.bio ||
                singleAuthor.author.bio === "null"
                  ? "No Bio Yet."
                  : singleAuthor.author.bio}
              </p>

              <p className="text-gray-800 my-6">
                ( Member since {joinedDate} )
              </p>
              <p className="text-2xl mt-1 font-medium text-gray-800">
                Published Blogs :{" "}
                <span className="font-bold">{singleAuthor.totalBlogs}</span>
              </p>
              <p className="text-sm mt-1 mb-6 text-gray-500">
                Total <span className="mx-1 font-medium">2343</span> likes
                <GoHeartFill className="inline mb-0.5 ml-1 text-red-600" />
              </p>
            </div>
          </div>
        </div>

        <h4 className="border-b text-3xl md:text-4xl border-gray-300 capitalize font-semibold pb-3">
          {singleAuthor.author.userName}
          's published blogs
        </h4>
        <div className="container mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {singleAuthor.blogs.map((item) => (
            <Link to={`/blog/${item._id}`} key={item._id}>
              <BlogCard item={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
