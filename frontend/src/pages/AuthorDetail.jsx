// import BlogCard from "../components/BlogCard";
import { useEffect } from "react";
import { GoHeartFill } from "react-icons/go";
// import { HiOutlineCalendar } from "react-icons/hi";
import authorImg from "../assets/author.jpg";
// import imgsci from "../assets/demo.jpg";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authorDetail } from "../redux/slices/authorSlice";

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

  if (!singleAuthor) return <p>No blog found</p>;

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

  const joinedDate = formatDate(singleAuthor.createdAt);

  return (
    <div className="py-20 bg-gray-50">
      <div className="container px-8 xl:px-60 lg:px-40 mx-auto">
        <div className="pb-14 md:pb-20 flex gap-12 flex-col items-center text-center md:flex-row md:items-center md:text-left md:justify-between">
          <div className="flex gap-12 flex-col items-center text-center md:flex-row md:items-start md:text-left">
            <img
              src={authorImg}
              alt=""
              className="w-50 h-50 md:h-70 md:w-70 rounded-2xl object-cover"
            />

            <div>
              <div>
                <h4 className="text-4xl font-bold text-gray-800 capitalize">
                  {singleAuthor.userName}
                </h4>
                <p className="text-gray-400 text-xl font-semibold">
                  @{singleAuthor.userName}
                </p>
              </div>

              <p className="text-gray-500 mt-6">Member since {joinedDate}</p>
              <p className="text-2xl mt-1 font-medium text-gray-800">
                Published Blogs : <span className="font-bold">13</span>
              </p>
              <p className="text-sm mt-1 mb-6 text-gray-500">
                Total <span className="mx-1 font-medium">2343</span> likes
                <GoHeartFill className="inline mb-0.5 ml-1 text-red-600" />
              </p>

              <p className="text-gray-500 leading-relaxed max-w-3xl">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab
                corrupti incidunt ut nemo nisi, illo, molestiae et aut quidem
                magnam dolores quia voluptatibus commodi iusto explicabo, ea
                voluptatem aperiam consequuntur saepe non voluptates earum
                fugiat officiis a. Dignissimos dolores minima maxime incidunt
                pariatur debitis nulla optio blanditiis sequi consequatur?
                Reprehenderit voluptatum odit nemo neque dolorum illum nisi
                fugiat facilis. Consequatur.
              </p>
            </div>
          </div>
        </div>

        <h4 className="border-b text-3xl md:text-4xl border-gray-300 capitalize font-semibold pb-3">
          {singleAuthor.userName}'s published blogs
        </h4>
      </div>
    </div>
  );
};

export default AuthorDetail;
