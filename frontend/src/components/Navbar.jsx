import React, { useState, useEffect } from "react";
import black_beog_logo from "../assets/63e6fae264e26f6039829955_beog.svg";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import { NAVBMENU } from "../data/data";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { myProfile } from "../redux/slices/userSlice";
import { logout } from "../redux/slices/authSlice";
import defaultUser from "../assets/defaultUser.jpg";
import { toast } from "react-toastify";
import { TbLogout2 ,TbLogout } from "react-icons/tb";
import { LuUser } from "react-icons/lu";

const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);
  const [userSetting, setUserSetting] = useState(false);

  function handleSideBar() {
    setSideBar((prev) => !prev);
  }

  function handleUserSetting() {
    setUserSetting((prev) => !prev);
  }

  const { token } = useSelector((state) => state.auth);
  const { user, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(myProfile());
    }
  }, [dispatch, token]);

  // console.log(user);

  if (loading) {
    return <p>loading...</p>;
  }

  function logOutHandler() {
    if (token) {
      if (!confirm("Are you sure you want to logout?")) return;
      dispatch(logout());
      toast.success("LogOut successfully", { position: "top-center" });
      navigate("/login");
    }
  }

  return (
    <>
      <header className="shadow-md sticky top-0 left-0 right-0 bg-white z-10">
        <div className="container px-8 md:px-20 py-4 mx-auto">
          <div className=" flex items-center justify-between">
            <Link
              to="/"
              className="overflow-hidden relative z-10 cursor-pointer"
            >
              <img
                src={black_beog_logo}
                alt="beog-logo"
                className=" h-8 md:h-10"
              />
            </Link>

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

            <div className="flex justify-center items-center gap-6 sm:gap-10">
              {token && (
                <div className="relative">
                  <button
                    onClick={handleUserSetting}
                    className="flex items-center gap-1 overflow-hidden"
                  >
                    <img
                      src={
                        user.profilePhoto
                          ? `http://localhost:3000${user.profilePhoto}`
                          : defaultUser
                      }
                      alt=""
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <span className="hidden md:block font-semibold text-gray-800">
                      @{user?.userName}
                    </span>
                  </button>

                  {userSetting && (
                    <div className="absolute -right-2 top-12 md:-right-6 w-36 bg-gray-50 rounded-lg  shadow-xl z-8">
                      <Link
                        to="profile"
                        className=" cursor-pointer w-full px-4 py-2.5 text-sm font-medium text-zinc-700 transition-all flex items-center justify-between gap-2"
                      >
                        Profile <LuUser className="text-lg" />
                      </Link>
                      <button
                        onClick={logOutHandler}
                        className="cursor-pointer w-full px-4 py-2.5 text-sm border-b font-medium border border-gray-200 text-red-700 transition-all flex items-center justify-between gap-2"
                      >
                        LogOut <TbLogout className="text-lg" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!token && (
                <Link
                  to="login"
                  className="flex items-center gap-3 text-sm md:text-base border-2 font-medium border-gray-600 px-3 md:py-1.5 py-1.5 rounded-md"
                >
                  Login <TbLogout2 className="text-lg"/>
                </Link>
              )}
              <Link
                to="contact"
                className="hidden md:block cursor-pointer hover:bg-gray-700 transition-all bg-gray-900 rounded-md px-6 py-2 text-white font-medium"
              >
                Contact
              </Link>

              <div
                onClick={handleSideBar}
                className="p-1.5 block md:hidden bg-black text-white rounded-lg cursor-pointer"
              >
                <HiOutlineMenuAlt4 className="text-2xl md:text-3xl " />
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

            <nav className="flex flex-col font-semibold gap-7 items-center justify-center">
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

            <div className="flex flex-col items-center gap-7">
              {!token && (
                <Link
                  to="login"
                  className="flex items-center gap-3 cursor-pointer border-2 border-gray-800 rounded-md px-3 py-1.5 text-gray-700 font-medium"
                >
                  Login <TbLogout2 className="text-lg"/>
                </Link>
              )}
              <Link
                to="contact"
                className="cursor-pointer hover:bg-gray-700 transition-all bg-gray-900 rounded-md px-6 py-2 text-white font-medium"
              >
                Contact
              </Link>

              {token && (
                <button
                  onClick={logOutHandler}
                  className="flex items-center gap-3 cursor-pointer text-red-700 font-medium border border-red-700 px-4 py-1.5 rounded-md"
                >
                  LogOut <TbLogout  className="text-lg" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
