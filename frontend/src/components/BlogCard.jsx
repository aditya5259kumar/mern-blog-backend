import { HiOutlineCalendar } from "react-icons/hi";

const BlogCard = ({ item }) => {
  // console.log("item", item);
  // console.log("item.author", item.author.userName);
  // console.log("item.images", item.images);

  return (
    <div className="w-full rounded-2xl">
      <div className="overflow-hidden rounded-lg">
        <img src={`http://localhost:3000${item.images[0]}`} alt={item.title} />
      </div>
      <div className="">
        <div className="flex items-center space-x-6 my-5">
          {item.category.map((val) => (
            <button
              key={val}
              className="px-3 py-1 bg-gray-600 rounded-sm text-white text-sm"
            >
              {val}
            </button>
          ))}
          <p className="text-gray-600">
            <span className="mr-2">By</span>
            {item.author.userName}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
          <div className="flex items-center space-x-2">
            <HiOutlineCalendar className="text-lg" />
            <span className="text-gray-600">{item.createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
