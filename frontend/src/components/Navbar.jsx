import React, { useState, useEffect } from "react";
import black_beog_logo from "../assets/63e6fae264e26f6039829955_beog.svg";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import { NAVBMENU } from "../data/data";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import pfp from "../assets/defaultUser.jpg";
import { myProfile } from "../redux/slices/userSlice";

const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);

  function handleSideBar() {
    setSideBar((prev) => !prev);
  }

  const { token } = useSelector((state) => state.auth);
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAuth() {
    if (token) {
      if (!confirm("Are you sure you want to logout?")) return;
      dispatch(logout());
      toast.success("LogOut successfully", { position: "top-center" });
      navigate("/login");
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (token) {
      dispatch(myProfile());
    }
  }, [dispatch, token]);

  // console.log(user);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <header className="shadow-md sticky top-0 left-0 right-0 bg-white z-10">
        <div className="container px-8 md:px-20 py-4 mx-auto">
          <div className=" flex items-center justify-between">
            <div className="overflow-hidden relative z-10 cursor-pointer">
              <img src={black_beog_logo} alt="beog-logo" className="h-10" />
            </div>

            <nav className="hidden md:flex font-medium gap-8 items-center justify-center">
              {NAVBMENU.map((value, index) => (
                <Link
                  key={index}
                  to={value.href}
                  className="relative pb-0.5 group"
                >
                  {value.name}
                  <span className="absolute bottom-0 left-0 w-full border-b-2 bg-black scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out origin-left"></span>
                </Link>
              ))}
            </nav>

            <div className="flex justify-center items-center gap-4 sm:gap-8">
              {token && (
                <div className="flex items-center gap-2 overflow-hidden">
                  <img src={pfp} alt="" className="w-10 h-10 rounded-full" />
                  <span className="text-sm ">@{user?.userName}</span>
                </div>
              )}

              {loading ? (
                "loading..."
              ) : (
                <button
                  onClick={handleAuth}
                  className="cursor-pointer hover:bg-gray-700 transition-all bg-gray-900 hidden md:block rounded-md px-6 py-2 text-white font-medium"
                >
                  <span className="">{token ? "Log Out" : "Log In"}</span>
                </button>
              )}

              <div
                onClick={handleSideBar}
                className="p-1.5 block md:hidden bg-black text-white rounded-lg cursor-pointer"
              >
                <HiOutlineMenuAlt4 className="text-3xl " />
              </div>
            </div>
          </div>
        </div>

        {sideBar && (
          <div className="min-h-screen min-w-8/12 z-8 shadow-xl bg-gray-200 absolute top-0 left-0 px-4 py-2 flex flex-col gap-15 items-center">
            <span className="flex justify-end w-full text-3xl py-4">
              <HiOutlineX
                onClick={handleSideBar}
                className="transition-all ease-in-out duration-200 hover:rotate-90 cursor-pointer"
              />
            </span>

            <nav className="flex flex-col font-semibold gap-8 items-center justify-center">
              {NAVBMENU.map((value, index) => (
                <Link
                  key={index}
                  to={value.href}
                  onClick={handleSideBar}
                  className="relative pb-0.5 group"
                >
                  {value.name}
                  <span className="absolute bottom-0 left-0 w-full border-b-2 bg-black scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out origin-left"></span>
                </Link>
              ))}
            </nav>
            <button
              onClick={handleAuth}
              className="cursor-pointer hover:bg-gray-700 transition-all bg-gray-900 rounded-md px-6 py-2 text-white font-medium"
            >
              <span>{token ? "Log Out" : "Log In"}</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
