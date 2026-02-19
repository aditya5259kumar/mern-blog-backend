import { HiOutlineCalendar } from "react-icons/hi";

const BlogCard = ({ item }) => {
  // console.log("item", item);
  // console.log("item.author", item.author.userName);
  // console.log("item.images", item.images);

  const createdDate = item.createdAt;

  const date = new Date(createdDate);

  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");

  // console.log(formattedDate);

  return (
    <div className="w-full rounded-2xl group">
      <div className="overflow-hidden rounded-lg ">
        <img
          src={`http://localhost:3000${item.images[0]}`}
          alt={item.title}
          className=" h-50 md:h-60  w-full object-cover group-hover:scale-110 transition-all ease-in-out duration-300"
        />
      </div>
      <div className="">
        <div className="flex items-center space-x-4 my-5">
          {item.category.map((val) => (
            <button
              key={val}
              className="px-3 py-1 bg-gray-600 rounded-sm text-white text-sm"
            >
              {val}
            </button>
          ))}
          <p className="text-gray-600">
            <span className="">Author</span>{" "}-{" "}
            {item.author.userName}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
          <div className="flex items-center space-x-2">
            <HiOutlineCalendar className="text-lg" />
            <span className="text-gray-600">{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
