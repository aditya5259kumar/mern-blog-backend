import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myProfile, updateProfile } from "../redux/slices/userSlice";
import { IoMdAdd } from "react-icons/io";
import { GoHeartFill } from "react-icons/go";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router";
import defaultUser from "../assets/defaultUser.jpg";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { user, blogs, totalBlogs, loading, error } = useSelector(
    (state) => state.user,
  );

  console.log("user----------------", user);
  // console.log("blogs----------------", blogs);
  // console.log("totalBlogs----------------", totalBlogs);

  const fileRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    dispatch(myProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData(user);
      setOriginalData({ ...user });
    }
  }, [user]);

  const handleEdit = () => {
    setOriginalData({ ...formData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const preview = URL.createObjectURL(file);
    setPreviewImage(preview);
  };

  const handleUpdate = () => {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("bio", formData.bio);

    if (selectedFile) {
      data.append("pfp", selectedFile); // MUST match upload.single("pfp")
    }

    dispatch(updateProfile(data));
    setPreviewImage(null);
    setSelectedFile(null);
    setIsEditing(false);
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-20 text-red-500 font-semibold">{error}</p>
    );
  }

  if (!formData) return null;

  const formatDate = (dateString) => {
    return new Date(dateString)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", "");
  };

  const joinedDate = formatDate(user.createdAt);

  return (
    <div className="py-20 bg-gray-50">
      <div className="container px-8 xl:px-60 lg:px-40 mx-auto">
        <div className="pb-14 flex flex-col md:flex-row gap-12 items-center md:items-start">
          <div
            onClick={() => isEditing && fileRef.current.click()}
            className="relative group cursor-pointer"
          >
            <img
              src={
                previewImage
                  ? previewImage
                  : formData.profilePhoto
                    ? `http://localhost:3000${formData.profilePhoto}`
                    : defaultUser
              }
              alt="profile"
              className="w-50 h-50 md:h-70 md:w-70 rounded-2xl object-cover"
            />

            {isEditing && (
              <>
                <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute -bottom-2 -right-2 bg-white shadow-xl p-3 rounded-xl text-2xl">
                  <IoMdAdd />
                </span>
              </>
            )}
          </div>

          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

          <div className="flex-1 w-full text-center md:text-start">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-center md:text-start w-full focus:outline-none border-b text-4xl font-semibold text-gray-800 capitalize"
              />
            ) : (
              <h4 className="text-4xl font-semibold text-gray-800 capitalize">
                {formData.name !== null ? formData.name : formData.userName}
              </h4>
            )}

            <p className="text-gray-400 text-xl font-semibold mt-1">
              @{formData.userName}
            </p>
            <p className="text-gray-800 text-base font-semibold mt-1">
              Email : {formData.email}
            </p>

            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="text-center md:text-start border-b focus:outline-none mt-4 w-full min-h-32 text-gray-600"
              />
            ) : (
              <p className="text-gray-500 mt-2 leading-relaxed max-w-3xl">
                {formData.bio !== null ? formData.bio : "No Bio yet"}
              </p>
            )}

            <p className="text-gray-800 my-6">( Member since {joinedDate} )</p>

            <p className="text-2xl mt-1 font-medium text-gray-800">
              Published Blogs:
              <span className="font-bold">{totalBlogs}</span>
            </p>

            <p className="text-sm mt-1 text-gray-500">
              Total <span className="mx-1 font-medium">2344</span> likes
              <GoHeartFill className="inline ml-1 text-red-600" />
            </p>

            <div className="mt-10 flex gap-6 items-center md:justify-start justify-center">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="border-2 bg-gray-800 text-white px-5 py-2 cursor-pointer rounded-md"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="border-2 border-gray-300 font-medium text-gray-600 px-6 py-3 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className=" bg-gray-800 text-white px-6 py-3 rounded-lg cursor-pointer"
                  >
                    Update Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

{blogs.length === 0 && (<div>
  <p className="text-gray-400 text-lg text-center border-t border-gray-300 pt-8">No Published blogs</p>
</div>)
}
        {blogs.length !== 0 && (
          <div>
            <h4 className="border-b text-3xl md:text-4xl border-gray-300 capitalize font-semibold pb-3">
              {user.userName}
              's published blogs
            </h4>
            <div className="container mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {blogs.map((item) => (
                <Link to={`/blog/${item._id}`} key={item._id}>
                  <BlogCard item={item} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
