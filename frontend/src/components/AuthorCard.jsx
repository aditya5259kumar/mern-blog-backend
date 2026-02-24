import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router";
import defaultUser from "../assets/defaultUser.jpg";

const AuthorCard = ({ author }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="overflow-hidden flex-1 rounded-lg">
        <img
          src={
            author?.profilePhoto
              ? `http://localhost:3000${author.profilePhoto}`
              : defaultUser
          }
          alt="Author"
          className="h-40 w-full aspect-square object-cover"
        />
      </div>
      <div className="sm:flex-2 flex-1 ml-4 md:ml-8">
        <span className="font-bold text-lg">@{author.userName}</span>
        <p className="line-clamp-3 sm:my-2.5 my-3.5 text-sm sm:text-base  text-gray-500">
          {author.bio}
        </p>
        <Link to={`/author/${author._id}`}>
          <button className="group flex items-center gap-1 text-sm border border-gray-500 md:px-4 md:py-2 px-3 py-1.5 rounded-lg cursor-pointer text-gray-800 font-medium">
            View Profile
            <MdArrowOutward className="text-lg group-hover:rotate-45  transition-all duration-200 ease-in-out" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthorCard;
