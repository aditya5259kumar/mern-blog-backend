import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link } from "react-router";

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  function handleShowPassword() {
    setPasswordShow(() => !passwordShow);
  }

  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  function submitHandler(e) {
    e.preventDefault();

    const newError = {};
    const emailRegex = /^[a-zA-Z][^\s@]*@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newError.email = "email is required!";
    } else if (!emailRegex.test(formData.email)) {
      newError.email = "invalid email address!";
    }

    if (!formData.password) {
      newError.password = "password is required!";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }
    console.log("Form submitted", formData);
    setError({});
  }

  return (
    <div className="">
      <div className="container px-8 md:px-20 py-4 mx-auto my-20">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="rounded-t-xl md:rounded-l-2xl md:rounded-none py-10 flex items-center justify-center flex-col bg-linear-to-r from-gray-900 to-gray-600 text-white">
            <h1 className="text-3xl font-bold">Hello Friend!</h1>
            <p className="py-6 px-10 text-center text-sm">
              Enter your personal details and start journey with us
            </p>
            <Link to="/signup">
              <button className="bg-white text-black border border-white hover:bg-transparent hover:text-white px-7 py-4 rounded-lg text-sm font-medium transition-all ease-in-out">
                Sign Up
              </button>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-b-xl md:rounded-r-2xl md:rounded-none py-10 shadow-2xl text-center">
            <h1 className="text-3xl font-bold">Log In</h1>

            <form action="" onSubmit={submitHandler}>
              <div className="px-10 md:px-8 lg:px-20 mt-8">
                {error.email && (
                  <p className="mb-1.5 ml-1 text-xs text-red-700 text-start">
                    {error.email}
                  </p>
                )}
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter Your Email"
                  className="bg-white border text-sm border-gray-300  w-full px-6 py-4 focus:border-gray-600 focus:outline-none rounded-lg mb-6 "
                />
                {error.password && (
                  <p className="mb-1.5 ml-1 text-xs text-red-700 text-start">
                    {error.password}
                  </p>
                )}
                <div className="bg-white flex w-full items-center justify-center border border-gray-300 focus-within:border-gray-600 rounded-lg mb-6">
                  <input
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Enter Your Password"
                    className="text-sm w-full pl-6 py-4 focus:outline-none "
                  />
                  <span
                    className="text-xl text-gray-500 mx-5"
                    onClick={handleShowPassword}
                  >
                    {passwordShow ? (
                      <HiOutlineEye className="text-black" />
                    ) : (
                      <HiOutlineEyeOff />
                    )}
                  </span>
                </div>
              </div>

              {/* <p className="text-sm text-center text-red-700 mb-4">
                ** Invalid Credentials! **
              </p> */}

              <button className="mb-4 bg-gray-700 border border-gray-700 hover:bg-transparent text-white hover:text-black px-7 py-4 rounded-lg text-sm font-medium transition-all ease-in-out">
                Log In
              </button>
            </form>
            <a href="" className="block">
              Forgot Password
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
