import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link } from "react-router";

const Signup = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  function handleShowPassword() {
    setPasswordShow(() => !passwordShow);
  }

  return (
    <div className="">
      <div className="container px-8 md:px-20 py-4 mx-auto my-20">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="rounded-t-xl md:rounded-l-2xl md:rounded-none py-10 md: flex items-center justify-center flex-col bg-linear-to-r from-gray-900 to-gray-600 text-white">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="py-6 px-10 text-center text-sm">
              To keep connected with us please login with your personal info
            </p>
            <Link to="/login">
              <button className="bg-white text-black border border-white hover:bg-transparent hover:text-white px-7 py-4 rounded-lg text-sm font-medium transition-all ease-in-out">
                Log In
              </button>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-b-xl md:rounded-r-2xl md:rounded-none py-10 shadow-2xl text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>

            <div className="px-10 md:px-8 lg:px-20">
              <input
                type="text"
                placeholder="Enter Your Name"
                className=" bg-white border text-sm border-gray-300 mt-8 w-full px-6 py-4 focus:border-gray-600 focus:outline-none rounded-lg mb-6 "
              />
              <input
                type="text"
                placeholder="Enter Your UserName"
                className=" bg-white border text-sm border-gray-300 w-full px-6 py-4 focus:border-gray-600 focus:outline-none rounded-lg mb-6 "
              />
              <input
                type="text"
                placeholder="Enter Your Email"
                className=" bg-white border text-sm border-gray-300 w-full px-6 py-4 focus:border-gray-600 focus:outline-none rounded-lg mb-6 "
              />
              <div className=" bg-white flex w-full items-center justify-center border border-gray-300 focus-within:border-gray-600 rounded-lg mb-6">
                <input
                  type={passwordShow ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="text-sm w-full pl-6 py-4 focus:outline-none "
                />
                <span
                  className="text-xl text-gray-500 mx-5"
                  onClick={handleShowPassword}
                >
                  {passwordShow ? <HiOutlineEye className="text-black" /> : <HiOutlineEyeOff />}
                </span>
              </div>
            </div>

            <button className="mb-4 bg-gray-700 border border-gray-700 hover:bg-transparent text-white hover:text-black px-7 py-4 rounded-lg text-sm font-medium transition-all ease-in-out">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
