import { useEffect, useState } from "react";
import { Link } from "react-router";
import { allAuthors } from "../redux/slices/authorSlice";
import AuthorCard from "../components/AuthorCard";
import { useDispatch, useSelector } from "react-redux";
import { searchAuthor } from "../redux/slices/authorSlice";

const Authors = () => {
  const [searchText, setSearchText] = useState("");

  const { authors } = useSelector((state) => state.author);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allAuthors());
  }, [dispatch]);

  // console.log("author----", authors);

  function handleSearch(e) {
    e.preventDefault();
    // console.log("handleSearch-----------------",searchText );
    dispatch(searchAuthor(searchText));
  }

  return (
    <div className="py-20">
      <div className="container px-8 md:px-20 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-center text-4xl md:text-6xl text-gray-800 font-bold mb-6">
            Meet our talented authors
          </h2>
          <p className="text-center text-gray-700 px-4 md:px-6 lg:px-20 mb-7">
            Whether you're looking for advice on business, health and wellness,
            technology, or anything in between, our team has got you covered.
            Meet our writers and discover their unique perspectives on the
            world.
          </p>
          {/* <Link
            to="/blog"
            className="bg-gray-800 text-white px-6 py-3 rounded-md"
          >
            View All Blogs
          </Link> */}
        </div>

        <form className="mb-20 md:mt-5 lg:mx-40  border border-gray-300 shadow-md bg-white flex justify-center items-center rounded-xl md:rounded-2xl overflow-hidden">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Authors"
            className="focus:outline-none  px-3 md:p-4 w-full"
          />
          <button
            onClick={handleSearch}
            className="py-3 md:py-4.5 px-4 md:px-7 font-semibold bg-gray-800 text-white cursor-pointer"
          >
            Search
          </button>
        </form>

        {authors.length === 0 && (
          <p className="text-gray-400 text-lg text-center border-t border-gray-300 pt-8">
            author with this username does not found!
          </p>
        )}

        <div className="mt-15 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {authors.map((author) => (
            <AuthorCard key={author._id} author={author} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Authors;
